import styled from 'styled-components';

const Spinner = styled.div`
  width: ${({ $size = 24 }) => $size}px;
  height: ${({ $size = 24 }) => $size}px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.accent};
  animation: spin 0.8s linear infinite;
`;

export default Spinner;
