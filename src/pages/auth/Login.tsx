import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Form from 'components/ui/form';
import Field from 'components/ui/form/Field';
import Input from 'components/ui/input';
import Password from 'antd/es/input/Password';
import { useCallback } from 'react';
import { loginRequest } from 'api-entry-point/auth';
import { getStorage, setStorage } from 'common/utils/storage';
import { useHistory } from 'react-router-dom';
import Checkbox from 'components/ui/checkbox';
import { alertError } from 'common/utils/alert';
const Wrapper = styled.div``;
const clinicCodeStorage = getStorage('clinicCode') || '';
const initialValues = { clinicCode: clinicCodeStorage };

const Login = () => {
  const { t } = useTranslation();
  const {
    location: {
      state: { from },
    },
  } = useHistory<any>();
  const { pathname = '/' } = from || {};
  console.log(from);
  const handleSubmit = useCallback(values => {
    const { username, password, rememberMe = [], clinicCode } = values;

    return loginRequest({
      username: `${clinicCode}:${username}`,
      password: password,
      rememberMe: rememberMe[0],
    })
      .then(({ id_token }: any) => {
        setStorage('token', id_token);
        setStorage('clinicCode', clinicCode);
        // window.location.href = pathname;
      })
      .catch(() => {
        alertError(t('loginError'));
      });
  }, []);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <Field
          component={Input}
          name="clinicCode"
          label={t('clinicCode')}
          required
          validators={['required']}
        />
        <Field
          component={Input}
          name="username"
          label={t('username')}
          validators={['required']}
          required
        />
        <Field
          component={Password}
          name="password"
          label={t('password')}
          validators={['required']}
          required
        />
        <Field
          component={Checkbox}
          valuePropName="checked"
          name="rememberMe"
          componentProps={{
            checkboxItems: [{ value: true, label: t('remember') }],
            isSingle: true,
          }}
        />
      </Form>
    </Wrapper>
  );
};

export default Login;
