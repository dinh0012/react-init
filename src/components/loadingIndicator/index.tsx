import styled, { keyframes } from 'styled-components';

interface Props {
  fullScreen?: boolean;
}

const clip = keyframes`
  0% {transform: rotate(0deg) scale(1)}
  50% {transform: rotate(180deg) scale(1)}
  100% {transform: rotate(360deg) scale(1)}
`;
const Wrapper = styled.div<Props>`
  width: ${p => (p.fullScreen ? '100vw' : '100%')};
  height: ${p => (p.fullScreen ? '100vh' : '100%')};
  display: flex;
  min-height: 350px;
  justify-content: center;
  align-items: center;
  min-width: 350px;
  .spinner {
    height: 30px;
    width: 30px;
    display: inline-block;
    border-radius: 100%;
    border-width: 5px;
    border-style: solid;
    border-image: initial;
    border-color: #999 #999 transparent;
    animation: ${clip} 0.75s 0s infinite linear;
    background: transparent !important;
  }
`;
const LoadingIndicator = ({ fullScreen = false }: Props) => (
  <>
    <Wrapper fullScreen={fullScreen}>
      <div className="spinner"></div>
    </Wrapper>
  </>
);

export default LoadingIndicator;
