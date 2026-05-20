import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 22px 24px;
  margin-bottom: 20px;
`;

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const CardAction = styled.button`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  padding: 6px 12px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  transition: all 0.15s;
  background: none;

  &:hover {
    background: ${({ theme }) => theme.alpha.accentGlow};
  }
`;

export const CardHeader = ({ title, action, children }) => (
  <HeaderWrap>
    <Title>{title}</Title>
    {action}
    {children}
  </HeaderWrap>
);
