import styled from 'styled-components';
import Group, { CheckboxGroupProps } from 'antd/es/checkbox/Group';
import CheckboxAnt, {
  CheckboxProps as CheckboxAntProps,
} from 'antd/es/checkbox/Checkbox';
import 'antd/es/checkbox/style/index.less';
import omit from 'common/utils/omit';
const Wrapper = styled.div``;
export type CheckboxItems = {
  value: string | number | any;
  label: string | number | any;
};
export type CheckboxProps = {
  checkboxItems: CheckboxItems[];
  isSingle?: boolean;
} & CheckboxGroupProps &
  CheckboxAntProps;

const Checkbox = (props: CheckboxProps) => {
  const { checkboxItems, isSingle = false } = props;

  return (
    <Wrapper>
      {isSingle && (
        <CheckboxAnt {...omit(props, ['checkboxItems', 'isSingle'])}>
          {checkboxItems[0].label}
        </CheckboxAnt>
      )}
      {!isSingle && (
        <Group {...omit(props, ['checkboxItems', 'isSingle'])}>
          {checkboxItems.map(item => (
            <div className="checkbox-item">
              <CheckboxAnt value={item.value}>{item.label}</CheckboxAnt>
            </div>
          ))}
        </Group>
      )}
    </Wrapper>
  );
};

export default Checkbox;
