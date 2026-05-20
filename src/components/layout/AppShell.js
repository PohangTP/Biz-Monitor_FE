import { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { getMenuFor } from '../../data/menus';
import { useAuth } from '../../hooks/useAuth';

const Layout = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  background: ${({ theme }) => theme.colors.bg};
  min-width: 0;
`;

const AppShell = ({ activeId, onSelect, projects, onAddProject, children }) => {
  const { user } = useAuth();
  const menu = getMenuFor(user?.role);
  const [internalActive, setInternalActive] = useState('overview');

  const id = activeId ?? internalActive;
  const select = onSelect ?? setInternalActive;

  return (
    <Layout>
      <Sidebar
        menu={menu}
        activeId={id}
        onSelect={select}
        projects={projects}
        onAddProject={onAddProject}
      />
      <Main>{children}</Main>
    </Layout>
  );
};

export default AppShell;
