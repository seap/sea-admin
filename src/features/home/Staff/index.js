import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Table, Icon } from 'antd'
import columns from './columns'

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
