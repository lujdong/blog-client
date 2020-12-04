import React from 'react';
import scss from './index.module.scss';

import { Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const setting = useSelector(state => state.setting);

  // 修改值
  const onChange = React.useCallback((key, event) => {
    const value = event.target.checked;
    dispatch({
      type: 'setting/setValue',
      setting: { [key]: value },
    });
  }, []);

  return { setting, onChange };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.body}>
      <Checkbox
        checked={state.setting.hideDock}
        onChange={state.onChange.bind(null, 'hideDock')}>
        自动隐藏和显示程序坞
      </Checkbox>
    </div>
  );
};
