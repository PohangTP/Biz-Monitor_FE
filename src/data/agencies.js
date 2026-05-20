export const AGENCIES = [
  {
    code: 'IRIS',
    icon: '🟣',
    color: '#4A0FAD',
    bg: '#F3EEFF',
    accent: '#6B21D9',
    url: 'https://www.iris.go.kr/contents/retrieveBsnsAncmBtinSituListView.do',
  },
  {
    code: 'KIAT',
    icon: '🟠',
    color: '#8A3900',
    bg: '#FFF0E6',
    accent: '#C05200',
    url: 'https://www.kiat.or.kr/front/board/boardContentsListPage.do?board_id=90&MenuId=b159c9dac684471b87256f1e25404f5e',
  },
  {
    code: 'KoAT',
    icon: '🔴',
    color: '#7B0F2E',
    bg: '#FFF0F3',
    accent: '#9D1239',
    url: 'https://www.koat.or.kr/board/business/list.do',
  },
  {
    code: 'SMTECH',
    icon: '🟩',
    color: '#064E3B',
    bg: '#ECFDF5',
    accent: '#065F46',
    url: 'https://www.smtech.go.kr/front/ifg/no/notice02_list.do',
  },
  {
    code: 'NIPA',
    icon: '🔵',
    color: '#003D8F',
    bg: '#EBF3FF',
    accent: '#0057B8',
    url: 'https://www.nipa.kr/home/2-2',
  },
  {
    code: 'NIA',
    icon: '🟢',
    color: '#005C3D',
    bg: '#E3F6EF',
    accent: '#00875A',
    url: 'https://www.nia.or.kr/site/nia_kor/ex/bbs/List.do?cbIdx=78336',
  },
  {
    code: 'IITP',
    icon: '🔷',
    color: '#075985',
    bg: '#E0F2FE',
    accent: '#0369A1',
    url: 'https://www.iitp.kr/web/lay1/program/S1T44C51/iris/list.do',
  },
  {
    code: 'KOSAC',
    icon: '🔮',
    color: '#581C87',
    bg: '#FAF5FF',
    accent: '#7E22CE',
    url: 'https://www.kosac.re.kr/menus/274/bns',
  },
  {
    code: 'KIRIA',
    icon: '🤖',
    color: '#92400E',
    bg: '#FFFBEB',
    accent: '#B45309',
    url: 'https://www.kiria.org/portal/info/portalInfoBusinessList.do',
  },
  {
    code: 'KIAST',
    icon: '✈️',
    color: '#0D5E57',
    bg: '#F0FDFA',
    accent: '#0F766E',
    url: 'https://www.kiast.or.kr/kr/cop/bbs/BBSMSTR_000000000031/selectBoardList.do',
  },
];

export const AGENCY_MAP = AGENCIES.reduce((acc, a) => {
  acc[a.code] = a;
  return acc;
}, {});
