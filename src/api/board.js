import { apiFetch } from './client';

export const listBoardPosts = (viewerUsername) =>
  apiFetch(
    `/board/posts?viewer_username=${encodeURIComponent(viewerUsername ?? '')}`
  );

export const createBoardPost = ({
  actorUsername,
  title,
  content,
  targetScope,
}) =>
  apiFetch('/board/posts', {
    method: 'POST',
    body: JSON.stringify({
      actor_username: actorUsername,
      title,
      content,
      target_scope: targetScope,
    }),
  });

export const uploadBoardFile = ({ postId, file, actorUsername }) => {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('actor_username', actorUsername);
  return apiFetch(`/board/posts/${postId}/files`, {
    method: 'POST',
    body: fd,
  });
};

export const deleteBoardPost = ({ postId, actorUsername }) =>
  apiFetch(
    `/board/posts/${postId}?actor_username=${encodeURIComponent(actorUsername)}`,
    { method: 'DELETE' }
  );
