import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  gap: 4px;
  background: ${({ theme }) => theme.colors.surface2};
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 20px;
  width: fit-content;
`;

const TabBtn = styled.button`
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  background: ${({ $active, theme }) => ($active ? theme.colors.surface : 'none')};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text : theme.colors.text2};
  box-shadow: ${({ $active }) =>
    $active ? '0 1px 4px rgba(0,0,0,0.2)' : 'none'};
`;

const TabNav = ({ tabs, value, onChange }) => (
  <Wrap>
    {tabs.map((t) => (
      <TabBtn
        key={t.value}
        type="button"
        $active={t.value === value}
        onClick={() => onChange(t.value)}
      >
        {t.label}
      </TabBtn>
    ))}
  </Wrap>
);

export default TabNav;
