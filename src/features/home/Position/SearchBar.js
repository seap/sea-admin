import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Select } from 'antd'

class SearchBar extends Component {
  handleSearch = () => {
    const { onSearch } = this.props
    const { getFieldsValue } = this.props.form
    const opt = getFieldsValue()
    onSearch(opt)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={{ marginBottom: '20px' }} layout="inline" >
        <Form.Item label="状态">
          {getFieldDecorator('status', {
            initialValue: '0'
          })(
            <Select style={{ width: 140 }}>
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="0">有效</Select.Option >
              <Select.Option value="1">失效</Select.Option >
            </Select>
          )}
        </Form.Item>        
        <Form.Item>
          <Button icon="search" type="primary" onClick={this.handleSearch}>
            查询
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
}

SearchBar.defaultProps = {
  onSearch: () => {}
}

export default Form.create()(SearchBar)