import React, { Component } from 'react'
import { Icon } from 'antd'

export default [
  {
    title: '工号',
    dataIndex: 'staffCode',
    key: 'staffCode',
    render: text => <a href="#">{text}</a>,
  },
  {
    title: '姓名',
    dataIndex: 'staffName',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  }, 
  {
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
  )
}]