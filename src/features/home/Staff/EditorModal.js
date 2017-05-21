import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input, Select, Row, Col } from 'antd'
import { genders, yesOrNo } from 'constants/constants'

// 创建或修改表单布局
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
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
    const { visible, loading, data = {}, organizations = [], positions = [], roles = [], onCancel } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form

    return (
      <Modal
        width="650"
        title={data.id ? '编辑人员' : '添加人员'}
        maskClosable={false}
        visible={visible}
        confirmLoading={loading}
        onOk={this.handleFormOk}
        onCancel={onCancel}
      >
        <Form>
          <Row>
            <Col span={12} >
              <Form.Item {...formItemLayout} label="人员姓名" >
                {
                  getFieldDecorator('name', {
                    initialValue: data.name || '',
                    rules: [{ required: true, message: '请输入人员姓名!' }]
                  })(<Input placeholder="人员姓名" disabled={data.deptCode ? true : false} style={{ width: '80%' }} />)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="人员性别" >
                {
                  getFieldDecorator('gender', {
                    initialValue: data.gender || genders[0]['key'],
                    rules: [{ required: true, message: '请输入人员性别!' }]
                  })(<Select style={{ width: '80%' }} >
                      {genders.map((opt, index) => <Select.Option key={opt.key} value={opt.key}>{opt.value}</Select.Option>)}
                    </Select>)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="手机号码" >
                {
                  getFieldDecorator('mobile', {
                    initialValue: data.mobile || '',
                    rules: [{ required: true, pattern: /^1\d{10}$/, message: '请输入正确的手机号!' }]
                  })(<Input placeholder="手机号码" style={{ width: '80%' }} maxLength="11" />)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="办公电话" >
                {
                  getFieldDecorator('officePhone', {
                    initialValue: data.officePhone || '',
                    rules: [{ required: false, pattern: /^\d*$/, message: '请输入正确的办公电话!' }]
                  })(<Input placeholder="办公电话" style={{ width: '80%' }} maxLength="11" />)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="身份证号" >
                {
                  getFieldDecorator('identityNo', {
                    initialValue: data.identityNo || ''
                  })(<Input placeholder="身份证号" style={{ width: '80%' }} />)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="电子邮箱" >
                {
                  getFieldDecorator('email', {
                    initialValue: data.email || ''
                  })(<Input placeholder="邮箱地址" style={{ width: '80%' }} />)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="地址" >
                {
                  getFieldDecorator('address', {
                    initialValue: data.address || ''
                  })(<Input placeholder="家庭地址" style={{ width: '100%' }} />)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="备注" >
                {
                  getFieldDecorator('remark', {
                    initialValue: data.remark || ''
                  })(<Input placeholder="备注内容" style={{ width: '100%' }} />)
                }
              </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item {...formItemLayout} label="归属机构" >
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
              <Form.Item {...formItemLayout} label="所属职务" >
                {
                  getFieldDecorator('position', {
                    initialValue: data.position || ''
                  })(<Select style={{ width: '80%' }}>
                      {positions
                      .filter(ele => ele.status === '0')
                      .map((ele, index) => <Select.Option key={ele._id} value={ele._id}>{ele.name}</Select.Option>)}
                    </Select>)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="所属角色" >
                {
                  getFieldDecorator('role', {
                    initialValue: data.role || ''
                  })(<Select style={{ width: '80%' }}>
                      {roles
                      .filter(ele => ele.status === '0')
                      .map((ele, index) => <Select.Option key={ele._id} value={ele._id}>{ele.name}</Select.Option>)}
                    </Select>)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="系统用户" >
                {
                  getFieldDecorator('systemUser', {
                    initialValue: data.systemUser || '0'
                  })(<Select style={{ width: '80%' }}>
                      {yesOrNo.map((opt, index) => <Select.Option key={opt.key} value={opt.key}>{opt.value}</Select.Option>)}
                    </Select>)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="密码" >
                {
                  getFieldDecorator('password', {
                    initialValue: data.password || '',
                    rules: [{ required: true, message: '请输入正确的密码!' }]
                  })(<Input placeholder="登录密码" type="password" style={{ width: '80%' }} />)
                }
              </Form.Item>
              <Form.Item {...formItemLayout} label="确认密码" >
                {
                  getFieldDecorator('passwordAgain', {
                    initialValue: data.passwordn || '',
                    rules: [{ required: true, message: '请输入正确的密码!' }]
                  })(<Input placeholder="登录密码确认" type="password" style={{ width: '80%' }} />)
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

EditorModal.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  data: PropTypes.object,
  organizations: PropTypes.array,
  departments: PropTypes.array,
  positions: PropTypes.array,
  roles: PropTypes.array,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}

export default Form.create()(EditorModal)