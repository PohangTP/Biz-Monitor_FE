import styled from 'styled-components';
import AttachedFiles from '../ui/AttachedFiles';
import { BtnSmDanger } from '../ui/BtnSm';
import { ROLE_LABELS } from '../../data/roles';
import { useAuth } from '../../hooks/useAuth';

const ADMIN_ROLES = new Set(['admin', 'sysadmin']);

const Wrap = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.surface};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
`;

const Title = styled.strong`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const Meta = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text3};
  text-align: right;
  white-space: nowrap;
`;

const Content = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text2};
  margin: 4px 0 8px;
  white-space: pre-wrap;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const SmDelBtn = styled(BtnSmDanger)`
  padding: 4px 10px;
  font-size: 11px;
`;

const FeedbackItem = ({ post, onDelete }) => {
  const { user } = useAuth();
  const isMine = user && post.author_username === user.username;
  const isAdmin = user && ADMIN_ROLES.has(user.role);
  const canDelete = isMine || isAdmin;
  const dateStr = (post.created_at || '').slice(0, 10);
  const roleKor = ROLE_LABELS[post.author_role] || '';

  return (
    <Wrap>
      <TopRow>
        <Title>{post.title}</Title>
        <Meta>
          {post.author_name || '익명'}
          {roleKor && ` (${roleKor})`} · {dateStr}
        </Meta>
      </TopRow>
      {post.content && <Content>{post.content}</Content>}
      <AttachedFiles files={post.files} showEmpty withImagePreview />
      {canDelete && (
        <Actions>
          <SmDelBtn type="button" onClick={() => onDelete(post)}>
            삭제
          </SmDelBtn>
        </Actions>
      )}
    </Wrap>
  );
};

export default FeedbackItem;
