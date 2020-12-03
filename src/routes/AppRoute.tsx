import { Route, Redirect } from 'react-router-dom';
import { PRIVATE_PATH, PUBLIC_PATH } from 'routes/path';
import Title from './Title';
import { RoutePath } from 'routes/index';
import { getStorage } from 'common/utils/storage';

interface Props {
  routePath: RoutePath;
  layout: any;
  isAuthProtected;
}

const AppRoute = (props: Props) => {
  const { routePath, isAuthProtected, layout } = props;
  const { title, path } = routePath;
  const Component: any = routePath.component;
  const Layout = layout;

  return (
    <>
      <Route
        exact
        path={path}
        render={componentProps => {
          if (isAuthProtected && !getStorage('token')) {
            return (
              <Redirect
                to={{
                  pathname: PUBLIC_PATH.LOGIN,
                  state: { from: componentProps.location },
                }}
              />
            );
          }

          if (!isAuthProtected && getStorage('token')) {
            return <Redirect to={{ pathname: PRIVATE_PATH.HOME }} />;
          }

          return (
            <Layout>
              <Title title={title} />
              <Component {...componentProps} />
            </Layout>
          );
        }}
      />
    </>
  );
};

export default AppRoute;
