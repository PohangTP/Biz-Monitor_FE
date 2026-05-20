import { apiFetch } from './client';

export const login = ({ username, password }) =>
  apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

export const register = ({ username, password, name, teamName, role }) =>
  apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      name,
      team_name: teamName,
      role,
    }),
  });

export const fetchTeams = () => apiFetch('/teams');
