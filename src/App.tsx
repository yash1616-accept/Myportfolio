import React from 'react'
import { ReactLenis } from 'lenis/react'
import Hero from './components/Hero/Hero'
import { LiquidReveal } from './components/LiquidReveal/LiquidReveal';
import About from './components/About'
import Skills from './components/Skills'
import Navbar from './components/Hero/navbar'
import Contact from './components/Contact'

import baseImg from './assets/space222.PNG';
import overlayImg from './assets/sp1.PNG';

const App = () => {
  return (
    <ReactLenis root>
      <>
        <section>
          <Navbar />
        </section>

        <section id="hero">
          <Hero />
        </section>

        <LiquidReveal
          baseImageSrc={baseImg}
          overlayImageSrc={overlayImg}
          brushSize={200}
          lerpAmount={0.08}
        />

        <section id="about">
          <About />
        </section>

        <section id='skills'>
          <Skills />
        </section>

        {/* <section id="projects">
          <Project />
        </section> */}

        <section id="contact">
          <Contact />
        </section>

      </>
    </ReactLenis>
  )
}

export default App
