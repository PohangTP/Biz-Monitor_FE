import styled from 'styled-components';
import FeedbackItem from './FeedbackItem';
import { Card, CardHeader } from '../ui/Card';
import Spinner from '../ui/Spinner';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text3};
  gap: 10px;
`;

const FeedbackList = ({ posts, loading, error, title, onDelete }) => (
  <Card>
    <CardHeader title={title} />
    {loading ? (
      <StateRow>
        <Spinner $size={20} /> 불러오는 중…
      </StateRow>
    ) : error ? (
      <StateRow>{error}</StateRow>
    ) : posts.length === 0 ? (
      <StateRow>제출된 건의사항이 없습니다</StateRow>
    ) : (
      <List>
        {posts.map((p) => (
          <FeedbackItem key={p.id} post={p} onDelete={onDelete} />
        ))}
      </List>
    )}
  </Card>
);

export default FeedbackList;
