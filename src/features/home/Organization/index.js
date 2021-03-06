import Immutable from 'seamless-immutable'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Card, Input, Table, Form, Icon, Popconfirm } from 'antd'
import * as actions from '../redux/actions'
import EditorModal from './EditorModal'
import SearchBar from './SearchBar'
import columns from './columns'

class Organization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '0' //默认显示有效数据
    }
  }

  componentDidMount() {
    const { fetchOrganization } = this.props
    fetchOrganization()
  }

  // 创建或编辑
  handleEdit = record => {
    const { openOrganizationEditor } = this.props
    this.organization = record || {}
    openOrganizationEditor()
  }

  // 修改状态
  handleStatusUpdate = (record, status) => {
    const { updateOrganizationStatus } = this.props
    updateOrganizationStatus(record.id, status)
  }

  // 删除数据
  handleDelete = record => {
    console.log(record)
    const { deleteOrganization } = this.props
    deleteOrganization(record.id)
  }

  // 提交数据(创建或编辑)
  handleUpdate = record => {
    const { createOrganization, updateOrganization } = this.props
    if (record.id) {
      updateOrganization(record)
    } else {
      createOrganization(record)
    }
  }

  // 搜索过滤
  handleSearch = option => {
    this.setState({
      status: option.status
    })
  }

  renderModal() {
    const { closeOrganizationEditor } = this.props
    const { isEditing = false, isDetailFetching } = this.props.home.organization
    return (
      <EditorModal
        data={this.organization}
        loading={isDetailFetching}
        visible={isEditing}
        onSubmit={this.handleUpdate}
        onCancel={closeOrganizationEditor}
      />
    )
  }

  renderTable() {
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

    const dataSource = Immutable.asMutable(this.props.home.organization.list, { deep: true })
    const { status } = this.state

    return (
      <Table
        size="middle"
        bordered={true}
        loading={this.props.home.organization.isListFetching}
        columns={ [...columns, operationColumn] }
        dataSource={dataSource.filter(data => status === '' || data.status === status )}
        rowKey={record => record.id}
      />
    )
  }

  render() {
    return (
      <Card 
        title="机构设置"
        extra={<Button type="primary" icon="plus" onClick={() => this.handleEdit()}>创建</Button>}
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
export default connect(mapStateToProps, mapDispatchToProps)(Organization)
