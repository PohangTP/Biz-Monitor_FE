import styled from 'styled-components';

const accentColors = (theme) => ({
  blue: theme.colors.accent,
  purple: theme.colors.leader,
  cyan: theme.colors.member,
  gold: theme.colors.gold,
  green: theme.colors.success,
});

const Wrap = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 20px 22px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${({ $accent = 'blue', theme }) =>
      accentColors(theme)[$accent] ?? theme.colors.accent};
    border-radius: 3px 0 0 3px;
  }

  &:hover {
    transform: ${({ $clickable }) =>
      $clickable ? 'translateY(-2px)' : 'translateY(-2px)'};
    box-shadow: ${({ $clickable }) =>
      $clickable ? '0 8px 24px rgba(0,0,0,0.15)' : 'none'};
  }
`;

const Label = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text2};
  font-weight: 500;
  margin-bottom: 10px;
`;

const Value = styled.div`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.colors.text};
`;

const Unit = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text2};
  margin-left: 4px;
`;

const Change = styled.div`
  font-size: 12px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ $direction, theme }) =>
    $direction === 'up'
      ? theme.colors.success
      : $direction === 'down'
        ? theme.colors.danger
        : theme.colors.text3};
`;

const Icon = styled.div`
  position: absolute;
  right: 18px;
  top: 18px;
  font-size: 28px;
  opacity: 0.15;
`;

const StatCard = ({
  accent = 'blue',
  label,
  value,
  unit,
  change,
  changeDirection,
  icon,
  onClick,
}) => (
  <Wrap $accent={accent} $clickable={!!onClick} onClick={onClick}>
    <Label>{label}</Label>
    <Value>
      {value}
      {unit && <Unit>{unit}</Unit>}
    </Value>
    {change && <Change $direction={changeDirection}>{change}</Change>}
    {icon && <Icon>{icon}</Icon>}
  </Wrap>
);

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $cols = 4 }) => $cols}, 1fr);
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default StatCard;
