import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { themes } from 'styles/theme/themes';
import '../automic.css';
import { Children, ReactChild } from 'react';
interface Props {
  children: ReactChild;
}

export const ThemeProvider = (props: Props) => {
  const theme = themes.light;

  return (
    <OriginalThemeProvider theme={theme}>
      {Children.only(props.children)}
    </OriginalThemeProvider>
  );
};
