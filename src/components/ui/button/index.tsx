import styled from 'styled-components';
import AntButton, { ButtonProps } from 'antd/es/button';
import 'antd/es/button/style/index.less';
const Wrapper = styled.div``;
interface Props {}

const Button = (props: Props & ButtonProps) => {
  return (
    <Wrapper>
      <AntButton {...props} />
    </Wrapper>
  );
};

export default Button;
