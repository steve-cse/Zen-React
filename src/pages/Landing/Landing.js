import React from 'react'
import "./Landing.css";
import { Footer, Features, About ,Header } from '../../containers';
import {CustomNavBar} from '../../components'


export default function Landing() {
  return (
    <>
    <div className="Landing">
    <div className="gradient__bg">
      <CustomNavBar />
      <Header />
    </div>
    <About />
    <Features />
    <Footer />
  </div>
  </>
  )
}