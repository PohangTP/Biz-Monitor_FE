import styled from 'styled-components';
import Badge from '../ui/Badge';
import AttachedFiles from '../ui/AttachedFiles';
import { ROLE_LABELS } from '../../data/roles';
import { useAuth } from '../../hooks/useAuth';

const isNoticeNew = (iso) => {
  if (!iso) return false;
  try {
    const diff = (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24);
    return diff < 3;
  } catch {
    return false;
  }
};

const Wrap = styled.div`
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.15s, padding-left 0.15s;
  border-radius: 8px;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.02);
    padding-left: 8px;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const NewTag = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.danger};
  background: rgba(239, 68, 68, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
`;

const DeleteBtn = styled.button`
  margin-left: auto;
  padding: 2px 8px;
  font-size: 11px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text3};
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: ${({ theme }) => theme.colors.danger};
    border-color: rgba(239, 68, 68, 0.3);
  }
`;

const Content = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text2};
  margin: 4px 0 6px;
  white-space: pre-wrap;
  line-height: 1.6;
`;

const Meta = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text3};
  margin-top: 5px;
`;

const NoticeItem = ({ notice, onDelete }) => {
  const { user } = useAuth();
  const isMine = user && notice.creator_username === user.username;
  const canDelete = isMine || user?.role === 'sysadmin';
  const isNew = isNoticeNew(notice.created_at);
  const dateOnly = (notice.created_at || '').slice(0, 10);
  const roleKor = ROLE_LABELS[notice.creator_role] || '';

  return (
    <Wrap>
      <TitleRow>
        {notice.important && <Badge $color="red">중요</Badge>}
        {notice.target_team_name ? (
          <Badge $color="blue">{notice.target_team_name}</Badge>
        ) : (
          <Badge $color="purple">전체</Badge>
        )}
        <Title>{notice.title}</Title>
        {isNew && <NewTag>NEW</NewTag>}
        {canDelete && (
          <DeleteBtn type="button" onClick={() => onDelete(notice)}>
            삭제
          </DeleteBtn>
        )}
      </TitleRow>
      {notice.content && <Content>{notice.content}</Content>}
      <AttachedFiles files={notice.files} />
      <Meta>
        {notice.creator_name || '익명'}
        {roleKor && ` (${roleKor})`} · {dateOnly}
      </Meta>
    </Wrap>
  );
};

export default NoticeItem;
