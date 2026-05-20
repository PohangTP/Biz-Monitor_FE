import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthPage,
  AuthCard,
  AuthDivider,
  AuthError,
} from '../components/ui/AuthCard';
import { FormGroup, FormLabel } from '../components/ui/FormGroup';
import { FormInput } from '../components/ui/FormInput';
import { BtnPrimary, BtnGhost } from '../components/ui/BtnPrimary';
import LogoArea from '../components/ui/LogoArea';
import { login } from '../api/auth';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!username.trim() || !password) {
      setError('아이디와 비밀번호를 입력하세요');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const data = await login({ username: username.trim(), password });
      signIn(data);
      navigate('/', { replace: true });
    } catch (err) {
      setError(
        err?.status === 401 || err?.status === 400
          ? '아이디 또는 비밀번호가 올바르지 않습니다'
          : '서버 연결에 실패했습니다.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthPage as="form" onSubmit={handleLogin}>
      <AuthCard>
        <LogoArea compact />
        {error && <AuthError>{error}</AuthError>}
        <FormGroup>
          <FormLabel>그룹웨어 아이디</FormLabel>
          <FormInput
            type="text"
            placeholder="예) hong.gildong"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>비밀번호</FormLabel>
          <FormInput
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <BtnPrimary type="submit" disabled={submitting}>
          🔐 {submitting ? '로그인 중...' : '로그인'}
        </BtnPrimary>
        <AuthDivider>또는</AuthDivider>
        <BtnGhost type="button" onClick={() => navigate('/register')}>
          ✏️ 새 계정 만들기
        </BtnGhost>
      </AuthCard>
    </AuthPage>
  );
};

export default LoginPage;
