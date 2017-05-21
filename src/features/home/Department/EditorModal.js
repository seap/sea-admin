import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input, Select } from 'antd'

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
    const { onSubmit, data = {}, insertChild } = this.props
    const { validateFields } = this.props.form
    validateFields((errors, values) => {
      if (errors) { // 验证失败
        console.log('Errors in form')
        return;
      }
      if (insertChild) {
        onSubmit({ parentId: data._id, ...values })
      } else {
        onSubmit({ parentId: '', ...data, ...values})
      }
    })
  }

  render() {
    const { visible, loading, data = {}, insertChild, organizations = [], onCancel } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form

    return (
      <Modal
        title={insertChild ? '插入子部门' : (data.id ? '编辑部门' : '创建部门')}
        maskClosable={false}
        visible={visible}
        confirmLoading={loading}
        onOk={this.handleFormOk}
        onCancel={onCancel}
      >
        <Form>
          {!insertChild && data._id &&
            <Form.Item {...formItemLayout} label="部门编号" >
              {
                getFieldDecorator('_id', {
                  initialValue: data._id || ''
                })(<Input disabled={true} style={{ width: '80%' }} />)
              }
            </Form.Item>
          }
          {insertChild &&
            <Form.Item {...formItemLayout} label="上级部门" >
              {
                getFieldDecorator('parentName', {
                  initialValue: data.name
                })(<Input disabled={true} style={{ width: '80%' }} />)
              }
            </Form.Item>
          }
          <Form.Item {...formItemLayout} label="部门名称" >
            {
              getFieldDecorator('name', {
                initialValue: insertChild ? '' : (data.name || ''),
                rules: [{ required: true, message: '请输入部门名称!' }]
              })(<Input placeholder="如：业务部" style={{ width: '80%' }} />)
            }
          </Form.Item>
          <Form.Item {...formItemLayout} label="所属机构" >
            {
              getFieldDecorator('organization', {
                initialValue: data.organization || ''
              })(<Select style={{ width: '80%' }}>
                  {organizations
                  .filter(ele => ele.status === '0')
                  .map((ele, index) => <Select.Option key={ele._id} value={ele._id}>{ele.name}</Select.Option>)}
                </Select>)
            }
          </Form.Item>
          <Form.Item {...formItemLayout} label="负责人" >
            {
              getFieldDecorator('owner', {
                initialValue: insertChild ? '' : (data.owner || ''),
                rules: [{ required: true, message: '请输入负责人姓名!' }]
              })(<Input placeholder="负责人姓名" style={{ width: '80%' }} />)
            }
          </Form.Item>
          <Form.Item {...formItemLayout} label="备注" >
            {
              getFieldDecorator('remark', {
                initialValue: insertChild ? '' : (data.remark || '')
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