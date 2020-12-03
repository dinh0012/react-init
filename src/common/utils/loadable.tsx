import LoadingIndicator from 'components/loadingIndicator';
import LoadableVisibility from 'components/loadableVisibility';

export default (loader, loading = LoadingIndicator) =>
  LoadableVisibility({ loader, loading });
