import React, { Component } from 'react'
import css from './style.css'

export const Select = ({ value, options, onChange, className }) => {
  return (
    <select
      className={className ? className : css.select}
      value={value}
      onChange={onChange}>
      {options.map((x, i) =>
        <option key={i} value={x.value}>{x.text}</option>
      )}
    </select>
  )
}

export default Select
