import styled from 'styled-components';
import BoardItem from './BoardItem';
import { Card, CardHeader } from '../ui/Card';
import { FormSelect } from '../ui/FormInput';
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

const FilterSelect = styled(FormSelect)`
  width: auto;
  font-size: 12px;
  padding: 4px 10px;
`;

const BoardList = ({
  posts,
  loading,
  error,
  filter,
  filterOptions,
  onFilterChange,
  onDelete,
}) => (
  <Card>
    <CardHeader title="글 목록">
      <FilterSelect
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {filterOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </FilterSelect>
    </CardHeader>
    {loading ? (
      <StateRow>
        <Spinner $size={20} /> 불러오는 중…
      </StateRow>
    ) : error ? (
      <StateRow>{error}</StateRow>
    ) : posts.length === 0 ? (
      <StateRow>표시할 글이 없습니다</StateRow>
    ) : (
      <List>
        {posts.map((p) => (
          <BoardItem key={p.id} post={p} onDelete={onDelete} />
        ))}
      </List>
    )}
  </Card>
);

export default BoardList;
