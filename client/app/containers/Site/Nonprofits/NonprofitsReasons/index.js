import React from 'react'
import Rectangles from 'components/Rectangles'
import css from './style.css'

export const NonprofitsReasons = props => {
  return (
    <div className={css.root}>
      <Rectangles
        header={header}
        data={data}
      />
    </div>
  )
}

const header = {
  className: css.header,
  text: `Why We Need Your Support`,
}
const data = [
  {
    style: {backgroundImage: `linear-gradient(229deg, #44BCEF 1%, #3FB1ED 11%, #1A5BE1 100%)`},
    body: `When scholarship providers have their own scholarship application process, it becomes more difficult for students to apply. And students from low-income and working class backgrounds are disproportionately impacted by inaccessible scholarships. Why? In addition to applying to college, studying for AP exams, taking the SATs and ACTs, participating in extra-curricular activities and doing communitiy service, these students also work part-time jobs to contribute to their household income.`,
    component: _ => <div>
      <div className={css.title}>
        <span className={css.num}>01</span>
        <span className={css.text}>Scholarships Have Become inaccessible</span>
      </div>
    </div>
  },{
    style: {backgroundImage: `linear-gradient(-208deg, #0A66CD 0%, #194BBC 23%, #3D0D95 76%, #44008D 87%)`},
    body: `We at Pique have pretty lofty goals for making scholarships more accessible. Chief among them is to reach a 1:1 ratio between students on the platform and scholarship providers so that every student has fair chance of winning a scholarship. When you become a Pique Partner, you help signal to providers that both your nonprofit and the students it serve support our common application for scholarships.`,
    component: _ => <div>
      <div className={css.title}>
        <span className={css.num}>02</span>
        <span className={css.text}>Ratios Matter</span>
      </div>
    </div>
  }
]

export default NonprofitsReasons