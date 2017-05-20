import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { message } from 'antd'

export default class PopupMessage extends PureComponent {
  constructor(props) {
    super(props)
    message.config({
      top: 45,
      duration: 2
    })
  }

  render() {
    const { category, content, reset } = this.props
    category && setTimeout(() => {
      message[category](content)
      reset()
    })
    return null
  }
}

PopupMessage.propTypes = {
  category: PropTypes.oneOf(['', 'error', 'success', 'warn', 'info']),
  content: PropTypes.string,
  reset: PropTypes.func.isRequired
}
