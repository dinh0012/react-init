import 'antd/es/message/style/index.css';
import message, { ConfigOnClose } from 'antd/es/message';
import { ReactNode } from 'react';
type Func = () => void;

export const alertSuccess = (
  content: ReactNode | string,
  duration?: number,
  onClose?: Func,
) => message.success(content, duration, onClose);

export const alertError = (
  content: ReactNode | string,
  duration?: number,
  onClose?: Func,
) => message.error(content, duration, onClose);
