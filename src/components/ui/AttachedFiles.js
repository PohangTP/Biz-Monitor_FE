import styled from 'styled-components';
import { absoluteUrl } from '../../api/client';

const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i;

const fmtBytes = (n) => {
  if (!n && n !== 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let v = n;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
};

const Wrap = styled.div`
  background: ${({ theme }) => theme.colors.surface2};
  border-radius: 6px;
  padding: 6px 10px;
  margin: 6px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  padding: 2px 0;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: underline;
`;

const Size = styled.span`
  color: ${({ theme }) => theme.colors.text3};
`;

const Empty = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text3};
  padding: 4px 0;
`;

const Preview = styled.div`
  margin: 4px 0 2px;

  img {
    max-width: 240px;
    max-height: 160px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    display: block;
  }
`;

const AttachedFiles = ({ files, showEmpty = false, withImagePreview = false }) => {
  if (!files || files.length === 0) {
    return showEmpty ? <Empty>첨부 파일 없음</Empty> : null;
  }
  return (
    <Wrap>
      {files.map((f) => {
        const isImg = withImagePreview && IMAGE_EXT.test(f.original_filename || '');
        const url = absoluteUrl(f.download_url);
        return (
          <div key={f.id}>
            <Row>
              <span>{isImg ? '🖼' : '📎'}</span>
              <Link
                href={url}
                target="_blank"
                rel="noreferrer"
                download={f.original_filename}
              >
                {f.original_filename}
              </Link>
              <Size>({fmtBytes(f.file_size)})</Size>
            </Row>
            {isImg && (
              <Preview>
                <a href={url} target="_blank" rel="noreferrer">
                  <img src={url} alt={f.original_filename} loading="lazy" />
                </a>
              </Preview>
            )}
          </div>
        );
      })}
    </Wrap>
  );
};

export default AttachedFiles;
