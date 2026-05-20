import { apiFetch } from './client';

export const listFeedback = (viewerUsername) =>
  apiFetch(
    `/feedback/posts?viewer_username=${encodeURIComponent(viewerUsername ?? '')}`
  );

export const createFeedback = ({ actorUsername, title, content }) =>
  apiFetch('/feedback/posts', {
    method: 'POST',
    body: JSON.stringify({
      actor_username: actorUsername,
      title,
      content,
    }),
  });

export const uploadFeedbackFile = ({ postId, file, actorUsername }) => {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('actor_username', actorUsername);
  return apiFetch(`/feedback/posts/${postId}/files`, {
    method: 'POST',
    body: fd,
  });
};

export const deleteFeedback = ({ postId, actorUsername }) =>
  apiFetch(
    `/feedback/posts/${postId}?actor_username=${encodeURIComponent(actorUsername)}`,
    { method: 'DELETE' }
  );
