import Immutable from 'seamless-immutable'
import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Card, Input, Table, Icon, Popconfirm } from 'antd'
import * as actions from '../redux/actions'
import EditorModal from './EditorModal'

class Department extends Component {
  componentDidMount() {
    const { fetchDepartment, fetchOrganization } = this.props
    fetchOrganization()
    fetchDepartment()
  }

  // 创建或编辑
  handleEdit = record => {
    const { openDepartmentEditor } = this.props
    this.department = record || {}
    openDepartmentEditor()
  }

  handleDelete = record => {
    console.log(record)
    const { deleteDepartment } = this.props
    deleteDepartment(record.id)
  }

  handleUpdate = record => {
    const { createDepartment, updateDepartment } = this.props
    if (record.id) {
      updateDepartment(record)
    } else {
      createDepartment(record)
    }
  }

  renderModal() {
    const { closeDepartmentEditor } = this.props
    const { isEditing = false, isDetailFetching } = this.props.home.department
    const { list: organizations} = this.props.home.organization
    return (
      <EditorModal
        data={this.department}
        organizations={organizations}
        loading={isDetailFetching}
        visible={isEditing}
        onSubmit={this.handleUpdate}
        onCancel={closeDepartmentEditor}
      />
    )
  }

  renderTable() {
    const { list: organizations } = this.props.home.organization
    const columns = [
      {
        title: '部门编号',
        dataIndex: 'code',
        key: 'code'
      },
      {
        title: '部门名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '所属机构',
        dataIndex: 'organization',
        key: 'organization',
        render: text => {
          if (text) {
            const org = _.find(organizations, ['_id', text])
            return org ? org['name'] : '数据异常'
          } else {
            return ''
          }
        }
      },  
      {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner'
      }, 
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
      }
    ]
    
    const operationColumn = {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.handleEdit(record)} >
            编辑
          </a>
          <span className="ant-divider" />
          <Popconfirm
            title="确认删除？"
            onConfirm={() => this.handleDelete(record)}
            okText="确认"
            cancelText="取消"
          >
            <a onClick={e => e.stopPropagation()}>删除</a>
          </Popconfirm>
        </span>
      )
    }
    return (
      <Table
        size="middle"
        bordered={true}
        loading={this.props.home.department.isListFetching}
        columns={ [...columns, operationColumn] }
        dataSource={Immutable.asMutable(this.props.home.department.list, {deep: true})}
        rowKey={record => record.id}
      />
    )
  }

  render() {
    return (
      <Card 
        title="部门管理"
        extra={<Button type="primary" icon="plus" onClick={() => this.handleEdit()}>创建</Button>}
      >
        {this.renderTable()}
        {this.renderModal()}
      </Card>
    )
  }
}

const mapStateToProps = state => ({ home: state.home })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Department)
