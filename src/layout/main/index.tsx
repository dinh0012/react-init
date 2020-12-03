import styled from 'styled-components';
import Header from 'layout/main/header';
const Wrapper = styled.div``;
interface Props {
  children: React.ReactNode;
}

const MainLayout = (props: Props) => {
  const { children } = props;

  return (
    <Wrapper>
      <Header />
      <div className="wrapper-content">{children}</div>
    </Wrapper>
  );
};

export default MainLayout;
