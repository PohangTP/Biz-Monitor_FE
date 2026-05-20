import styled from 'styled-components';

export const AuthPage = styled.div`
  min-height: 100vh;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: ${({ $wide }) => ($wide ? '480px' : '420px')};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 48px 40px;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.gradient.accent};
  }
`;

export const AuthDivider = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text3};
  font-size: 12px;
  margin: 20px 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 42%;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
`;

export const AuthError = styled.div`
  background: ${({ theme }) => theme.alpha.dangerBg};
  border: 1px solid ${({ theme }) => theme.alpha.dangerBorder};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 10px 14px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
  margin-bottom: 16px;
`;

export const AuthFooterLink = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text2};

  a,
  button {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    cursor: pointer;
    font-weight: 600;
    background: none;
    border: none;
    padding: 0;
    font-size: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;
