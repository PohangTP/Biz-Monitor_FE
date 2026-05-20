import { apiFetch } from './client';

export const listNotices = (viewerUsername) =>
  apiFetch(
    `/notices?viewer_username=${encodeURIComponent(viewerUsername ?? '')}`
  );

export const createNotice = ({
  actorUsername,
  title,
  content,
  important,
  targetScope,
}) =>
  apiFetch('/notices', {
    method: 'POST',
    body: JSON.stringify({
      actor_username: actorUsername,
      title,
      content,
      important,
      target_scope: targetScope,
    }),
  });

export const uploadNoticeFile = ({ noticeId, file, actorUsername }) => {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('actor_username', actorUsername);
  return apiFetch(`/notices/${noticeId}/files`, {
    method: 'POST',
    body: fd,
  });
};

export const deleteNotice = ({ noticeId, actorUsername }) =>
  apiFetch(
    `/notices/${noticeId}?actor_username=${encodeURIComponent(actorUsername)}`,
    { method: 'DELETE' }
  );
