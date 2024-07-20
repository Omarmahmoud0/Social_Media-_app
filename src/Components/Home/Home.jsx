import React from 'react'
import './home.scss'
import Stories from '../../stories/Stories'
import Posts from '../../posts/Posts'
import Thinking from '../your-thinking/Thinking'

const Home = () => (
  <div className='home'>
    <Stories />
    <Thinking/>
    <Posts />
  </div>
)

export default Home