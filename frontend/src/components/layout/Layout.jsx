import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({children}) {
  return (
    <div className="flex flex-col min-h-screen">
    <Header/>
    <main>
    <h2>{children}</h2>
    </main>
    <Footer/>
     
    </div>
  )
}
