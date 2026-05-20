import { formatFileDate } from './date';

const HEADERS = ['No', '기관', '공고 제목', '등록일', '공모기간', '링크'];

export const downloadExcel = (announcements) => {
  const headerHtml = HEADERS.map(
    (h) =>
      `<th style="background:#1E3A5F;color:white;font-weight:bold">${h}</th>`
  ).join('');

  const rowsHtml = announcements
    .map((a) => {
      const cells = [
        a.no,
        a.agency,
        a.title,
        a.registeredAt,
        a.period,
        `<a href="${a.link}">${a.link}</a>`,
      ];
      return '<tr>' + cells.map((c) => `<td>${c}</td>`).join('') + '</tr>';
    })
    .join('');

  const html = `<html><head><meta charset="UTF-8"></head><body><table border="1"><tr>${headerHtml}</tr>${rowsHtml}</table></body></html>`;
  const encoded =
    'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(html);

  const a = document.createElement('a');
  a.href = encoded;
  a.download = `사업공고_${formatFileDate()}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
