import React from 'react'
import css from './style.css'

export const Waves = props => {
  return (
    <div className={`${css.root} ${props.animate ? css.rise : ''}`}>
      <WaveTop {...props} />
      <WaveBottom {...props} />
    </div>
  )
}

const WaveTop = props => {
  return (
    <div className={css.wrap}>
      <svg className={css.svg} viewBox="0 0 1200 203" preserveAspectRatio="none">
        <defs>
          <linearGradient x1="50%" y1="98.3328202%" x2="50%" y2="45.1390748%" id="linearGradient-1">
            <stop stopColor="#0BEE84" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="#0BBA7C" stopOpacity="0.0972316576" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Pique---Educator" transform="translate(0.000000, -1102.000000)" fill="url(#linearGradient-1)">
            <g id="The-Harsh-Facts" transform="translate(0.000000, 762.000000)">
              <path id="wave-2" className={css.two} d="M0,368.499999 C0,368.499999 33,358.000001 126,395.000001 C219,432.000001 359.5,395 359.5,395 C359.5,395 480.5,343.999999 615,389.5 C749.5,435.000001 854.5,417 905.5,383 C956.5,349 1002,328 1083,349 C1164,370 1223,479.000004 1244.5,376.5 C1266,273.999996 1239.5,531 1239.5,531 L1108,565.5 L956.5,573.5 L0,549.500001 L0,368.499999 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

const WaveBottom = props => {
  return (
    <div className={css.wrap}>
      <svg className={css.svg} preserveAspectRatio="none" viewBox="0 0 1200 290">
        <defs>
          <linearGradient x1="50%" y1="98.3328202%" x2="50%" y2="45.1390748%" id="linearGradient-2">
            <stop stopColor="#FFFFFF" stopOpacity="0" offset="0%"></stop>
            <stop stopColor="#1417EF" stopOpacity="0.0972316576" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g id="Page-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Pique---Educator" transform="translate(0.000000, -1013.000000)" fill="url(#linearGradient-2)">
            <g id="The-Harsh-Facts2" transform="translate(0.000000, 762.000000)">
              <path id="wave1" className={css.one} d="M-8.5,452.5 C-8.5,452.5 26,360.499993 134.5,348.499993 C243,336.499993 336.5,417 394,425.5 C451.5,434 520,395.475945 560,383.487969 C600,371.499993 708.5,363.499993 785,383.487969 C861.5,403.475945 950.5,411.499993 1015,383.487969 C1079.5,355.475945 1168,309.500002 1213.5,230 C1259,150.499999 1239,547.500001 1239,547.500001 L-21,547.5 L-8.5,452.5 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Waves