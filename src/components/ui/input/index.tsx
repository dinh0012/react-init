import React from 'react';
import styled from 'styled-components';
import InputAnt from 'antd/es/input/Input'
import 'antd/es/input/style/index.less';
import './index.less'
const Wrapper = styled.div`

`;
const Input = (props) => {
  return (
    <Wrapper>
      <InputAnt prefixCls="inflow-input" allowClear/>
    </Wrapper>
  );
};
export default Input;
