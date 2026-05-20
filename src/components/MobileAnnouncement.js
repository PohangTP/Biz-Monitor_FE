import styled from 'styled-components';
import { AgencyTag, TodayBadge, GoButton } from './shared';

const List = styled.div`
  display: none;
  animation: fade-up 0.3s 0.14s ease both;

  @media (max-width: 960px) {
    display: block;
  }
`;

const Card = styled.div`
  background: ${({ $today, theme }) =>
    $today ? theme.colors.todayCardBg : theme.colors.card};
  border: 1px solid
    ${({ $today, theme }) =>
      $today ? theme.colors.todayCardBorder : theme.colors.bd};
  border-radius: ${({ theme }) => theme.radius.r2};
  padding: 15px 16px;
  margin-bottom: 8px;
  box-shadow: ${({ theme }) => theme.shadow.sh};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.sh2};
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 6px;
`;

const DateTxt = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.tx3};
  font-family: ${({ theme }) => theme.font.mono};
  font-weight: 600;
  margin-left: auto;
`;

const Title = styled.div`
  font-size: 13px;
  line-height: 1.55;
  margin-bottom: 10px;
  word-break: keep-all;
  color: ${({ theme }) => theme.colors.tx};
`;

const Bot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Period = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.tx3};
  font-family: ${({ theme }) => theme.font.mono};
`;

const Empty = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.tx3};
`;

const MobileAnnouncement = ({ announcements }) => (
  <List>
    {announcements.length === 0 ? (
      <Empty>검색 결과가 없습니다.</Empty>
    ) : (
      announcements.map((a) => (
        <Card key={a.no} $today={a.isToday}>
          <Top>
            <AgencyTag $color={a.meta.color} $bg={a.meta.bg}>
              {a.agency}
            </AgencyTag>
            {a.isToday && <TodayBadge>TODAY</TodayBadge>}
            <DateTxt>{a.registeredAt}</DateTxt>
          </Top>
          <Title>{a.title}</Title>
          <Bot>
            <Period>{a.period}</Period>
            <GoButton href={a.link} target="_blank" rel="noreferrer" $sm>
              바로가기 →
            </GoButton>
          </Bot>
        </Card>
      ))
    )}
  </List>
);

export default MobileAnnouncement;
