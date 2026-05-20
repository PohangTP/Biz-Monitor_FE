import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.bd};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.tx3};
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.mono};
  letter-spacing: 0.3px;
`;

const LiveDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.grn};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.alpha.grnGlow};
  animation: pulse 2.5s ease-in-out infinite;
  flex-shrink: 0;
`;

const VisitorWrap = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.acc2};
  background: ${({ theme }) => theme.colors.accLt};
  border: 1px solid ${({ theme }) => theme.alpha.accBorder};
  padding: 2px 10px;
  border-radius: 20px;
  font-family: ${({ theme }) => theme.font.mono};
  font-weight: 600;
  margin-left: 6px;
`;

const Links = styled.div`
  display: flex;
  gap: 4px;
  @media (max-width: 960px) {
    display: none;
  }
`;

const TbLink = styled.a`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.tx3};
  padding: 3px 12px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.bd};
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.colors.acc};
    border-color: ${({ theme }) => theme.alpha.accBorderStrong};
    background: ${({ theme }) => theme.colors.accLt};
  }
`;

const Topbar = () => {
  const [hits, setHits] = useState(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    fetch('https://api.countapi.xyz/hit/234401-tech.github.io/biz-monitor')
      .then((r) => r.json())
      .then((d) => {
        if (d?.value) setHits(d.value.toLocaleString());
        else setHidden(true);
      })
      .catch(() => setHidden(true));
  }, []);

  return (
    <Bar>
      <Inner>
        <Left>
          <LiveDot />
          사업공고 자동 모니터링 &nbsp;
          {!hidden && (
            <VisitorWrap>
              👁 <span>{hits ?? '...'}</span>
            </VisitorWrap>
          )}
        </Left>
        <Links>
          <TbLink href="https://www.ptp.or.kr" target="_blank" rel="noreferrer">
            포항테크노파크
          </TbLink>
          <TbLink href="http://www.gbsw.or.kr" target="_blank" rel="noreferrer">
            경북AI혁신본부
          </TbLink>
        </Links>
      </Inner>
    </Bar>
  );
};

export default Topbar;
