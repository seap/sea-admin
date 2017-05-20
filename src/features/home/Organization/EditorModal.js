import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input, Select } from 'antd'
import { organizationTypeList } from './columns'

// 创建或修改表单布局
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
  style: { maxWidth: '500px' }
}

class EditorModal extends Component {
  componentWillReceiveProps(nextProps) {
    const { visible } = this.props
    const { resetFields } = this.props.form;
    !visible && resetFields() //重置一组输入控件的值与状态
  }

  handleFormOk = () => {
    const { onSubmit, data } = this.props
    const { validateFields } = this.props.form
    validateFields((errors, values) => {
      if (errors) { // 验证失败
        console.log('Errors in form')
        return;
      }
      onSubmit({...data, ...values})
    })
  }

  render() {
    const { visible, loading, data = {}, onCancel } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form

    return (
      <Modal
        title={data.id ? '编辑机构' : '创建机构'}
        maskClosable={false}
        visible={visible}
        confirmLoading={loading}
        onOk={this.handleFormOk}
        onCancel={onCancel}
      >
        <Form>
          <Form.Item {...formItemLayout} label="机构名称" >
            {
              getFieldDecorator('name', {
                initialValue: data.name || '',
                rules: [{ required: true, message: '请输入机构名称!' }]
              })(<Input placeholder="机构名称" disabled={data.deptCode ? true : false} style={{ width: '80%' }} />)
            }
          </Form.Item>
          <Form.Item {...formItemLayout} label="机构类型" >
            {
              getFieldDecorator('type', {
                initialValue: data.type || '0'
              })(<Select style={{ width: '80%' }} >
                  {organizationTypeList.map((opt, index) => <Select.Option key={opt.key} value={opt.key}>{opt.value}</Select.Option>)}
                </Select>)
            }
          </Form.Item>
          <Form.Item {...formItemLayout} label="负责人" >
            {
              getFieldDecorator('owner', {
                initialValue: data.owner || '',
                rules: [{ required: true, message: '请输入负责人姓名!' }]
              })(<Input placeholder="如：张小白" style={{ width: '80%' }} />)
            }
          </Form.Item>
          <Form.Item {...formItemLayout} label="电话" >
            {
              getFieldDecorator('telephone', {
                initialValue: data.telephone || '',
                rules: [{ required: true, pattern: /^1\d{10}$/, message: '请输入正确的手机号!' }]
              })(<Input placeholder="电话号码" style={{ width: '80%' }} maxLength="11" />)
            }
          </Form.Item>
          <Form.Item {...formItemLayout} label="备注" >
            {
              getFieldDecorator('remark', {
                initialValue: data.remark || ''
              })(<Input placeholder="备注内容" style={{ width: '80%' }} />)
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

EditorModal.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(EditorModal)