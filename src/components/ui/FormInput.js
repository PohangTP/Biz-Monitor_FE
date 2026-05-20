import styled, { css } from 'styled-components';

const inputStyles = css`
  width: 100%;
  padding: 13px 16px;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.alpha.accentGlow};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text3};
  }
`;

export const FormInput = styled.input`
  ${inputStyles}
`;

export const FormSelect = styled.select`
  ${inputStyles}
`;
