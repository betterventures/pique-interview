import React from 'react'
import Button from 'components/Button'
import css from './style.css'

export const FAQButtons = props => {
  return (
    <ul className={css.root}>
      {buttons.map((x, i) =>
        <li key={i} className={css.li}>
          <Button className={css.btn}>{x.text}</Button>
        </li>
      )}
    </ul>
  )
}

const buttons = [
  { text: 'Students' },
  { text: 'Scholarship Providers' },
  { text: 'Educators' },
  { text: 'Parents' },
]

export default FAQButtons