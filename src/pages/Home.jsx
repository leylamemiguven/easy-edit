

import React from 'react'
import { useNavigate } from "react-router-dom"
import homeBanner from "../assets/home-banner.png"
import demo from '../assets/easyedit-demo.mp4'
import "../index.css"



export default function Home(){
  const navigate = useNavigate()
  function toForm(){
    let path = "/form"
    navigate(path)
  }
   

  return (
    <div className="home">
      <header>

        <h1> EasyEdit, the <span className="gpt3">GPT-3 Powered </span> <span className="book-editor-title">Book Editor</span></h1>
        <h2 className="subtitle"> Editing your book was never easier!</h2>
        <video className="demo" src={demo}  autoPlay muted loop/>
        <div className="explanation">
          <h2>Are you nervous to begin editing your book?  Are you so afraid of any grammar errors that you can't even show your book to your family and friends? 
          <br/>  Have no fear for EasyEdit is here!</h2>
          <p>Simply upload the book you've been working on and get suggested edits like you've been working with a professional editor! EasyEdit will highlight the words, phrases and punctuation changes on your original work and providie explanations for these changes so you know where the changes are coming from.</p>
          <p>EasyEdit is not a subsitute for a professional editor. Here are the services EasyEdit can provide:  </p>
          
            <p className="services-container">
              <span className="services-offered"><span className="checkmark">✔</span>Grammar/Punctuation</span>
              <span className="services-offered"><span className="checkmark">✔</span>Word Choice</span>
              <span className="services-offered"><span className="checkmark">✔</span>Overall Clarity</span>
              <span className="services-offered"><span className="checkmark">✔</span>Mood/Tone</span>
              <span className="services-notoffered"><span className="crossmark">✘</span>Developmental Edit</span>
              <span className="services-notoffered"><span className="crossmark">✘</span>Plot and Continuity</span>
              <span className="services-notoffered"><span className="crossmark">✘</span>Character Arcs and Development</span>
              <span className="services-notoffered"><span className="crossmark">✘</span>Sensitivity Reading</span>
            </p>

            <button className="start-editing-btn" onClick={toForm}> Start Editing your Manuscript</button>
        </div>
        <br/>
      </header>
    </div>
  )
}
