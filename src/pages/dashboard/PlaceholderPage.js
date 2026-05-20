import styled from 'styled-components';
import PageHeader from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';

const Center = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.text3};
  font-size: 14px;
  line-height: 1.8;
`;

const Big = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const PlaceholderPage = ({ title = '준비 중', icon = '🚧' }) => (
  <>
    <PageHeader
      title={`${icon} ${title}`}
      description="이 화면은 아직 React로 구현되지 않았습니다."
    />
    <Card>
      <Center>
        <Big>{icon}</Big>
        <div>다음 Phase에서 구현됩니다.</div>
      </Center>
    </Card>
  </>
);

export default PlaceholderPage;
