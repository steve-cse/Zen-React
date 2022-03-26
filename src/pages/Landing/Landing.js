import React from 'react'
import { Footer, Features, About ,Header } from '../../containers';
import {Navbar} from '../../components'
import "./Landing.css";

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