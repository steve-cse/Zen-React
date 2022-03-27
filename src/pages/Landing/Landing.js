import React from 'react'
import "./Landing.css";
import { Footer, Features, About ,Header } from '../../containers';
import {Navbar} from '../../components'


export default function Landing() {
  return (
    <>
    <div className="Landing">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <About />
    <Features />
    <Footer />
  </div>
  </>
  )
}