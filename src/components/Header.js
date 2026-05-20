import styled from 'styled-components';

const Wrap = styled.header`
  background: ${({ theme }) => theme.colors.card};
  border-bottom: 1px solid ${({ theme }) => theme.colors.bd};
  position: relative;
  overflow: hidden;
  animation: fade-up 0.3s ease both;
`;

const Accent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${({ theme }) => theme.gradient.accent};
  background-size: 200% 100%;
  animation: shimmer 4s linear infinite;
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 22px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 960px) {
    flex-wrap: wrap;
    gap: 14px;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const BrandIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${({ theme }) => theme.gradient.brand};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  box-shadow: 0 4px 14px ${({ theme }) => theme.alpha.brandShadow};
`;

const BrandSub = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.tx3};
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const BrandMain = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.tx};
  letter-spacing: -0.5px;
`;

const Divider = styled.div`
  width: 1px;
  height: 28px;
  background: ${({ theme }) => theme.colors.bd};
  margin: 0 18px;
`;

const Org = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.tx2};

  small {
    display: block;
    font-size: 10px;
    color: ${({ theme }) => theme.colors.tx3};
    margin-bottom: 1px;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 960px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const DateTime = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.tx3};
  text-align: right;
  line-height: 2;

  strong {
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.tx2};
    font-weight: 600;
  }
`;

const StatBox = styled.div`
  text-align: center;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radius.r2};
  min-width: 90px;
  background: ${({ $color, theme }) =>
    $color === 'red' ? theme.colors.redLt : theme.colors.accLt};
  border: 1.5px solid
    ${({ $color, theme }) =>
      $color === 'red' ? theme.alpha.redStatBorder : theme.alpha.accStatBorder};
`;

const StatNum = styled.div`
  font-size: 28px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -1px;
  color: ${({ $color, theme }) =>
    $color === 'red' ? theme.colors.red : theme.colors.acc};
`;

const StatLbl = styled.div`
  font-size: 10px;
  margin-top: 3px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: ${({ $color, theme }) =>
    $color === 'red' ? theme.colors.red : theme.colors.acc2};
`;

const Stat = ({ color, num, label }) => (
  <StatBox $color={color}>
    <StatNum $color={color}>{num}</StatNum>
    <StatLbl $color={color}>{label}</StatLbl>
  </StatBox>
);

const Header = ({ collectedAt, todayCount, totalCount }) => (
  <Wrap>
    <Accent />
    <Inner>
      <Brand>
        <BrandIcon>📡</BrandIcon>
        <div>
          <BrandSub>Business Announcement Monitor</BrandSub>
          <BrandMain>사업공고 모니터링</BrandMain>
        </div>
        <Divider />
        <Org>
          <small>운영기관</small>경북AI혁신본부
        </Org>
      </Brand>
      <Right>
        <DateTime>
          수집일시<strong>{collectedAt}</strong>
        </DateTime>
        <Stat color="red" num={todayCount} label="오늘 신규" />
        <Stat color="acc" num={totalCount} label="총 수집 건수" />
      </Right>
    </Inner>
  </Wrap>
);

export default Header;
