
import React from 'react'
import { useNavigate } from "react-router-dom"
import  writersDilemma  from "../assets/writers-dilemma.jpg"
import  editingProcess  from "../assets/editing-process.png"
import "../index.css"


export default function About(){

    const navigate = useNavigate()
    function toForm(){
      let path = "/form"
      navigate(path)
    }


  return (
    <div>
       <h1> About</h1>
        <div className="about">
          <div className="about-info">
            <div className="aboutPart">
              <img src={writersDilemma} className="about-img" alt="writer typing on a typewriter while looking" />
              <div className="about-text">
                <h2>The Dilemma of the Aspiring Author</h2>
                <p>For both aspiring and published authors, the editing phase often evokes a sense of dread. This sentiment is particularly pronounced among unpublished authors who find themselves in a predicament: <span className="square-bracket">eager to share their work with readers but uncertain whether the audience will endure to it due to its unpolished nature.  </span> </p>
                <p>The presence of glaring typos, cumbersome run-on sentences, and an overall lack of editing quality can instill doubts even among friends and family. Consider the impression such a manuscript might leave on a literary agent or publisher with just a cursory glance; they can discern, in an instant, that the work requires further refinement.</p>
                <p>Yet, the prospect of engaging a professional editor is a financial challenge not everyone can surmount. Thus, aspiring authors find themselves at a crossroads, pondering the most prudent course of action.</p>
              </div>
            </div>
            <div className="aboutPart">
            <img src={editingProcess} className="about-img" alt="text with edits made with pen looking chaotic" />
              <div className="about-text">
                <h2>Editing your book with the help of Artifical Intelligence</h2>
                <p>When ChatGPT was initially introduced, I, as an aspiring author myself, eagerly embraced it as a tool to enhance my writing. I utilized it meticulously for proofreading and seeking synonyms for words I tended to overuse. While ChatGPT's responses were generally adequate, they often lacked the depth and nuance I sought.</p>
                <p>Over time, I came to realize that ChatGPT's effectiveness hinged on crafting highly specific prompts tailored to address particular writing challenges. Additionally, I encountered a disjointedness in the editing process. ChatGPT would return my fully edited chapter, but it left me in the dark regarding the changes it had made and the rationale behind them. These are pivotal questions that writers require answers to, enabling them to discern and incorporate edits they find agreeable while discarding those they do not.</p>
                <p>With my technical expertise, I endeavored to develop an application that would bridge the divide between technology and the aspiring author, providing a more seamless and informative editing experience.</p>
              </div>
            </div>
           
        
            <button onClick={toForm} className="start-editing-btn"> Start Editing your Manuscript</button>
          </div>
        </div>
      </div>
  )
}
