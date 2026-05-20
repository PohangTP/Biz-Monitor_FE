import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Card, CardHeader } from '../ui/Card';
import { FormGroup, FormRow, FormLabel } from '../ui/FormGroup';
import { FormInput } from '../ui/FormInput';
import Textarea from '../ui/Textarea';
import { BtnSmPrimary } from '../ui/BtnSm';
import ScopeSelect, { getDefaultScope } from '../ui/ScopeSelect';
import { useAuth } from '../../hooks/useAuth';

const BottomRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;

const ImportantLabel = styled.label`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text2};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input {
    accent-color: ${({ theme }) => theme.colors.accent};
  }
`;

const NoticeForm = ({ onSubmitting, onSubmitted, submitting }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [scope, setScope] = useState(() => getDefaultScope(user));
  const [important, setImportant] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const files = fileInputRef.current?.files
      ? Array.from(fileInputRef.current.files)
      : [];
    const ok = await onSubmitting({
      title,
      content,
      important,
      targetScope: scope,
      files,
    });
    if (ok) {
      setTitle('');
      setContent('');
      setImportant(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      onSubmitted?.();
    }
  };

  return (
    <Card as="form" onSubmit={handleSubmit}>
      <CardHeader title="새 공지 작성" />
      <FormGroup>
        <FormInput
          type="text"
          placeholder="공지 제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Textarea
          rows={4}
          placeholder="공지 내용을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormGroup>
      <FormRow>
        <FormGroup>
          <FormLabel>게시 대상</FormLabel>
          <ScopeSelect value={scope} onChange={setScope} />
        </FormGroup>
        <FormGroup>
          <FormLabel>첨부 파일 (선택, 여러 개 가능)</FormLabel>
          <FormInput
            ref={fileInputRef}
            type="file"
            multiple
            style={{ padding: '6px' }}
          />
        </FormGroup>
      </FormRow>
      <BottomRow>
        <ImportantLabel>
          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
          />
          중요 공지로 표시
        </ImportantLabel>
        <BtnSmPrimary type="submit" disabled={submitting}>
          {submitting ? '게시 중...' : '게시하기'}
        </BtnSmPrimary>
      </BottomRow>
    </Card>
  );
};

export default NoticeForm;
