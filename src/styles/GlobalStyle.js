import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{box-sizing:border-box;margin:0;padding:0}

  body{
    font-family:${({ theme }) => theme.font.sans};
    background:${({ theme }) => theme.colors.bg};
    color:${({ theme }) => theme.colors.tx};
    font-size:14px;
    line-height:1.6;
    min-height:100vh;
    -webkit-font-smoothing:antialiased;
  }

  a{color:inherit;text-decoration:none}

  @keyframes pulse{
    0%,100%{box-shadow:0 0 0 3px rgba(5,150,105,0.15)}
    50%{box-shadow:0 0 0 7px rgba(5,150,105,0.04)}
  }
  @keyframes shimmer{
    0%{background-position:200% 0}
    100%{background-position:-200% 0}
  }
  @keyframes badge{
    0%,100%{opacity:1}
    50%{opacity:.6}
  }
  @keyframes fade-up{
    from{opacity:0;transform:translateY(10px)}
    to{opacity:1;transform:translateY(0)}
  }
`;
