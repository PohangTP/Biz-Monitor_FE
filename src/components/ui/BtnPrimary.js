import styled, { css } from 'styled-components';

const baseStyles = css`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
  letter-spacing: -0.3px;
`;

export const BtnPrimary = styled.button`
  ${baseStyles}
  background: ${({ theme }) => theme.gradient.btn};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.alpha.accentShadowStrong};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const BtnGhost = styled.button`
  ${baseStyles}
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text2};
  font-weight: 500;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.text};
  }
`;
