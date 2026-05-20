import styled from 'styled-components';
import { AGENCIES } from '../data/agencies';

const AGENCY_LIST = AGENCIES.map((a) => a.code).join(' · ');

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: 28px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.bd};
  border-left: 3px solid ${({ theme }) => theme.colors.acc};
  border-radius: ${({ theme }) => theme.radius.r2};
  box-shadow: ${({ theme }) => theme.shadow.sh};
  animation: fade-up 0.3s 0.06s ease both;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  padding: 3px 11px;
  border-radius: 20px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ $today, theme }) =>
    $today ? theme.colors.red : theme.colors.tx2};
  background: ${({ $today, theme }) =>
    $today ? theme.colors.redLt : theme.colors.bg};
  border: 1px solid
    ${({ $today, theme }) =>
      $today ? theme.alpha.redBorder : theme.colors.bd};

  strong {
    color: ${({ $today, theme }) =>
      $today ? theme.colors.red : theme.colors.tx};
    font-weight: 700;
  }
`;

const Infobar = () => (
  <Bar>
    <Pill>
      📅 <strong>수집 기준</strong> 최근 5일 이내 등록 공고
    </Pill>
    <Pill>
      🔄 <strong>업데이트</strong> 1시간마다 자동 수집
    </Pill>
    <Pill>
      🏢 <strong>수집 기관</strong> {AGENCY_LIST}
    </Pill>
    <Pill $today>
      🔴 <strong>TODAY</strong> 당일 등록 공고 표시
    </Pill>
  </Bar>
);

export default Infobar;
