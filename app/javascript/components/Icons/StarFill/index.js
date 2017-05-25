import React from 'react'

const StarFill = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="30 -2 33 33">
    <defs>
      <linearGradient x1="25.8237627%" y1="0%" x2="101.999998%" y2="100.999999%" id="linearGradient-1">
        <stop stopColor="#3023AE" offset="0%"></stop>
        <stop stopColor="#C96DD8" offset="100%"></stop>
      </linearGradient>
      <polygon id="path-2" points="46.5 18.75 39.1526843 22.6127124 40.5558968 14.4313562 34.6117935 8.63728757 42.8263422 7.44364379 46.5 0 50.1736578 7.44364379 58.3882065 8.63728757 52.4441032 14.4313562 53.8473157 22.6127124"></polygon>
      <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-3">
        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
        <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
      </filter>
    </defs>
    <g id="Star" stroke="none" fill="none">
      <use fill="black" fillOpacity="1" filter="url(#filter-3)" href="#path-2"></use>
      <use fill="url(#linearGradient-1)" fillRule="evenodd" href="#path-2"></use>
    </g>
  </svg>
)

export default StarFill
