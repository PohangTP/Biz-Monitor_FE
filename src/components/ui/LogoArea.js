import styled from 'styled-components';

const Wrap = styled.div`
  text-align: center;
  margin-bottom: ${({ $compact }) => ($compact ? '32px' : '36px')};
`;

const Icon = styled.div`
  width: 56px;
  height: 56px;
  background: ${({ theme }) => theme.gradient.accentDiag};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin-bottom: 16px;
  box-shadow: 0 8px 32px ${({ theme }) => theme.alpha.accentShadow};
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.text};
`;

const Sub = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text2};
  margin-top: 4px;
`;

const LogoArea = ({ compact = false }) => (
  <Wrap $compact={compact}>
    <Icon>🏢</Icon>
    <Title>부서 사업 관리 시스템</Title>
    <Sub>Department Project Management</Sub>
  </Wrap>
);

export default LogoArea;
