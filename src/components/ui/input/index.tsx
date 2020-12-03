import styled from 'styled-components';
import InputAnt, { InputProps as InputAntProps } from 'antd/es/input/Input';
import 'antd/es/input/style/index.less';
const Wrapper = styled.div``;
type InputProps = {} & InputAntProps;

const Input = (props: InputProps) => {
  return (
    <Wrapper>
      <InputAnt {...props} allowClear />
    </Wrapper>
  );
};

export default Input;
