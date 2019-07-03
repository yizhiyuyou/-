import React, { useEffect, useCallback, useRef } from 'react'

import { Form, Input, Button, TreeSelect, Radio } from 'antd'

import classnames from 'classnames'

import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

import { useFetch } from '@/utils/use'

import { upload, getDepteUserTree } from '../service'

import styles from './NoticeForm.module.less'

const media = {
  accepts: {
    image: 'image/*',
    video: false,
    audio: false,
  },
  externals: {
    image: false,
    video: false,
    audio: false,
    embed: false,
  },
  async uploadFn(param) {
    if (!param.file) {
      return false
    }

    const {
      data: [url],
    } = await upload('/rest/notice/noticeinfo/picture', { file: param.file })

    param.success({ url })
  },
}

const tProps = {
  size: 'large',
  allowClear: true,
  treeCheckable: true,
  autoClearSearchValue: true,
  treeDefaultExpandAll: true,
  placeholder: '请输入发布范围',
  dropdownStyle: { maxHeight: 400, ovreflowY: 'scroll' },
}

export function NoticeForm({ form, value, isLoading, className, onSubmit }) {
  const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = form

  const dataRef = useRef({
    noticeState: null,
    noticeDeptname: null,
  })

  // 格式化 noticeContent
  useEffect(() => {
    const { noticeType, noticeDept, noticeContent, ...rest } = value

    const fieldsValue = {
      ...rest,
      noticeType,
      noticeContent: BraftEditor.createEditorState(noticeContent),
    }

    if (noticeType === 1) {
      Object.assign(fieldsValue, { noticeDept })
    }

    setFieldsValue(fieldsValue)
  }, [value])

  const handleChange = useCallback((value, label) => {
    dataRef.current = { ...dataRef.current, noticeDeptname: label }
  }, [])

  const handleSubmit = useCallback((e, noticeState) => {
    e.preventDefault()

    validateFields((error, values) => {
      if (!error) {
        const { noticeContent, ...rest } = values
        const submitData = {
          ...rest,
          noticeContent: noticeContent.toHTML(),
        }

        const { noticeDeptname } = dataRef.current

        dataRef.current = { ...dataRef.current, noticeState }

        onSubmit(submitData, { noticeState, noticeDeptname })
      }
    })
  })

  const { setParams, data } = useFetch(getDepteUserTree, null, [])

  useEffect(() => {
    setParams()
  }, [])

  const { noticeState } = dataRef.current

  // 处理动态表单问题（详见 antd 动态增加表单项）
  getFieldDecorator('noticeDept', { initialValue: [] })

  return (
    <Form className={classnames(className, styles['form-container'])}>
      <Form.Item label="标题">
        {getFieldDecorator('noticeTitle', {
          rules: [
            {
              required: true,
              message: '请输入标题',
            },
          ],
        })(<Input size="large" placeholder="请输入标题" />)}
      </Form.Item>
      <Form.Item label="发布单位">
        {getFieldDecorator('noticeSource', {
          rules: [
            {
              required: true,
              message: '请输入发布单位',
            },
          ],
        })(<Input size="large" placeholder="请输入发布单位" />)}
      </Form.Item>
      <Form.Item label="发布范围">
        {getFieldDecorator('noticeType', {
          rules: [
            {
              required: true,
              message: '请输入发布范围',
            },
          ],
        })(
          <Radio.Group>
            <Radio value={0}>全部</Radio>
            <Radio value={1}>用户</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      {getFieldValue('noticeType') === 1 && (
        <Form.Item>
          {getFieldDecorator('noticeDept', {
            preserve: true,
            rules: [
              {
                required: true,
                message: '请输入发布范围',
              },
            ],
          })(<TreeSelect {...tProps} onChange={handleChange} treeData={data} />)}
        </Form.Item>
      )}
      <Form.Item label="文章正文">
        {getFieldDecorator('noticeContent', {
          validateTrigger: 'onBlur',
          rules: [
            {
              required: true,
              validator: (_, value, callback) => {
                if (value.isEmpty()) {
                  callback('请输入正文内容')
                } else {
                  callback()
                }
              },
            },
          ],
        })(
          <BraftEditor
            extendControls={['media']}
            excludeControls={['code']}
            media={media}
            placeholder="请输入正文内容"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          type="primary"
          loading={noticeState === '1' && isLoading}
          onClick={e => handleSubmit(e, '1')}
        >
          发布
        </Button>
        <Button
          className={styles['m-l-40']}
          size="large"
          type="primary"
          ghost
          loading={noticeState === '0' && isLoading}
          onClick={e => handleSubmit(e, '0')}
        >
          保存为草稿
        </Button>
      </Form.Item>
    </Form>
  )
}

const WrappedNoticeForm = Form.create()(NoticeForm)

export default WrappedNoticeForm
