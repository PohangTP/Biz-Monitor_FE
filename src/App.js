import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { ToastProvider } from './hooks/useToast';
import { ModalProvider } from './hooks/useModal';
import GridBg from './components/ui/GridBg';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import { useAuth } from './hooks/useAuth';

const Protected = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const PublicOnly = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard/overview" replace /> : children;
};

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <ToastProvider>
      <ModalProvider>
        <GridBg />
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicOnly>
                  <LoginPage />
                </PublicOnly>
              }
            />
            <Route
              path="/register"
              element={
                <PublicOnly>
                  <RegisterPage />
                </PublicOnly>
              }
            />
            <Route
              path="/dashboard/:tabId"
              element={
                <Protected>
                  <DashboardLayout />
                </Protected>
              }
            />
            <Route
              path="/"
              element={<Navigate to="/dashboard/overview" replace />}
            />
            <Route
              path="*"
              element={<Navigate to="/dashboard/overview" replace />}
            />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </ToastProvider>
  </ThemeProvider>
);

export default App;
