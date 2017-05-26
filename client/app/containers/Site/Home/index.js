import React from 'react'
import HomeHero from './HomeHero'
import HomeCounters from './HomeCounters'
import HomeFacts from './HomeFacts'
import HomeEducators from './HomeEducators'
import HomeScholarships from './HomeScholarships'
import HomeTeam from './HomeTeam'

export const Home = props => {
  return (
    <div>
      <HomeHero />
      <HomeCounters />
      <HomeFacts />
      <HomeScholarships />
      <HomeEducators />
      <HomeTeam />
    </div>
  )
}

export default Home