import React, { forwardRef, useEffect, useContext } from 'react'

import { Form, Input, Select, Row, Col, InputNumber } from 'antd'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import styles from './Form.module.less'

const { Option } = Select

const { TextArea } = Input

const formItemCol = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}

export function RoleManaForm({ form }, ref) {
  const { getFieldDecorator } = form

  const { sparepartType, getDictionaryByType } = useContext(StoreContext).dicStore

  const { isLoading } = useFetch(getDictionaryByType, () => {}, null, 'sparepartType')

  useEffect(() => {
    ref.current = form
  }, [form])

  return (
    <Form className={styles['form-container']} {...formItemCol}>
      <Row>
        <Col span={10} offset={2}>
          <Form.Item label="名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '名称不能为空' }],
            })(<Input allowClear size="large" placeholder="请输入名称" />)}
          </Form.Item>
        </Col>
        <Col span={10} offset={2}>
          <Form.Item label="类型">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '类型不能为空' }],
            })(
              <Select allowClear size="large" placeholder="请选择类型" loading={isLoading}>
                {sparepartType.map(({ text, value }) => (
                  <Option key={value} value={value}>
                    {text}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={10} offset={2}>
          <Form.Item label="品牌">
            {getFieldDecorator('brand', {
              rules: [{ required: true, message: '品牌不能为空' }],
            })(<Input allowClear size="large" placeholder="请输入品牌" />)}
          </Form.Item>
        </Col>
        <Col span={10} offset={2}>
          <Form.Item label="数量">
            {getFieldDecorator('count', {
              rules: [{ required: true, message: '数量不能为空' }],
            })(<InputNumber size="large" placeholder="请输入数量" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={10} offset={2}>
          <Form.Item label="型号">
            {getFieldDecorator('model', {
              rules: [{ required: true, message: '型号不能为空' }],
            })(<Input allowClear size="large" placeholder="请输入型号" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row className={styles.textarea}>
        <Col span={22} offset={2}>
          <Form.Item label="备注">
            {getFieldDecorator('markNote')(
              <TextArea rows={5} size="large" placeholder="请输入备注" />
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

const RoleManaFormForwardRef = forwardRef(RoleManaForm)

export default Form.create({
  mapPropsToFields(props) {
    return {
      ...Object.entries(props.value).reduce((prev, [key, value]) => {
        return {
          ...prev,
          [key]: Form.createFormField({ value }),
        }
      }, {}),
    }
  },
})(RoleManaFormForwardRef)
