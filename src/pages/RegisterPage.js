import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthPage,
  AuthCard,
  AuthError,
  AuthFooterLink,
} from '../components/ui/AuthCard';
import { FormGroup, FormRow, FormLabel } from '../components/ui/FormGroup';
import { FormInput, FormSelect } from '../components/ui/FormInput';
import { BtnPrimary } from '../components/ui/BtnPrimary';
import LogoArea from '../components/ui/LogoArea';
import RoleSelector from '../components/auth/RoleSelector';
import { register, fetchTeams } from '../api/auth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('member');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [teamName, setTeamName] = useState('');
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTeams()
      .then(setTeams)
      .catch(() => setTeams([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !teamName || !pw1) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (pw1 !== pw2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await register({
        username: username.trim(),
        password: pw1,
        name: name.trim(),
        teamName,
        role,
      });
      alert('가입이 완료되었습니다! 로그인 화면으로 이동합니다.');
      navigate('/login');
    } catch (err) {
      setError(err?.message || '회원가입에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthPage as="form" onSubmit={handleSubmit}>
      <AuthCard $wide>
        <LogoArea />
        {error && <AuthError>{error}</AuthError>}
        <RoleSelector value={role} onChange={setRole} />
        <FormRow>
          <FormGroup>
            <FormLabel>이름</FormLabel>
            <FormInput
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>그룹웨어 아이디</FormLabel>
            <FormInput
              type="text"
              placeholder="예) hong.gildong"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
        </FormRow>
        <FormGroup>
          <FormLabel>팀명</FormLabel>
          <FormSelect
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          >
            <option value="">소속 팀 선택</option>
            {teams.map((t) => (
              <option key={t.name ?? t} value={t.name ?? t}>
                {t.name ?? t}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
        <FormRow>
          <FormGroup>
            <FormLabel>비밀번호</FormLabel>
            <FormInput
              type="password"
              placeholder="••••••••"
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>비밀번호 확인</FormLabel>
            <FormInput
              type="password"
              placeholder="••••••••"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
            />
          </FormGroup>
        </FormRow>
        <BtnPrimary type="submit" disabled={submitting}>
          ✓ {submitting ? '가입 처리 중...' : '가입 완료'}
        </BtnPrimary>
        <AuthFooterLink>
          이미 계정이 있으신가요?{' '}
          <button type="button" onClick={() => navigate('/login')}>
            로그인
          </button>
        </AuthFooterLink>
      </AuthCard>
    </AuthPage>
  );
};

export default RegisterPage;
