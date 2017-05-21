import Immutable from 'seamless-immutable'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Badge, Card, Input, Table, Form, Icon, Popconfirm } from 'antd'
import * as actions from '../redux/actions'
import EditorModal from './EditorModal'
import SearchBar from './SearchBar'

class Staff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '0' //默认显示有效数据
    }
  }

  componentDidMount() {
    const { fetchStaff, fetchOrganization, fetchDepartment, fetchPosition, fetchRole } = this.props
    fetchOrganization()
    fetchDepartment()
    fetchPosition()
    fetchRole()
    fetchStaff()
  }

  // 创建或编辑
  handleEdit = record => {
    const { openStaffEditor } = this.props
    this.Staff = record || {}
    openStaffEditor()
  }

  // 修改状态
  handleStatusUpdate = (record, status) => {
    const { updateStaffStatus } = this.props
    updateStaffStatus(record.id, status)
  }

  // 删除数据
  handleDelete = record => {
    console.log(record)
    const { deleteStaff } = this.props
    deleteStaff(record.id)
  }

  // 提交数据(创建或编辑)
  handleUpdate = record => {
    const { createStaff, updateStaff } = this.props
    if (record.id) {
      updateStaff(record)
    } else {
      createStaff(record)
    }
  }

  // 搜索过滤
  handleSearch = option => {
    this.setState({
      status: option.status
    })
  }

  renderModal() {
    const { closeStaffEditor } = this.props
    const { isEditing = false, isDetailFetching } = this.props.home.staff
    const { list: organizations } = this.props.home.organization
    const { list: departments } = this.props.home.department
    const { list: positions } = this.props.home.position
    const { list: roles } = this.props.home.role
    return (
      <EditorModal
        data={this.Staff}
        organizations={organizations}
        departments={departments}
        positions={positions}
        roles={roles}
        loading={isDetailFetching}
        visible={isEditing}
        onSubmit={this.handleUpdate}
        onCancel={closeStaffEditor}
      />
    )
  }

  renderTable() {
    const columns = [
      {
        title: '职务名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
      }, 
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => (
          text == '0' 
          ? <span><Badge status="success" />有效</span>
          : <span><Badge status="error" />失效</span>
        )
      }
    ]
    const operationColumn = {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => this.handleEdit(record)} >
            <Icon type="edit"/>编辑
          </a>
          <span className="ant-divider" />
          <Popconfirm
            title="确认删除？"
            onConfirm={() => this.handleDelete(record)}
            okText="确认"
            cancelText="取消"
          >
            <a onClick={e => e.stopPropagation()}><Icon type="delete"/>删除</a>
          </Popconfirm>
          <span className="ant-divider" />
          { record.status == '0' 
            ?
            <Popconfirm
              title="确认注销？"
              onConfirm={() => this.handleStatusUpdate(record, '1')}
              okText="确认"
              cancelText="取消"
            >
              <a onClick={e => e.stopPropagation()}><Icon type="close"/>注销</a>
            </Popconfirm> 
            :
            <Popconfirm
              title="确认激活？"
              onConfirm={() => this.handleStatusUpdate(record, '0')}
              okText="确认"
              cancelText="取消"
            >
              <a onClick={e => e.stopPropagation()}><Icon type="check"/>激活</a>
            </Popconfirm>
          }
        </span>
      )
    }

    const dataSource = Immutable.asMutable(this.props.home.staff.list, { deep: true })
    const { status } = this.state

    return (
      <Table
        size="middle"
        bordered={true}
        loading={this.props.home.staff.isListFetching}
        columns={ [...columns, operationColumn] }
        dataSource={dataSource.filter(data => status === '' || data.status === status )}
        rowKey={record => record.id}
      />
    )
  }

  render() {
    return (
      <Card 
        title="人员设置"
        extra={<Button type="primary" icon="user-add" onClick={() => this.handleEdit()}>创建</Button>}
      >
        <SearchBar onSearch={this.handleSearch} />
        {this.renderTable()}
        {this.renderModal()}
      </Card>
    )
  }
}

const mapStateToProps = state => ({ home: state.home })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Staff)
