import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import NoticeForm from '../../components/notices/NoticeForm';
import NoticeList from '../../components/notices/NoticeList';
import {
  listNotices,
  createNotice,
  uploadNoticeFile,
  deleteNotice,
} from '../../api/notices';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const NoticesPage = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listNotices(user?.username);
      setNotices(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || '공지를 불러오지 못했습니다');
    } finally {
      setLoading(false);
    }
  }, [user?.username]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleCreate = async ({
    title,
    content,
    important,
    targetScope,
    files,
  }) => {
    if (!title.trim()) {
      toast.warn('제목을 입력하세요');
      return false;
    }
    setSubmitting(true);
    try {
      const created = await createNotice({
        actorUsername: user.username,
        title: title.trim(),
        content: content.trim(),
        important,
        targetScope,
      });

      let uploadedCount = 0;
      for (const f of files) {
        try {
          await uploadNoticeFile({
            noticeId: created.id,
            file: f,
            actorUsername: user.username,
          });
          uploadedCount++;
        } catch (e) {
          console.warn('[notice file upload]', f.name, e);
        }
      }

      toast.success(
        files.length
          ? `📢 공지 게시됨 (파일 ${uploadedCount}/${files.length}개 첨부)`
          : '📢 공지를 게시했습니다'
      );
      await refresh();
      return true;
    } catch (e) {
      toast.error(`게시 실패: ${e?.message || '서버 오류'}`);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (notice) => {
    if (!window.confirm('이 공지를 삭제하시겠습니까?')) return;
    try {
      await deleteNotice({
        noticeId: notice.id,
        actorUsername: user.username,
      });
      toast.success('🗑 삭제됐습니다');
      await refresh();
    } catch (e) {
      toast.error(`삭제 실패: ${e?.message || '서버 오류'}`);
    }
  };

  return (
    <>
      <PageHeader
        title="📢 공지사항"
        description={
          user?.role === 'member'
            ? '팀 공지사항을 확인하고 작성할 수 있습니다.'
            : '팀 전체 공지사항을 작성하고 관리하세요.'
        }
      />
      <NoticeForm
        onSubmitting={handleCreate}
        submitting={submitting}
      />
      <NoticeList
        notices={notices}
        loading={loading}
        error={error}
        onDelete={handleDelete}
      />
    </>
  );
};

export default NoticesPage;
