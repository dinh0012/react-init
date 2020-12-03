import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const NoLayout = (props: Props) => {
  const { children } = props;

  return <>{children}</>;
};

export default NoLayout;
