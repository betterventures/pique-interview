import React from 'react'
import FAQHeader from './FAQHeader'
import FAQCards from './FAQCards'
import FAQButtons from './FAQButtons'
import css from './style.css'

export const FAQ = props => {
  return (
    <div className={css.root}>
      <FAQHeader />
      <FAQCards />
    </div>
  )
}

export default FAQ