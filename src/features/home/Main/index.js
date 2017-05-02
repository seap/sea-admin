import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as actions from '../redux/actions'
import styles from './main.scss'

import { Button, Menu, Icon, Row, Col } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Main extends Component {
  state = {
    current: 'user ',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    })
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <div className={styles.logo}>
          ADMIN
        </div>
        <Menu
          className={styles.menu}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="user">
            <Icon type="user" />员工管理
          </Menu.Item>
          <Menu.Item key="task">
            <Icon type="appstore" />流程管理
          </Menu.Item>
          <Menu.Item key="setting">
            <Icon type="setting" />系统设置
          </Menu.Item>
        </Menu>
        <div className={styles.status}>
          <Button icon="logout" size="small">小明</Button>
        </div>
      </div>
    )
  }

  renderSection() {
    const { children } = this.props
    return (
      <div className={styles.content}>
        {children}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderSection()}
      </div>
    )
  }
}

export default Main
//
// const mapStateToProps = state => ({ common:state.common, home: state.home })
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({ ...actions }, dispatch)
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(Hello)
