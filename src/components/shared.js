import styled from 'styled-components';

export const AgencyTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 6px;
  letter-spacing: 0.5px;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.font.mono};
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
`;

export const TodayBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 9px;
  font-weight: 800;
  color: #fff;
  background: ${({ theme }) => theme.colors.red};
  padding: 2px 7px;
  border-radius: 4px;
  margin-left: 7px;
  vertical-align: middle;
  letter-spacing: 0.5px;
  animation: badge 2.5s ease-in-out infinite;
`;

export const GoButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: ${({ $sm }) => ($sm ? '12px' : '11px')};
  font-weight: 700;
  color: #fff;
  background: ${({ theme }) => theme.gradient.btn};
  padding: ${({ $sm }) => ($sm ? '6px 15px' : '5px 13px')};
  border-radius: 8px;
  transition: all 0.2s;
  white-space: nowrap;
  box-shadow: 0 2px 8px ${({ theme }) => theme.alpha.btnShadow};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 16px ${({ theme }) => theme.alpha.btnShadowHover};
    filter: brightness(1.08);
  }
`;
