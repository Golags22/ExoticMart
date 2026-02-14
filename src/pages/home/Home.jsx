import React from 'react'
import { FeaturedCategories, Hero, BestSellers, PromotionalBanner, NewArrivals, WhyShopWithUs } from '../../components/sections/home'

const Home = () => {
  return (
    <>
    <Hero />
    <FeaturedCategories />
    <BestSellers/>
    <PromotionalBanner/>
    <NewArrivals />
    <WhyShopWithUs />
    </>
  )
}

export default Home