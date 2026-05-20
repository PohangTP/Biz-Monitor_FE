import styled from 'styled-components';

const GridBg = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(${({ theme }) => theme.alpha.gridLine} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.alpha.gridLine} 1px, transparent 1px);
  background-size: 40px 40px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 60% at 50% 0%,
      ${({ theme }) => theme.alpha.gridGlow} 0%,
      transparent 60%
    );
  }
`;

export default GridBg;
