const lightTheme = {
  primary: 'rgba(215,113,88,1)',
  text: 'rgba(58,52,51,1)',
  textSecondary: 'rgba(58,52,51,0.7)',
  background: '#ebeef0',
  backgroundVariant: 'rgba(251,249,249,1)',
  border: 'rgba(58,52,51,0.12)',
  borderLight: 'rgba(58,52,51,0.05)',
  divider: '#ced0d4',

  block: {
    background: '#FFFFFF',
    borderRadius: '8px',
  },

  backgroundHover: 'rgba(0, 0, 0, 0.05)',
  colorText: 'rgba(0,0,0,.85)',
};

const darkTheme: Theme = {
  primary: 'rgba(220,120,95,1)',
  text: 'rgba(241,233,231,1)',
  textSecondary: 'rgba(241,233,231,0.6)',
  background: 'rgba(0,0,0,1)',
  backgroundVariant: 'rgba(28,26,26,1)',
  border: 'rgba(241,233,231,0.15)',
  borderLight: 'rgba(241,233,231,0.05)',
  divider: '#ced0d4',
  block: {
    background: '#FFFFFF',
    borderRadius: '5px',
  },
  backgroundHover: 'rgba(0, 0, 0, 0.05)',
  colorText: 'rgba(0,0,0,.85)',
};

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
