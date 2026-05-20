import styled, { css } from 'styled-components';

const base = css`
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
  white-space: nowrap;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const BtnSmPrimary = styled.button`
  ${base}
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accentDark};
  }
`;

export const BtnSmGhost = styled.button`
  ${base}
  background: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text2};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const BtnSmDanger = styled.button`
  ${base}
  background: rgba(239, 68, 68, 0.1);
  color: ${({ theme }) => theme.colors.danger};
  border: 1px solid rgba(239, 68, 68, 0.2);

  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.2);
  }
`;
