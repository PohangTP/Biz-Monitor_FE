import styled from 'styled-components';
import { downloadExcel } from '../utils/exportExcel';
import { AgencyTag, TodayBadge, GoButton } from './shared';
import SectionHeader from './SectionHeader';

const SearchWrap = styled.div`
  margin-left: auto;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  font-size: 12px;
  pointer-events: none;
  opacity: 0.5;
`;

const SearchInput = styled.input`
  width: 240px;
  padding: 6px 32px 6px 30px;
  border: 1.5px solid ${({ theme }) => theme.colors.bd};
  border-radius: ${({ theme }) => theme.radius.r};
  font-size: 12.5px;
  font-family: ${({ theme }) => theme.font.sans};
  color: ${({ theme }) => theme.colors.tx};
  background: ${({ theme }) => theme.colors.card};
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.acc};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.alpha.accGlow};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.tx3};
  }
`;

const SearchClear = styled.span`
  position: absolute;
  right: 10px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.tx3};
  cursor: pointer;
  line-height: 1;
`;

const DlBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radius.r};
  border: 1.5px solid ${({ theme }) => theme.alpha.grnBorder};
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ theme }) => theme.colors.grnLt};
  color: ${({ theme }) => theme.colors.grn};
  font-family: ${({ theme }) => theme.font.sans};

  &:hover {
    background: ${({ theme }) => theme.alpha.grnHover};
    border-color: ${({ theme }) => theme.alpha.grnBorderStrong};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.alpha.grnGlow};
  }
`;

const Wrap = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.bd};
  border-radius: ${({ theme }) => theme.radius.r3};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.sh};
  animation: fade-up 0.3s 0.14s ease both;

  @media (max-width: 960px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  thead tr {
    background: ${({ theme }) => theme.colors.card2};
    border-bottom: 1.5px solid ${({ theme }) => theme.colors.bd};
  }
  thead th {
    padding: 11px 16px;
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.tx3};
    letter-spacing: 0.8px;
    text-transform: uppercase;
    text-align: left;
    font-family: ${({ theme }) => theme.font.mono};
  }
  thead th.c {
    text-align: center;
  }
`;

const Row = styled.tr`
  background: ${({ $today, theme }) =>
    $today ? theme.colors.todayRow : 'transparent'};

  td {
    padding: 13px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.bg};
    vertical-align: middle;
    transition: background 0.15s;
  }

  &:last-child td {
    border-bottom: none;
  }

  &:hover td {
    background: ${({ $today, theme }) =>
      $today ? theme.colors.todayRowHover : theme.colors.rowHover};
  }
`;

const CNo = styled.td`
  text-align: center;
  color: ${({ theme }) => theme.colors.tx3};
  font-size: 11px;
  font-family: ${({ theme }) => theme.font.mono};
  font-weight: 600;
`;

const CAg = styled.td`
  text-align: center;
`;

const CTl = styled.td`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.tx};
  line-height: 1.6;
  word-break: keep-all;
`;

const CDt = styled.td`
  text-align: center;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.tx2};
  font-family: ${({ theme }) => theme.font.mono};
  white-space: nowrap;
`;

const CBtn = styled.td`
  text-align: center;
  padding-right: 16px !important;
`;

const Empty = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.tx3};
`;

const AnnouncementTable = ({ announcements, searchQuery, onSearchChange }) => (
  <>
    <SectionHeader
      chip="Announcements"
      title="공고 목록"
      count={announcements.length}
    >
      <SearchWrap>
        <SearchIcon>🔍</SearchIcon>
        <SearchInput
          type="text"
          placeholder="기관명, 공고 제목 검색..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <SearchClear onClick={() => onSearchChange('')}>✕</SearchClear>
        )}
      </SearchWrap>
      <div>
        <DlBtn onClick={() => downloadExcel(announcements)}>
          ↓ 엑셀 다운로드
        </DlBtn>
      </div>
    </SectionHeader>
    <Wrap>
      <Table>
        <colgroup>
          <col style={{ width: '50px' }} />
          <col style={{ width: '86px' }} />
          <col />
          <col style={{ width: '96px' }} />
          <col style={{ width: '185px' }} />
          <col style={{ width: '100px' }} />
        </colgroup>
        <thead>
          <tr>
            <th className="c">No</th>
            <th className="c">기관</th>
            <th>공고 제목</th>
            <th className="c">등록일</th>
            <th className="c">공모기간</th>
            <th className="c">링크</th>
          </tr>
        </thead>
        <tbody>
          {announcements.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <Empty>검색 결과가 없습니다.</Empty>
              </td>
            </tr>
          ) : (
            announcements.map((a) => (
              <Row key={a.no} $today={a.isToday}>
                <CNo>{a.no}</CNo>
                <CAg>
                  <AgencyTag $color={a.meta.color} $bg={a.meta.bg}>
                    {a.agency}
                  </AgencyTag>
                </CAg>
                <CTl>
                  {a.title}
                  {a.isToday && <TodayBadge>TODAY</TodayBadge>}
                </CTl>
                <CDt>{a.registeredAt}</CDt>
                <CDt>{a.period}</CDt>
                <CBtn>
                  <GoButton href={a.link} target="_blank" rel="noreferrer">
                    바로가기
                  </GoButton>
                </CBtn>
              </Row>
            ))
          )}
        </tbody>
      </Table>
    </Wrap>
  </>
);

export default AnnouncementTable;
