import React from 'react'

const StarNoFill = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="132 -2 33 33">
    <defs>
      <polygon id="path-6" points="148.5 18.75 141.152684 22.6127124 142.555897 14.4313562 136.611794 8.63728757 144.826342 7.44364379 148.5 0 152.173658 7.44364379 160.388206 8.63728757 154.444103 14.4313562 155.847316 22.6127124"></polygon>
      <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-7">
        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
        <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
      </filter>
    </defs>
    <g id="Star">
      <use fill="#000000" fillOpacity="1" filter="url(#filter-7)" href="#path-6"></use>
      <use fill="#FFF1F1" fillRule="evenodd" href="#path-6"></use>
    </g>
  </svg>
)

export default StarNoFill
