import { useMemo, useState } from 'react';
import styled from 'styled-components';
import Topbar from '../components/Topbar';
import Header from '../components/Header';
import Infobar from '../components/Infobar';
import AgencyStats from '../components/AgencyStats';
import AnnouncementTable from '../components/AnnouncementTable';
import MobileAnnouncement from '../components/MobileAnnouncement';
import Footer from '../components/Footer';
import { ANNOUNCEMENTS, COLLECTED_AT } from '../data/announcements';
import { AGENCY_MAP } from '../data/agencies';
import { isToday } from '../utils/date';

const ENRICHED = ANNOUNCEMENTS.map((a) => ({
  ...a,
  meta: AGENCY_MAP[a.agency] ?? {},
  isToday: isToday(a.registeredAt),
}));

const COUNTS = ENRICHED.reduce((acc, a) => {
  acc[a.agency] = (acc[a.agency] ?? 0) + 1;
  return acc;
}, {});

const TODAY_COUNT = ENRICHED.filter((a) => a.isToday).length;

const Body = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 28px 32px 80px;

  @media (max-width: 960px) {
    padding: 18px 16px 48px;
  }
`;

const MonitorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ENRICHED;
    return ENRICHED.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.agency.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <>
      <Topbar />
      <Header
        collectedAt={COLLECTED_AT}
        todayCount={TODAY_COUNT}
        totalCount={ENRICHED.length}
      />
      <Body>
        <Infobar />
        <AgencyStats counts={COUNTS} />
        <AnnouncementTable
          announcements={filtered}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <MobileAnnouncement announcements={filtered} />
      </Body>
      <Footer collectedAt={COLLECTED_AT} />
    </>
  );
};

export default MonitorPage;
