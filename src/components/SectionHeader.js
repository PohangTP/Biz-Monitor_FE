import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  flex-wrap: wrap;
`;

const Chip = styled.span`
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.acc};
  background: ${({ theme }) => theme.colors.accLt};
  border: 1px solid ${({ theme }) => theme.alpha.accBorder};
  padding: 3px 11px;
  border-radius: 20px;
  font-family: ${({ theme }) => theme.font.mono};
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.tx};
  letter-spacing: -0.3px;
`;

const Count = styled.span`
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.tx3};
  font-weight: 600;
  font-family: ${({ theme }) => theme.font.mono};
  margin-left: 2px;
`;

const SectionHeader = ({ chip, title, count, children }) => (
  <Wrap>
    <Chip>{chip}</Chip>
    <Title>{title}</Title>
    {count != null && <Count>· {count} results</Count>}
    {children}
  </Wrap>
);

export default SectionHeader;
