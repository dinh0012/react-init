import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { ROUTES_PRIVATE, ROUTES_PUBLIC } from 'routes';
import AppRoute from 'routes/AppRoute';
import { GlobalStyle } from 'styles/global-styles';
import MainLayout from 'layout/main';
import NoLayout from 'layout/no-layout';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import ConfigProvider from 'antd/es/config-provider';

const App = () => {
  return (
    <ThemeProvider>
      <ConfigProvider prefixCls="inflow">
        <Router>
          <Switch>
            <>
              {ROUTES_PUBLIC.map(route => (
                <AppRoute
                  routePath={route}
                  layout={NoLayout}
                  key={route.path}
                  isAuthProtected={false}
                />
              ))}
              {ROUTES_PRIVATE.map(route => (
                <AppRoute
                  routePath={route}
                  layout={MainLayout}
                  key={route.path}
                  isAuthProtected
                />
              ))}
            </>
          </Switch>
        </Router>
        <GlobalStyle />
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
