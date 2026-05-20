export const LEADER_MENU = [
  {
    label: '메인',
    items: [
      { id: 'overview', icon: '📊', label: '대시보드' },
      { id: 'members', icon: '👥', label: '팀원 관리' },
      { id: 'tasks', icon: '✅', label: '주요 업무보고 관리' },
    ],
  },
  {
    label: '수행 사업',
    dynamic: 'projects',
    showAddButton: true,
    addAction: 'openAddProject',
  },
  {
    label: '운영',
    items: [
      { id: 'projects', icon: '📁', label: '프로젝트 관리' },
      { id: 'budget-mgmt', icon: '💰', label: '사업비 관리' },
      { id: 'personnel-mgmt', icon: '👥', label: '참여인력 관리' },
      { id: 'reports', icon: '📑', label: '보고서' },
      { id: 'notices', icon: '📢', label: '공지사항' },
      { id: 'board', icon: '📋', label: '게시판' },
      { id: 'feedback', icon: '💬', label: '건의사항' },
    ],
  },
  {
    label: '설정',
    items: [{ id: 'settings', icon: '⚙️', label: '설정' }],
  },
];

export const MEMBER_MENU = [
  {
    label: '메인',
    items: [
      { id: 'overview', icon: '🏠', label: '내 현황' },
      { id: 'tasks', icon: '✅', label: '내 업무' },
      { id: 'reports', icon: '📄', label: '보고서' },
    ],
  },
  {
    label: '수행 사업',
    dynamic: 'projects',
  },
  {
    label: '팀',
    items: [
      { id: 'members', icon: '👥', label: '팀원 관리' },
      { id: 'projects', icon: '📁', label: '프로젝트 관리' },
      { id: 'budget-mgmt', icon: '💰', label: '사업비 관리' },
      { id: 'personnel-mgmt', icon: '👤', label: '참여인력 관리' },
    ],
  },
  {
    label: '공유',
    items: [
      { id: 'notices', icon: '📢', label: '공지사항' },
      { id: 'board', icon: '📋', label: '게시판' },
      { id: 'feedback', icon: '💬', label: '건의사항' },
      { id: 'calendar', icon: '📅', label: '일정' },
      { id: 'files', icon: '📂', label: '파일함' },
    ],
  },
  {
    label: '계정',
    items: [{ id: 'profile', icon: '👤', label: '내 프로필' }],
  },
];

export const getMenuFor = (role) => {
  if (role === 'member') return MEMBER_MENU;
  return LEADER_MENU;
};
