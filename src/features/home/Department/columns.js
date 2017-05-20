import React, { Component } from 'react'
import { Icon } from 'antd'

export default [
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
    key: 'organization'
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
  }]