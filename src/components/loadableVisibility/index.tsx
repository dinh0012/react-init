import { useEffect, useState, useRef, createElement } from 'react';
import ReactLoadable from 'react-loadable';

let intersectionObserver;
const trackedElements = new Map();
const IntersectionObserver =
  typeof window !== 'undefined' && window.IntersectionObserver;

if (IntersectionObserver) {
  intersectionObserver = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      const visibilityHandler = trackedElements.get(entry.target);

      if (
        visibilityHandler &&
        (entry.isIntersecting || entry.intersectionRatio > 0)
      ) {
        visibilityHandler();
      }
    });
  });
}

function createLoadableVisibilityComponent(
  args,
  { Loadable, preloadFunc, LoadingComponent },
) {
  let preloaded = false;
  const visibilityHandlers: any = [];

  const LoadableComponent = Loadable(...args);

  function LoadableVisibilityComponent(props) {
    const visibilityElementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setVisible] = useState(preloaded);

    function visibilityHandler() {
      if (visibilityElementRef.current) {
        intersectionObserver.unobserve(visibilityElementRef.current);
        trackedElements.delete(visibilityElementRef.current);
      }

      setVisible(true);
    }

    // eslint-disable-next-line consistent-return
    useEffect((): any => {
      const element = visibilityElementRef.current;

      if (!isVisible && element) {
        visibilityHandlers.push(visibilityHandler);

        trackedElements.set(element, visibilityHandler);
        intersectionObserver.observe(element);

        return () => {
          const handlerIndex = visibilityHandlers.indexOf(visibilityHandler);

          if (handlerIndex >= 0) {
            visibilityHandlers.splice(handlerIndex, 1);
          }

          intersectionObserver.unobserve(element);
          trackedElements.delete(element);
        };
      }
    }, [isVisible, visibilityElementRef.current]);

    if (isVisible) {
      return <LoadableComponent {...props} />;
    }

    if (LoadingComponent || props.fallback) {
      const options = {
        isLoading: true,
        ...props,
      };

      return (
        <div
          style={{
            display: 'inline-block',
            minHeight: '1px',
            minWidth: '1px',
          }}
          ref={visibilityElementRef}
        >
          {LoadingComponent
            ? createElement(LoadingComponent, options)
            : props.fallback}
        </div>
      );
    }

    return (
      <div
        style={{ display: 'inline-block', minHeight: '1px', minWidth: '1px' }}
        {...props}
        ref={visibilityElementRef}
      />
    );
  }

  LoadableVisibilityComponent[preloadFunc] = () => {
    if (!preloaded) {
      preloaded = true;
      visibilityHandlers.forEach(handler => handler());
    }

    return LoadableComponent[preloadFunc]();
  };

  return LoadableVisibilityComponent;
}

function LoadableVisibility(opts) {
  if (IntersectionObserver) {
    return createLoadableVisibilityComponent([opts], {
      Loadable: ReactLoadable,
      preloadFunc: 'preload',
      LoadingComponent: opts.loading,
    });
  }

  return ReactLoadable(opts);
}

export default LoadableVisibility;
