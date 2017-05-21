import Immutable from 'seamless-immutable'
import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Badge, Button, Card, Input, Table, Icon, Popconfirm } from 'antd'
import * as actions from '../redux/actions'
import EditorModal from './EditorModal'
import SearchBar from './SearchBar'

// 递归出部门层级
function generateDepartments(rawList, departments, level) {
  for (let dept of departments) {
    dept.children = rawList.filter(ele => ele.parentId == dept._id)
    if (level < 5) {
      generateDepartments(rawList, dept.children, level + 1)
    }
  }
}

// 状态过滤
function filterDepartments(departments, status) {
  departments = departments.filter(data => data.status == status)
  for (let dept of departments) {
    if (dept.children && dept.children.length > 0) {
       dept.children = filterDepartments(dept.children, status)
    }
  }
  return departments
}

class Department extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '0' //默认显示有效数据
    }
    this.departments = []
  }
  
  componentDidMount() {
    const { fetchDepartment, fetchOrganization } = this.props
    fetchOrganization()
    fetchDepartment()
  }

  componentWillReceiveProps(nextProps) {
    const rawList = Immutable.asMutable(nextProps.home.department.list, { deep: true })
    this.departments = rawList.filter(ele => ele.parentId == '')
    generateDepartments(rawList, this.departments, 0)
  }

  // 创建或编辑
  handleEdit = (record, insertChild) => {
    const { openDepartmentEditor } = this.props
    this.department = record || {}
    this.insertChild = insertChild
    openDepartmentEditor()
  }

  // 修改状态
  handleStatusUpdate = (record, status) => {
    const { updateDepartmentStatus } = this.props
    updateDepartmentStatus(record.id, status)
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

  // 搜索过滤
  handleSearch = option => {
    this.setState({
      status: option.status
    })
  }

  renderModal() {
    const { closeDepartmentEditor } = this.props
    const { isEditing = false, isDetailFetching } = this.props.home.department
    const { list: organizations} = this.props.home.organization
    return (
      <EditorModal
        data={this.department}
        insertChild={this.insertChild}
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
          <a onClick={() => this.handleEdit(record, true)} >
            <Icon type="select"/>添加子部门
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
    const { status } = this.state
    // 动态过滤状态
    let dataSource = this.departments
    if (status !== '') {
      dataSource = filterDepartments(_.cloneDeep(this.departments), status)
    }
    return (
      <Table
        size="middle"
        bordered={true}
        defaultExpandAllRows={true}
        loading={this.props.home.department.isListFetching}
        columns={ [...columns, operationColumn] }
        dataSource={dataSource}
        rowKey={record => record.id}
        footer={() => <span><Icon type="question-circle-o" /> 部门层级请配置在七层以内</span>}
      />
    )
  }

  render() {
    return (
      <Card 
        title="部门设置"
        extra={<Button type="primary" icon="plus" onClick={() => this.handleEdit()}>创建</Button>}
      >
        <SearchBar onSearch={this.handleSearch} />
        {this.departments.length > 0 && this.renderTable()}
        {this.renderModal()}
      </Card>
    )
  }
}

const mapStateToProps = state => ({ home: state.home })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Department)
