import styled from 'styled-components';

export const FormGroup = styled.div`
  margin-bottom: 18px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text2};
  margin-bottom: 8px;
  letter-spacing: 0.3px;
`;
