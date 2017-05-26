import React from 'react'
import Rectangles from 'components/Rectangles'
import img1 from './302-clock.png'
import img2 from './404-check.png'
import css from './style.css'

export const EducatorsReasons = props => {
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
  text: `Why Educators Cannot Wait to Use Pique`,
}
const data = [
  {
    style: {backgroundColor: `#3DB39E`},
    body: `Our thoughts are simple; help save educators time in the scholarship application process and they will in turn have more time to prepare tomorrow’s lesson plan, review last night’s homework assignments and strategize ways to enhance the classroom environment.`,
    component: _ => <div>
      <img src={img1} />
      <div className={css.title}>Save Time Writing Recommendations</div>
    </div>
  },{
    style: {backgroundColor: `#6217D3`},
    body: `Write a standard recommendation for your students with the peace of mind of knowing they will not be penalized for having a 'generic recommendation'. We educate scholarship foundations on limited time you have as an educator. Foundations that host their scholarships on Pique therefore agree to accept generic recommendations, no penalites.`,
    component: _ => <div>
      <img src={img2} />
      <div className={css.title}>Students Are Never Penalized. That's a Pique Promise.</div>
    </div>
  }
]

export default EducatorsReasons


