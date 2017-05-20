import Immutable from 'seamless-immutable'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Card, Input, Table, Form, Icon, Popconfirm } from 'antd'
import * as actions from '../redux/actions'
import EditorModal from './EditorModal'
import columns from './columns'

class Organization extends Component {
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

  handleUpdate = record => {
    const { createOrganization, updateOrganization } = this.props
    if (record.id) {
      updateOrganization(record)
    } else {
      createOrganization(record)
    }
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
          <span className="ant-divider" />
          { record.status == '0' 
            ?
            <Popconfirm
              title="确认封存？"
              onConfirm={() => this.handleStatusUpdate(record, '1')}
              okText="确认"
              cancelText="取消"
            >
              <a onClick={e => e.stopPropagation()}>封存</a>
            </Popconfirm> 
            :
            <Popconfirm
              title="确认激活？"
              onConfirm={() => this.handleStatusUpdate(record, '0')}
              okText="确认"
              cancelText="取消"
            >
              <a onClick={e => e.stopPropagation()}>激活</a>
            </Popconfirm>
          }
        </span>
      )
    }

    return (
      <Table
        size="middle"
        bordered={true}
        loading={this.props.home.organization.isListFetching}
        columns={ [...columns, operationColumn] }
        dataSource={Immutable.asMutable(this.props.home.organization.list, {deep: true})}
        rowKey={record => record.id}
      />
    )
  }

  render() {
    return (
      <Card 
        title="机构管理"
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
export default connect(mapStateToProps, mapDispatchToProps)(Organization)
