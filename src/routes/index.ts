import { ReactNode } from 'react';
import i18n from 'i18next';
import { PRIVATE_PATH, PUBLIC_PATH } from 'routes/path';
import loadable from 'common/utils/loadable';

export interface RoutePath {
  path: string;
  component: ReactNode;
  title: string | ((p) => string);
  isExact?: boolean;
}

export const ROUTES_PUBLIC: RoutePath[] = [
  {
    path: PUBLIC_PATH.LOGIN,
    component: loadable(() => import('pages/auth/Login')),
    title: i18n.t('Login'),
  },
];
export const ROUTES_PRIVATE: RoutePath[] = [
  {
    path: PRIVATE_PATH.HOME,
    isExact: true,
    component: loadable(() => import('pages/home')),
    title: i18n.t('Homepage'),
  },
];
