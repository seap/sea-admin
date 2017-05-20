import React, { Component } from 'react'
import { Badge } from 'antd'
import _ from 'lodash'

// 机构类型
export const organizationTypeList = [
  { key: '0', value: '企业法人' },
  { key: '1', value: '分支机构' },
  { key: '2', value: '其他' }
]

export default [
  {
    title: '机构名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '机构类型',
    dataIndex: 'type',
    key: 'type',
    render: text => {
      const org = _.find(organizationTypeList, ['key', text])
      return org ? org['value'] : ''
    }
  },
  {
  title: '负责人',
  dataIndex: 'owner',
  key: 'owner'
  }, 
  {
    title: '电话',
    dataIndex: 'telephone',
    key: 'telephone'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: text => (
      text == '0' 
      ? <span><Badge status="success" />有效</span>
      : <span><Badge status="error" />封存</span>
    )
  }
]