import i18next from 'i18next';

export const MGS_INVALID_EMAIL = i18next.t('The input is not valid E-mail!');
export const MGS_INVALID_NUMBER = i18next.t('The value is not a number!');
export const MGS_INVALID_USERNAME = i18next.t('The username is invalid!');
export const MGS_INVALID_PASSWORD = i18next.t('The password is invalid!');
export const MGS_INVALID_PHONE_NUMBER = i18next.t(
  'The value is not a phone number!',
);

export const mgsRequiredSelect = fieldName =>
  i18next.t('Please select {{field}}!', { field: fieldName });

export const mgsRequiredInput = fieldName =>
  i18next.t('Please input {{field}}!', { field: fieldName });

export const mgsRequired = fieldName => {
  if (fieldName) {
    return i18next.t('The field {{field}} is required!', {
      field: fieldName,
    });
  }

  return i18next.t('The field is required!');
};
