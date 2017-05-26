import React from 'react'
import icon from './question.png'
import css from './style.css'

export const FAQCards = props => {
  return (
    <div className={css.root}>
      {cards.map((x, i) =>
        <div key={i} className={`${css.card} ${css[`c-${i}`]}`}>
          <div className={css.q}>
            <img src={icon} />
          </div>
          <div className={css.copy}>
            <div className={css.question}>{x.title}</div>
            <div className={css.answer}>{x.body}</div>
          </div>
        </div>)}
    </div>
  )
}

const cards = [{
    title: `When Will Pique Be Live?`,
    body: `Pique will be going live  in January 2017! If you’re interested in receiving updates and following our progress over these next three months, sign up for updates :)`,
  }, {
    title: `How Much Will Pique Cost Students?`,
    body: `Pique is 100% free for students. We monetize by charging scholarship providers a small fee so that we can ensure that students from all economic backgrounds have access to our platform.`,
  },{
    title: `Is Pique Secure?`,
    body: `We understand that students will upload very sensitive information onto our platform. As such, we have taken extreme measures to make sure our platform is secure. Pique saves and stores students’ information onto Amazon Web Services (AWS), one of the tech industry’s most secure cloud platforms. We use AWS to encrypt and back up students’ data on a daily basis and frequently run security tests through AWS.`,
  },{
    title: `How Can I Get Pique to Visit My High School?`,
    body: `Drop us an email, especially if you are based in the DC Metropolitan Area, Baltimore, Philadelphia or New York City. Over 75% of our Founding Team are 1st Generation College graduates and we love speaking to and inspiring our peers in the same ways we were not too long ago!`,
  },{
    title: `How Do I Pronounce Your Name?`,
    body: `Great question! And you’re not alone :) Our company is pronounced /pēk/ and is a homophone along with ‘peek’ and ‘peak’. Our ‘pique’ means ‘to stimulate interest or curiosity’, which we think is fitting since we connect students with scholarships that ‘pique’ their interests. We know, we’re a little nerdy.`,
  },{
    title: `How Can I Help?`,
    body: `We have some really lofty goals here at Pique. The loftiest of them all is to ensure that there is one scholarship for every student on our platform. In other words that there is a 1:1 ratio between scholarships and students. To do so, we need our supporters to spread the word about Pique by sharing our story on facebook and twitter and telling scholarship providers you know personally about Pique.`,
  },{
    title: `Can I Still Write a Personalized Recommendation for My Students? `,
    body: `Absolutely! Scholarship Providers using Pique accept ‘generic recommendations’ because they understand that not all educators and mentors have the same amount of free time to write recommendations. (A counselor at a high school where the counselor to student ration is 1:80 presumably does not have as much time to spend on recommendations as a counselor at a high school with a ratio of 40:1). That being said, if time is on your side and you prefer to write a personalized recommendation, feel free to do so. `,
  },{
    title: `Do You Offer Internships?`,
    body: `Yes! We are currently accepting marketing intern applications until November 4th. (You do not have to be based in the San Franciso Bay Area or DC to apply).`,
  },{
    title: `Have More Questions?`,
    body: <span>Feel free to email us at <a className={css.mail} href="mailto:support@getpique.co">support@getpique.co</a> and we will get back to you as soon as possible!</span>,
  },{
    title: `How Does Pique Handle FERPA Compliance as It Relates to Recommendations?`,
    body: `Under FERPA, parents or eligible students (students over the age of 18 or students enrolled at a college or university that saves recommendations) have the right to review confidential letters of recommendations. Like other platforms in the space, Pique offers students the chance to waive their right to review recommendations submitted on their behalfs.`,
}]

export default FAQCards