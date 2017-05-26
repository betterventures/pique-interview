import React from 'react'
import img from './305-check.png'
import css from './style.css'

export const Card = ({ price, annotation, list, btnText, onClick }) => {
  return (
    <div className={css.root}>
      <div className={css.content}>
        <div className={css.title}>Pique</div>
        <div className={css.annual}>{price}</div>
        <div className={css.anno}>{annotation}</div>
        <div className={css.divider}></div>

        <div className={css.ul}>
          {list.map((x, i) =>
            <div key={i} className={css.item}>
              <img className={css.img} src={img} />
              <div className={css.text}>{x}</div>
            </div>
          )}
        </div>

      </div>
      <div className={css.btn} onClick={onClick}>{btnText}</div>
    </div>
  )
}

export default Card
