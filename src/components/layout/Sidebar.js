import styled from 'styled-components';
import { ROLE_LABELS } from '../../data/roles';
import { useAuth } from '../../hooks/useAuth';

const Wrap = styled.aside`
  width: 240px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
`;

const Brand = styled.div`
  padding: 24px 20px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const BrandIcon = styled.div`
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme.gradient.accentDiag};
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 10px;
`;

const BrandName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const RoleChip = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
  display: inline-block;
  margin-top: 4px;
  background: ${({ $role, theme }) =>
    $role === 'leader' || $role === 'admin' || $role === 'sysadmin'
      ? theme.alpha.leaderBg
      : theme.alpha.memberBg};
  color: ${({ $role, theme }) =>
    $role === 'leader' || $role === 'admin' || $role === 'sysadmin'
      ? theme.colors.leader
      : theme.colors.member};
`;

const UserBox = styled.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  flex-shrink: 0;
  background: ${({ $role, theme }) =>
    $role === 'member' ? theme.alpha.memberBg : theme.alpha.leaderBg};
  color: ${({ $role, theme }) =>
    $role === 'member' ? theme.colors.member : theme.colors.leader};
  border: 2px solid
    ${({ $role, theme }) =>
      $role === 'member' ? theme.alpha.memberBorder : theme.alpha.leaderBorder};
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UserDept = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text2};
  margin-top: 2px;
`;

const UserPos = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.text3};
  margin-top: 1px;
`;

const Nav = styled.nav`
  padding: 16px 12px;
  flex: 1;
`;

const SectionLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text3};
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0 8px;
  margin: 12px 0 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 16px;
  cursor: pointer;
  line-height: 1;
  padding: 0 2px;
  font-weight: 700;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
  user-select: none;
  width: 100%;
  border: none;
  text-align: left;
  background: ${({ $active, theme }) =>
    $active ? theme.alpha.accentBg : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accent : theme.colors.text2};

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.alpha.accentBg : theme.colors.surface2};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.accent : theme.colors.text};
  }
`;

const NavIcon = styled.span`
  font-size: 16px;
  width: 20px;
  text-align: center;
`;

const Footer = styled.div`
  padding: 16px 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text3};
  transition: all 0.15s;
  width: 100%;
  background: none;
  border: none;
  text-align: left;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const initialOf = (name) => (name?.[0] ?? '?').toUpperCase();

const Sidebar = ({ menu, activeId, onSelect, onAddProject, projects = [] }) => {
  const { user, signOut } = useAuth();
  if (!user) return null;

  return (
    <Wrap>
      <Brand>
        <BrandIcon>🏢</BrandIcon>
        <BrandName>부서 사업 관리 시스템</BrandName>
        <br />
        <RoleChip $role={user.role}>
          {ROLE_LABELS[user.role] ?? user.role}
        </RoleChip>
      </Brand>

      <UserBox>
        <Avatar $role={user.role}>{initialOf(user.name)}</Avatar>
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserDept>{user.dept}</UserDept>
          {user.pos && <UserPos>{user.pos}</UserPos>}
        </UserInfo>
      </UserBox>

      <Nav>
        {menu.map((section) => (
          <div key={section.label}>
            <SectionLabel>
              {section.label}
              {section.showAddButton && (
                <AddBtn
                  type="button"
                  title="사업 추가"
                  onClick={onAddProject}
                >
                  ＋
                </AddBtn>
              )}
            </SectionLabel>
            {section.dynamic === 'projects'
              ? projects.map((p) => (
                  <NavItem
                    key={p.id}
                    type="button"
                    $active={activeId === `proj-${p.id}`}
                    onClick={() => onSelect(`proj-${p.id}`)}
                  >
                    <NavIcon>📦</NavIcon>
                    {p.name}
                  </NavItem>
                ))
              : section.items?.map((item) => (
                  <NavItem
                    key={item.id}
                    type="button"
                    $active={activeId === item.id}
                    onClick={() => onSelect(item.id)}
                  >
                    <NavIcon>{item.icon}</NavIcon>
                    {item.label}
                  </NavItem>
                ))}
          </div>
        ))}
      </Nav>

      <Footer>
        <LogoutBtn type="button" onClick={signOut}>
          <span>🚪</span> 로그아웃
        </LogoutBtn>
      </Footer>
    </Wrap>
  );
};

export default Sidebar;
