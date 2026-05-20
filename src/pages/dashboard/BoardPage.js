import { useCallback, useEffect, useMemo, useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import BoardForm from '../../components/board/BoardForm';
import BoardList from '../../components/board/BoardList';
import {
  listBoardPosts,
  createBoardPost,
  uploadBoardFile,
  deleteBoardPost,
} from '../../api/board';
import { fetchTeams } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const GLOBAL_ROLES = new Set(['sysadmin', 'admin']);

const BoardPage = () => {
  const { user } = useAuth();
  const toast = useToast();
  const isGlobal = GLOBAL_ROLES.has(user?.role);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('all');
  const [teams, setTeams] = useState([]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listBoardPosts(user?.username);
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || '게시판을 불러오지 못했습니다');
    } finally {
      setLoading(false);
    }
  }, [user?.username]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!isGlobal) return;
    fetchTeams()
      .then((data) => setTeams(Array.isArray(data) ? data : []))
      .catch(() => setTeams([]));
  }, [isGlobal]);

  const filterOptions = useMemo(() => {
    const base = [
      { value: 'all', label: '전체 보기 (모든 게시판)' },
      { value: 'global', label: '📢 전체 게시판만' },
    ];
    if (isGlobal) {
      teams.forEach((t) =>
        base.push({ value: String(t.id), label: `📁 ${t.name}` })
      );
    } else if (user?.team_id) {
      base.push({
        value: String(user.team_id),
        label: `📁 ${user.dept || '본인 팀'}`,
      });
    }
    return base;
  }, [isGlobal, teams, user?.team_id, user?.dept]);

  const filtered = useMemo(() => {
    if (filter === 'all') return posts;
    if (filter === 'global') return posts.filter((p) => p.target_team_id == null);
    return posts.filter((p) => String(p.target_team_id) === String(filter));
  }, [posts, filter]);

  const handleCreate = async ({ title, content, targetScope, files }) => {
    if (!title.trim()) {
      toast.warn('제목을 입력하세요');
      return false;
    }
    setSubmitting(true);
    try {
      const created = await createBoardPost({
        actorUsername: user.username,
        title: title.trim(),
        content: content.trim(),
        targetScope,
      });

      let uploadedCount = 0;
      for (const f of files) {
        try {
          await uploadBoardFile({
            postId: created.id,
            file: f,
            actorUsername: user.username,
          });
          uploadedCount++;
        } catch (e) {
          console.warn('[board file upload]', f.name, e);
        }
      }

      toast.success(
        files.length
          ? `📋 게시글 등록됨 (파일 ${uploadedCount}/${files.length}개 첨부)`
          : '📋 게시글이 등록됐습니다'
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

  const handleDelete = async (post) => {
    if (
      !window.confirm('이 게시글을 삭제하시겠습니까? (첨부 파일도 함께 삭제됩니다)')
    )
      return;
    try {
      await deleteBoardPost({
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
        title="📋 게시판"
        description="누구나 글을 작성하고 파일을 첨부·다운로드할 수 있습니다."
      />
      <BoardForm onSubmitting={handleCreate} submitting={submitting} />
      <BoardList
        posts={filtered}
        loading={loading}
        error={error}
        filter={filter}
        filterOptions={filterOptions}
        onFilterChange={setFilter}
        onDelete={handleDelete}
      />
    </>
  );
};

export default BoardPage;
