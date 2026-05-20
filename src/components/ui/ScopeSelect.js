import { useEffect, useState } from 'react';
import { FormSelect } from './FormInput';
import { fetchTeams } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';

const GLOBAL_ROLES = new Set(['sysadmin', 'admin']);

const ScopeSelect = ({ value, onChange, allLabel = '📢 전체 (모든 팀)' }) => {
  const { user } = useAuth();
  const isGlobal = GLOBAL_ROLES.has(user?.role);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (!isGlobal) return;
    fetchTeams()
      .then((data) => setTeams(Array.isArray(data) ? data : []))
      .catch(() => setTeams([]));
  }, [isGlobal]);

  return (
    <FormSelect value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="all">{allLabel}</option>
      {isGlobal ? (
        teams.map((t) => (
          <option key={t.id ?? t.name} value={String(t.id)}>
            {t.name}
          </option>
        ))
      ) : (
        <option value={String(user?.team_id ?? '')}>
          {user?.dept || '본인 팀'}
        </option>
      )}
    </FormSelect>
  );
};

export const getDefaultScope = (user) =>
  GLOBAL_ROLES.has(user?.role) ? 'all' : String(user?.team_id ?? '');

export default ScopeSelect;
