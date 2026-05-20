import styled, { css } from 'styled-components';

const variants = {
  blue: css`
    background: rgba(59, 130, 246, 0.15);
    color: ${({ theme }) => theme.colors.accent};
  `,
  green: css`
    background: rgba(16, 185, 129, 0.15);
    color: ${({ theme }) => theme.colors.success};
  `,
  gold: css`
    background: rgba(245, 158, 11, 0.15);
    color: ${({ theme }) => theme.colors.gold};
  `,
  red: css`
    background: rgba(239, 68, 68, 0.15);
    color: ${({ theme }) => theme.colors.danger};
  `,
  purple: css`
    background: rgba(139, 92, 246, 0.15);
    color: ${({ theme }) => theme.colors.leader};
  `,
  gray: css`
    background: rgba(148, 163, 184, 0.15);
    color: ${({ theme }) => theme.colors.text2};
  `,
};

const Badge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  ${({ $color = 'blue' }) => variants[$color] ?? variants.blue}
`;

export default Badge;
