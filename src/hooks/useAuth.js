import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'pms_user';

const normalizeUser = (payload) => {
  const u = payload?.user ?? payload;
  if (!u) return null;
  return {
    name: u.name,
    dept: u.team_name || u.team || u.dept || '미배정',
    pos: u.pos || '',
    role: u.role || 'member',
    username: u.username || u.gwId,
    gwId: u.username || u.gwId,
    team_id: u.team_id ?? null,
    job_title: u.job_title || '',
    status: u.status || '정상',
    email: u.email || '',
    profile_image: u.profile_image || '',
    profile_image_url: u.profile_image_url || '',
  };
};

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const signIn = useCallback((payload) => {
    setUser(normalizeUser(payload));
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return { user, signIn, signOut };
};
