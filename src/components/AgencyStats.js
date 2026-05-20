import styled from 'styled-components';
import { AGENCIES } from '../data/agencies';
import SectionHeader from './SectionHeader';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 32px;
  animation: fade-up 0.3s 0.1s ease both;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

const Card = styled.a`
  display: block;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.bd};
  border-radius: ${({ theme }) => theme.radius.r2};
  padding: 18px 16px 15px;
  transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: ${({ theme }) => theme.shadow.sh};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $color }) => $color};
    border-radius: ${({ theme }) => theme.radius.r2}
      ${({ theme }) => theme.radius.r2} 0 0;
  }

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: ${({ theme }) => theme.shadow.sh2};
    border-color: ${({ theme }) => theme.colors.bd2};
  }
`;

const Label = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.font.mono};
`;

const Num = styled.div`
  font-size: 40px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.tx};
  line-height: 1;
  letter-spacing: -2px;

  span {
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.tx3};
    letter-spacing: 0;
    margin-left: 4px;
  }
`;

const Arrow = styled.div`
  position: absolute;
  bottom: 13px;
  right: 14px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.tx3};
  transition: all 0.2s;

  ${Card}:hover & {
    color: ${({ $color }) => $color};
    transform: translate(2px, -2px);
  }
`;

const AgencyStats = ({ counts }) => (
  <>
    <SectionHeader chip="Agencies" title="기관별 수집 현황" />
    <Grid>
      {AGENCIES.map((a) => (
        <Card
          key={a.code}
          href={a.url}
          target="_blank"
          rel="noreferrer"
          $color={a.accent}
        >
          <Label $color={a.accent}>{a.code}</Label>
          <Num>
            {counts[a.code] ?? 0}
            <span>건 수집</span>
          </Num>
          <Arrow $color={a.accent}>→</Arrow>
        </Card>
      ))}
    </Grid>
  </>
);

export default AgencyStats;
