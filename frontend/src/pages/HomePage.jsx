import React from 'react'
import Layout from '../components/layout/Layout'
import { HeroSection } from './Home/HeroSection'
import { CategoryShowcase } from './Home/CategoryShowcase'
export const HomePage = () => {
 
  return (
    <Layout>
    <HeroSection/>
    <CategoryShowcase/>
    </Layout>
  )
}
