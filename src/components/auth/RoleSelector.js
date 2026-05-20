import styled from 'styled-components';
import { ROLES } from '../../data/roles';

const Label = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text2};
  margin-bottom: 12px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 28px;
`;

const variantColors = (theme, color) => {
  if (color === 'leader')
    return {
      border: theme.colors.leader,
      bg: theme.alpha.leaderBg,
      glow: theme.alpha.leaderGlow,
    };
  if (color === 'member')
    return {
      border: theme.colors.member,
      bg: theme.alpha.memberBg,
      glow: theme.alpha.memberGlow,
    };
  return {
    border: theme.colors.admin,
    bg: theme.alpha.adminBg,
    glow: theme.alpha.adminGlow,
  };
};

const Card = styled.button`
  padding: 16px 12px;
  background: ${({ $selected, $color, theme }) =>
    $selected ? variantColors(theme, $color).bg : theme.colors.surface2};
  border: 2px solid
    ${({ $selected, $color, theme }) =>
      $selected ? variantColors(theme, $color).border : 'transparent'};
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ $selected, $color, theme }) =>
    $selected ? `0 0 20px ${variantColors(theme, $color).glow}` : 'none'};

  &:hover {
    transform: translateY(-2px);
  }
`;

const Icon = styled.span`
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ $selected, $color, theme }) =>
    $selected && $color === 'admin' ? theme.colors.admin : theme.colors.text};
`;

const Desc = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text2};
  margin-top: 3px;
`;

const RoleSelector = ({ value, onChange }) => (
  <>
    <Label>역할 선택</Label>
    <Grid>
      {ROLES.map((r) => (
        <Card
          key={r.code}
          type="button"
          $selected={value === r.code}
          $color={r.color}
          onClick={() => onChange(r.code)}
        >
          <Icon>{r.icon}</Icon>
          <Name $selected={value === r.code} $color={r.color}>
            {r.name}
          </Name>
          <Desc>{r.desc}</Desc>
        </Card>
      ))}
    </Grid>
  </>
);

export default RoleSelector;
