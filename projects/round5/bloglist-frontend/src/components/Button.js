import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>

export default Button

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}