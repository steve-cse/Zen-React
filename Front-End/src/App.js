import React from 'react';

import { Footer, Blog, Features, About ,Header } from './containers';
import { Navbar } from './components';

import './App.css';

const App = () => (
  <div className="App">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <About />
    <Features />
    <Footer />
  </div>
);

export default App;