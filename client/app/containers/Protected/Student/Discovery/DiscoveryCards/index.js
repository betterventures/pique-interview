import React from 'react'
import DiscoveryCard from './Card'
import css from './style.css'

export const DiscoveryCards = ({ items }) => {
  return (
    <div className={css.root}>
      <div className={css.items}>
        {items.map((x, i) => <DiscoveryCard key={i} {...x} />)}
      </div>
    </div>
  )
}

export default DiscoveryCards


