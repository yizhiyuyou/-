import React, { useContext, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { useObserver } from 'mobx-react-lite'

import { Form, Icon, Input, Button, Checkbox } from 'antd'

import { useFetch } from '@/utils/use'

import { StoreContext } from '@/stores'

import { USER_STATUS } from '@/const'

import styles from './styles.module.less'

export const Login = ({ form }) => {
  const store = useContext(StoreContext)

  const { setParams, isLoading } = useFetch(store.rootStore.pageLogin)

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    form.validateFields((err, values) => {
      if (!err) {
        setParams(values)
      }
    })
  }, [])

  const { getFieldDecorator } = form

  return useObserver(() => {
    const { loginStatus, appLogin } = store.rootStore

    if (loginStatus === USER_STATUS.get('已登录').status) {
      return <Redirect to="/home" />
    }

    if (loginStatus === USER_STATUS.get('未登录').status) {
      appLogin()
    }

    return (
      <div className={styles['login-container']}>
        <div className={styles.header}>
          <img src="/static/img/login/logo.png" alt="logo" />
          <span>智慧服务区管理系统</span>
        </div>
        <div className={styles.section}>
          <div className={styles['login-box']}>
            <img src="/static/img/login/bgpic.png" alt="" />
            <h3>欢迎登录</h3>
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  initialValue: 'wangzhen',
                  rules: [{ required: true, message: '请输入账号' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入账号"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  initialValue: '111111',
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住密码</Checkbox>)}
                <Button
                  loading={isLoading}
                  type="primary"
                  htmlType="submit"
                  className={styles['login-form-button']}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className={styles.footer}>
          <p>技术支持：河南东方世纪交通科技股份有限公司</p>
        </div>
      </div>
    )
  })
}

export default Form.create()(Login)
