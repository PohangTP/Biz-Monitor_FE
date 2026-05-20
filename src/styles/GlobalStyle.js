import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{margin:0;padding:0;box-sizing:border-box}

  body{
    font-family:${({ theme }) => theme.font.sans};
    background:${({ theme }) => theme.colors.bg};
    color:${({ theme }) => theme.colors.text};
    min-height:100vh;
    overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
  }

  a{color:inherit;text-decoration:none}
  button{font-family:inherit}
  input,select,textarea{font-family:inherit}

  @keyframes fadeIn{
    from{opacity:0;transform:translateY(-4px)}
    to{opacity:1;transform:translateY(0)}
  }
  @keyframes slideUp{
    from{opacity:0;transform:translateY(24px)}
    to{opacity:1;transform:translateY(0)}
  }
  @keyframes slideInRight{
    from{transform:translateX(100%);opacity:0}
    to{transform:translateX(0);opacity:1}
  }
  @keyframes spin{
    to{transform:rotate(360deg)}
  }
`;
