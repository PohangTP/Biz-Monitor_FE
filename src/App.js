import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import MonitorPage from './pages/MonitorPage';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <MonitorPage />
  </ThemeProvider>
);

export default App;
