import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Table, Icon } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '地址',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}]


export default class Staff extends Component {
  render() {
    return (
      <Card>
        <Table
          bordered={true}
          columns={columns}
          dataSource={data}
        />
      </Card>
    )
  }
}
