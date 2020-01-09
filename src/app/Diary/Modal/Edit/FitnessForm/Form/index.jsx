import React, {
  useMemo,
} from 'react';
import _ from 'lodash';
import scss from './index.module.scss';
import fitnessProjects from '@config/fitnessProjects';

import {
  Col,
  Row,
  Form,
  Select,
  InputNumber,
} from 'antd';
import { FITNESS_TYPE, FITNESS_PLACE, FITNESS_FEEL } from '@config/consts';

const useStateHook = props => {
  // 类型下拉项
  const typeOptions = useMemo(() => (
    Object.values(FITNESS_TYPE).map(V => (
      <Select.Option value={V.VALUE} key={V.VALUE}>
        {V.DESC}
      </Select.Option>
    ))
  ), []);

  // 训练部位下拉项
  const placeOptions = useMemo(() => (
    Object.values(FITNESS_PLACE).map(V => (
      <Select.Option value={V.VALUE} key={V.VALUE}>
        {V.DESC}
      </Select.Option>
    ))
  ), []);


  // 训练感受下拉项
  const feelOptions = useMemo(() => (
    Object.values(FITNESS_FEEL).map(V => (
      <Select.Option value={V.VALUE} key={V.VALUE}>
        {V.DESC}
      </Select.Option>
    ))
  ), []);

  // 训练项目下拉项
  const projectOptions = useMemo(() => {
    const type = props.form.getFieldValue(`fitness[${props.index}].type`);
    const place = props.form.getFieldValue(`fitness[${props.index}].place`);
    return (
      fitnessProjects.filter(
        v => v.type === type && v.place === place
      ).map(v => (
        <Select.Option value={v.value} key={v.value}>
          {v.desc}
        </Select.Option>
      ))
    );
  }, [props.form, props.index]);

  // 是否显示 place 字段
  const showPlaceField = useMemo(() => {
    const type = props.form.getFieldValue(`fitness[${props.index}].type`);
    return type === FITNESS_TYPE.ANAEROBIC.VALUE;
  }, [props.form, props.index]);

  // place 修改
  const onPlaceChange = () => {
    props.form.setFieldsValue({
      [`fitness[${props.index}].project`]: void 0,
    });
  };

  // type 修改
  const onTypeChange = () => {
    props.form.setFieldsValue({
      [`fitness[${props.index}].project`]: void 0,
      [`fitness[${props.index}].place`]: void 0,
    });
  };

  return {
    typeOptions,
    feelOptions,
    placeOptions,
    onTypeChange,
    onPlaceChange,
    showPlaceField,
    projectOptions,
  };
};

export default props => {
  const state = useStateHook(props);

  return (
    <Row gutter={16} className={scss.row}>
      <Col span={8}>
        <Form.Item label="类型" className={scss['form-item']}>
          {props.form.getFieldDecorator(`fitness[${props.index}].type`, {
            rules: [{
              required: true,
              message: '请选择类型!',
            }],
            initialValue: _.get(
              props,
              `modal.data.fitness[${props.index}].type`
            ),
          })(
            <Select
              placeholder="类型"
              style={{ width: '100%' }}
              onChange={state.onTypeChange}>
              {state.typeOptions}
            </Select>
          )}
        </Form.Item>
      </Col>
      {state.showPlaceField ?
        <Col span={8}>
          <Form.Item label="部位" className={scss['form-item']}>
            {props.form.getFieldDecorator(`fitness[${props.index}].place`, {
              rules: [{
                required: true,
                message: '请选择训练部位!',
              }],
              initialValue: _.get(
                props,
                `modal.data.fitness[${props.index}].place`
              ),
            })(
              <Select
                placeholder="训练部位"
                style={{ width: '100%' }}
                onChange={state.onPlaceChange}>
                {state.placeOptions}
              </Select>
            )}
          </Form.Item>
        </Col> : null
      }
      <Col span={8}>
        <Form.Item label="项目" className={scss['form-item']}>
          {props.form.getFieldDecorator(`fitness[${props.index}].project`, {
            rules: [{
              required: true,
              message: '请选择项目!',
            }],
            initialValue: _.get(
              props,
              `modal.data.fitness[${props.index}].project`
            ),
          })(
            <Select style={{ width: '100%' }} placeholder="锻炼项目">
              {state.projectOptions}
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="时长 (分钟) " className={scss['form-item']}>
          {props.form.getFieldDecorator(`fitness[${props.index}].duration`, {
            initialValue: _.get(
              props,
              `modal.data.fitness[${props.index}].duration`
            ),
          })(
            <InputNumber
              min={0}
              placeholder="时长"
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="感受" className={scss['form-item']}>
          {props.form.getFieldDecorator(`fitness[${props.index}].feel`, {
            initialValue: _.get(
              props,
              `modal.data.fitness[${props.index}].feel`
            ),
          })(
            <Select style={{ width: '100%' }} placeholder="感受">
              {state.feelOptions}
            </Select>
          )}
        </Form.Item>
      </Col>
    </Row>
  );
};
