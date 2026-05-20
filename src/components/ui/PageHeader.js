import styled from 'styled-components';

const Wrap = styled.div`
  margin-bottom: 28px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.text};
`;

const Sub = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text2};
  margin-top: 4px;
`;

const Right = styled.div`
  margin-left: auto;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const PageHeader = ({ title, description, right }) => (
  <Wrap>
    <Row>
      <div>
        <Title>{title}</Title>
        {description && <Sub>{description}</Sub>}
      </div>
      {right && <Right>{right}</Right>}
    </Row>
  </Wrap>
);

export default PageHeader;
