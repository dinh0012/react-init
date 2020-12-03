import {
  MGS_INVALID_EMAIL,
  MGS_INVALID_NUMBER,
  MGS_INVALID_PASSWORD,
  MGS_INVALID_PHONE_NUMBER,
  MGS_INVALID_USERNAME,
  mgsRequired,
} from './const';
import i18next from 'i18next';
export const validateConfirmPassword = ({ getFieldValue }) => ({
  validator(rule, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }

    return Promise.reject(
      Error(i18next.t('The two passwords that you entered do not match!')),
    );
  },
});

export const validateUsername = () => ({
  validator(rule, value) {
    if (!value || /^[a-z0-9_\-.]{4,12}$/.test(value.trim())) {
      return Promise.resolve();
    }

    return Promise.reject(Error(MGS_INVALID_USERNAME));
  },
});

export const validatePassword = () => ({
  validator(rule, value) {
    if (!value || /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(Error(MGS_INVALID_PASSWORD));
  },
});

export const validateNumber = () => ({
  validator(rule, value) {
    if (!value || /^[0-9.]+$/.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(Error(MGS_INVALID_NUMBER));
  },
});

export const validatePhoneNumber = () => ({
  validator(rule, value) {
    if (!value || /^[0-9\s]+$/.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(Error(MGS_INVALID_PHONE_NUMBER));
  },
});

export const mapRuleToValidator = field => ({
  required: {
    required: true,
    message: mgsRequired(field),
  },
  number: validateNumber,
  email: {
    type: 'email',
    message: MGS_INVALID_EMAIL,
  },
  phone: validatePhoneNumber,
});
