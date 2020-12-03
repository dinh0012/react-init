import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
const Wrapper = styled.div``;
interface Props {}

const Home = (props: Props) => {
  const { t } = useTranslation();

  return <Wrapper>{t('content')}</Wrapper>;
};

export default Home;
