import styled from 'styled-components';
import FormItem, { FormItemProps } from 'antd/es/form/FormItem';
import omit from 'common/utils/omit';
import { InputProps } from 'antd/lib/input';
import { CheckboxProps } from 'components/ui/checkbox';
import { useCallback } from 'react';
import { mapRuleToValidator } from 'common/validator';
import { Rule } from 'rc-field-form/lib/interface';
const Wrapper = styled.div`
  .inflow-form-item-label {
    padding-bottom: 0 !important;
    .inflow-form-item-required {
      ::before {
        display: none !important;
      }

      ::after {
        display: inline-block;
        margin-left: 4px;
        color: #ff4d4f;
        font-family: SimSun, sans-serif;
        line-height: 1;
        content: '*';
      }
    }
  }
`;

type ComponentProps = InputProps | (CheckboxProps & { placeholder? });
interface Props {
  componentProps?: ComponentProps;
  component: any;
  name: string;
  rules?: Rule[];
  validators?: any[];
}

const Field = (props: Props & FormItemProps) => {
  const {
    component,
    componentProps = {},
    label,
    validators = [],
    rules,
  } = props;
  const { placeholder } = componentProps;
  const Component = component;

  const mapRulesToValidators = useCallback(
    () => (label ? mapRuleToValidator(label) : []),
    [label],
  );

  const rulesValidators = useCallback<any>(
    () =>
      validators.map(validator => {
        if (typeof validator === 'function') {
          return validator;
        }

        return mapRulesToValidators()[validator];
      }),
    [],
  );

  return (
    <Wrapper>
      <FormItem
        {...omit(props, ['componentProps', 'component'])}
        rules={rules || rulesValidators()}
      >
        <Component {...componentProps} placeholder={placeholder || label} />
      </FormItem>
    </Wrapper>
  );
};

export default Field;
