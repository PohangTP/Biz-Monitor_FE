import styled from 'styled-components';

const Wrap = styled.footer`
  background: ${({ theme }) => theme.colors.card};
  border-top: 1px solid ${({ theme }) => theme.colors.bd};
  padding: 20px 0;
  margin-top: 64px;
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

const Copy = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.tx3};
`;

const Ver = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.tx3};
  font-family: ${({ theme }) => theme.font.mono};
  opacity: 0.6;
`;

const Footer = ({ collectedAt, version = 'v7.0' }) => (
  <Wrap>
    <Inner>
      <Copy>(재)포항테크노파크 경북AI혁신본부 · Made by AI융합산업팀</Copy>
      <Ver>사업공고 자동 수집 {version} · {collectedAt}</Ver>
    </Inner>
  </Wrap>
);

export default Footer;
