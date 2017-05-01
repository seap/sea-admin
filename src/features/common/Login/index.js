import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import {
  Button,
  Card,
  Checkbox,
  Form,
  Icon,
  Input,
  Row,
} from 'antd'

import styles from './main.scss'

class Login extends Component {
  componentDidMount () {
  }

  handleSubmit = () => {
  }

  renderLoginForm() {
    const { getFieldDecorator } = this.props.form

    return (
      <Card title="系统登录" bodyStyle={{ padding: '24px 24px 0 24px'}}>
        <Form onSubmit={this.handleSubmit} >
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <a className={styles.loginForget}>忘记密码</a>
            <Button type="primary" htmlType="submit" className={styles.loginButton}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
  render() {
    return (
      <div className={styles.loginCard}>
        {this.renderLoginForm()}
      </div>
    )
  }
}

Login = Form.create()(Login)

Login.propTypes = {
}

Login.defaultProps = {
}

// const mapStateToProps = state => state
// const mapDispatchToProps = dispatch => ({
//   commonActions: bindActionCreators(commonActions, dispatch)
// })
export default Login
