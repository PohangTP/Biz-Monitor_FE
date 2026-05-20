import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import FeedbackForm from '../../components/feedback/FeedbackForm';
import FeedbackList from '../../components/feedback/FeedbackList';
import {
  listFeedback,
  createFeedback,
  uploadFeedbackFile,
  deleteFeedback,
} from '../../api/feedback';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const ADMIN_ROLES = new Set(['admin', 'sysadmin']);

const FeedbackPage = () => {
  const { user } = useAuth();
  const toast = useToast();
  const isAdmin = ADMIN_ROLES.has(user?.role);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listFeedback(user?.username);
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || '건의사항을 불러오지 못했습니다');
    } finally {
      setLoading(false);
    }
  }, [user?.username]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleCreate = async ({ title, content, files }) => {
    if (!title.trim()) {
      toast.warn('제목을 입력하세요');
      return false;
    }
    setSubmitting(true);
    try {
      const created = await createFeedback({
        actorUsername: user.username,
        title: title.trim(),
        content: content.trim(),
      });

      let uploadedCount = 0;
      for (const f of files) {
        try {
          await uploadFeedbackFile({
            postId: created.id,
            file: f,
            actorUsername: user.username,
          });
          uploadedCount++;
        } catch (e) {
          console.warn('[feedback file upload]', f.name, e);
        }
      }

      toast.success(
        files.length
          ? `💬 건의사항 제출됨 (파일 ${uploadedCount}/${files.length}개 첨부)`
          : '💬 건의사항이 제출됐습니다'
      );
      await refresh();
      return true;
    } catch (e) {
      toast.error(`제출 실패: ${e?.message || '서버 오류'}`);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (post) => {
    if (
      !window.confirm(
        '이 건의사항을 삭제하시겠습니까? (첨부 파일도 함께 삭제됩니다)'
      )
    )
      return;
    try {
      await deleteFeedback({
        postId: post.id,
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
        title="💬 건의사항"
        description="베타 테스트 피드백을 자유롭게 남겨주세요."
      />
      <FeedbackForm onSubmitting={handleCreate} submitting={submitting} />
      <FeedbackList
        posts={posts}
        loading={loading}
        error={error}
        title={isAdmin ? '전체 건의사항' : '내 건의사항'}
        onDelete={handleDelete}
      />
    </>
  );
};

export default FeedbackPage;
