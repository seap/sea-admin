import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Message from 'components/PopupMessage'
import * as actions from './redux/actions'

// import '../../styles/reset.css'
import '../../styles/main.css'

// Here you define the overall layout
// and the container of the react router
class App extends Component {

  // 全局Message配置
  renderMessage() {
    const { resetMessage } = this.props
    return (
      <Message
        category={this.props.common.category}
        content={this.props.common.message}
        reset={resetMessage} 
      />
    )
  }

  render() {
    const { children } = this.props
    return (
      <div className="wrapper">
        {children}
        {this.renderMessage()}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

App.defaultProps = {
  children: 'No content'
}

const mapStateToProps = state => ({ common: state.common })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(App)