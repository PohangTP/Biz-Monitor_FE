export const getTodayString = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const isToday = (dateStr) => dateStr === getTodayString();

export const formatFileDate = () =>
  new Date().toISOString().slice(0, 10).replace(/-/g, '');
