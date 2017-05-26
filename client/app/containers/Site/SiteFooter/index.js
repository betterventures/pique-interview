import React from 'react'
import { Link } from 'react-router'
import css from './style.css'

export const SiteFooter = props => {
  return (
    <footer className={css.root}>
      <div className={css.wrap}>
        {contents.map((x, i) =>
          <div key={i} className={css.col}>
            <ul className={css.ul}>
              <li className={css.header}>{x.title}</li>

              {x.links.map((x, i) =>
                <li key={i} className={css.li}>
                  {x.to
                    ? <Link
                        to={x.to}
                        className={css.link}>
                        {x.text}
                      </Link>
                    : <a
                        href={x.href}
                        className={css.link}>
                        {x.text}
                      </a>}
                </li>)}

            </ul>
          </div>)}
      </div>

      <div className={css.subfooter}>
        <div className={css.copyright}>Pique © 2016</div>
      </div>
    </footer>
  )
}

const contents = [
  {
    title: 'Company',
    links: [
      { to: '/about#team', text: 'Team'},
      { to: '/blog', text: 'Blog'},
      { to: '/about', text: 'Mission'},
      { href: 'https://angel.co/pique/jobs', text: 'Careers'},
    ]
  },{
    title: 'Become a Partner',
    links: [
      { to: '/nonprofits', text: 'Nonprofits'},
      { to: '/providers', text: 'Scholarship Providers'},
      { to: '/educators', text: 'Educators'},
    ]
  },{
    title: 'Support',
    links: [
      { to: '/faq', text: 'FAQ'},
      { href: 'mailto:support@getpique.co', text: 'Contact Us'},
    ]
  },{
    title: 'Let’s Get Social!',
    links: [
      { href: '#', text: 'Twitter'},
      { href: '#', text: 'Instagram'},
      { href: '#', text: 'Facebook'},
    ]
  }
]

export default SiteFooter
