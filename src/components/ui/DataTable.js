import styled from 'styled-components';

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 10px 14px;
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text3};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 13px 14px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.text2};
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const TableScroll = styled.div`
  overflow-x: auto;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.text3};
  font-size: 13px;
`;
