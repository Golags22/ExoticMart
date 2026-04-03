import React from 'react'
import { FeaturedCategories, Hero, BestSellers, PromotionalBanner, NewArrivals, WhyShopWithUs } from '../components/sections/home'
import { ProductList } from '../components/products'

export default function Home() {
  return (
    <>
    <Hero />
    <FeaturedCategories />
    <BestSellers/>
    <ProductList />
    <PromotionalBanner/>
    <NewArrivals />
    <WhyShopWithUs />
    </>
  )
}

