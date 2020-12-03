import styled from 'styled-components';
import { ReactNode, useCallback, useState } from 'react';
import FormAnt from 'antd/es/form';
import 'antd/es/form/style/index.less';
import Button from 'components/ui/button';
import { useTranslation } from 'react-i18next';
const Wrapper = styled.div``;
interface Props {
  children: ReactNode;
  labelSubmit?: string;
  initialValues?: object;
  rules?: object;
  onSubmit: (values: any) => Promise<any>;
}

const Form = (props: Props) => {
  const { t } = useTranslation();
  const { children, onSubmit, initialValues, labelSubmit = t('save') } = props;

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    values => {
      setSubmitting(true);
      onSubmit(values).then(() => setSubmitting(false));
    },
    [onSubmit],
  );

  return (
    <Wrapper>
      <FormAnt
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        {children}
        <div className="button-submit-form">
          <Button htmlType="submit" loading={submitting}>
            {labelSubmit}
          </Button>
        </div>
      </FormAnt>
    </Wrapper>
  );
};

export default Form;
