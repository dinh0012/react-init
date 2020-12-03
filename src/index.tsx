import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './service-worker';
import i18next, { initialLocalize } from 'i18n';
import LoadingIndicator from 'components/loadingIndicator';
import loadable from 'common/utils/loadable';
const App = loadable(() => import('App'));

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect((): any => {
    if (i18next.isInitialized) {
      return;
    }

    initialLocalize().then(() => {
      setLoading(false);
    });
  }, [i18next.isInitialized]);

  return <>{loading ? <LoadingIndicator fullScreen /> : <App />}</>;
};

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.register();
