import styled from 'styled-components';
import NoticeItem from './NoticeItem';
import { Card, CardHeader } from '../ui/Card';
import Spinner from '../ui/Spinner';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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

const NoticeList = ({ notices, loading, error, onDelete }) => (
  <Card>
    <CardHeader title="공지 목록" />
    {loading ? (
      <StateRow>
        <Spinner $size={20} /> 불러오는 중…
      </StateRow>
    ) : error ? (
      <StateRow>{error}</StateRow>
    ) : notices.length === 0 ? (
      <StateRow>등록된 공지가 없습니다</StateRow>
    ) : (
      <List>
        {notices.map((n) => (
          <NoticeItem key={n.id} notice={n} onDelete={onDelete} />
        ))}
      </List>
    )}
  </Card>
);

export default NoticeList;
