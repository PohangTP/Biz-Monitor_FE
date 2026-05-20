import { useNavigate, useParams } from 'react-router-dom';
import AppShell from '../../components/layout/AppShell';
import NoticesPage from './NoticesPage';
import BoardPage from './BoardPage';
import FeedbackPage from './FeedbackPage';
import PlaceholderPage from './PlaceholderPage';

const TAB_META = {
  overview: { title: '대시보드', icon: '📊' },
  members: { title: '팀원 관리', icon: '👥' },
  tasks: { title: '업무', icon: '✅' },
  projects: { title: '프로젝트 관리', icon: '📁' },
  'budget-mgmt': { title: '사업비 관리', icon: '💰' },
  'personnel-mgmt': { title: '참여인력 관리', icon: '👥' },
  reports: { title: '보고서', icon: '📑' },
  notices: { title: '공지사항', icon: '📢' },
  board: { title: '게시판', icon: '📋' },
  feedback: { title: '건의사항', icon: '💬' },
  settings: { title: '설정', icon: '⚙️' },
  calendar: { title: '일정', icon: '📅' },
  files: { title: '파일함', icon: '📂' },
  profile: { title: '내 프로필', icon: '👤' },
};

const PAGES = {
  notices: NoticesPage,
  board: BoardPage,
  feedback: FeedbackPage,
};

const DashboardLayout = () => {
  const { tabId = 'overview' } = useParams();
  const navigate = useNavigate();

  const Page = PAGES[tabId];
  const meta = TAB_META[tabId] ?? { title: '준비 중', icon: '🚧' };

  return (
    <AppShell
      activeId={tabId}
      onSelect={(id) => navigate(`/dashboard/${id}`)}
    >
      {Page ? <Page /> : <PlaceholderPage title={meta.title} icon={meta.icon} />}
    </AppShell>
  );
};

export default DashboardLayout;
