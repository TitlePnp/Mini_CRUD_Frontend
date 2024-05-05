import React from 'react'

import Navbar from '../../components/shared/Navbar'
import Banner from '../../components/shared/Banner'

import API_AllRecProducts from '../../api/API_RecProductList'
import API_ShowAllProduct from '../../api/API_ShowAllProduct'

export default function LandingPage() {

  return (
    <div>
      <Navbar />
      <Banner />
      <div>
        <API_AllRecProducts />
        <API_ShowAllProduct />
      </div>
    </div>
  )
}
