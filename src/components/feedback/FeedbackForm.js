import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Card, CardHeader } from '../ui/Card';
import { FormGroup, FormLabel } from '../ui/FormGroup';
import { FormInput } from '../ui/FormInput';
import Textarea from '../ui/Textarea';
import { BtnSmPrimary } from '../ui/BtnSm';

const BottomRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
`;

const FeedbackForm = ({ onSubmitting, onSubmitted, submitting }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const files = fileInputRef.current?.files
      ? Array.from(fileInputRef.current.files)
      : [];
    const ok = await onSubmitting({ title, content, files });
    if (ok) {
      setTitle('');
      setContent('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      onSubmitted?.();
    }
  };

  return (
    <Card as="form" onSubmit={handleSubmit}>
      <CardHeader title="건의사항 작성" />
      <FormGroup>
        <FormInput
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Textarea
          rows={4}
          placeholder="내용을 자유롭게 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>파일·이미지 첨부 (선택, 여러 개 가능)</FormLabel>
        <FormInput
          ref={fileInputRef}
          type="file"
          multiple
          style={{ padding: '6px' }}
        />
      </FormGroup>
      <BottomRow>
        <BtnSmPrimary type="submit" disabled={submitting}>
          {submitting ? '제출 중...' : '제출하기'}
        </BtnSmPrimary>
      </BottomRow>
    </Card>
  );
};

export default FeedbackForm;
