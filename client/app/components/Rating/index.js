import React from 'react'
import StarFill from 'components/Icons/StarFill'
import StarNoFill from 'components/Icons/StarNoFill'

const Rating = ({ value, className, style }) => {
  const stars = Array.from({length: 5}, (_, i) => i + 1 <= value)
  return (
    <div className={className}>
      {stars.map((x, i) => !!x
        ? <StarFill key={i} style={style} />
        : <StarNoFill key={i} style={style} />
      )}
    </div>
  )
}

export default Rating