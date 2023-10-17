import React, { useState } from 'react'
import PizZip from "pizzip"
import { DOMParser } from "@xmldom/xmldom"
import Edits from "../Edits"
import { useNavigate } from "react-router-dom"
import "../index.css"


export default function Form() {
    const navigate = useNavigate()

    const [formSubmitted, setFormsubmitted] = useState(false)
    const [paragraphs, setParagraphs] = useState([])
    const [wordCount, setWordCount] = useState(0)
    const [formData, setFormData] = useState(
        {
            title: "",
            genre: "",  
            selectedFile: null

        }
    )

    
    function onFileUpload(event){
        const reader = new FileReader()
        let file = event.target.files[0]
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData, 
                title : file.name,
                selectedFile: file

            }
        })
        
    
        reader.onload = (event) => {
          const content = event.target.result
          const paragraphs = getParagraphs(content).paragraphs
          setParagraphs(paragraphs)
          setWordCount(getParagraphs(content).totalWordCount)
        }
    
        reader.onerror = (err) => console.error(err)
    
        reader.readAsBinaryString(file)

      }


    function str2xml(str) {
        if (str.charCodeAt(0) === 65279) {
          // BOM sequence
          str = str.substr(1);
        }
        return new DOMParser().parseFromString(str, "text/xml")
      }
      
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData, 
                [name]: type === "checkbox" ? checked : value

            }
        })
    }

    
    function seeEdits(){
        let path = "/edits"
        navigate(path)
    }

      // Get paragraphs as javascript array and the total word count
    function getParagraphs(content) {
        const zip = new PizZip(content)
        const xml = str2xml(zip.files["word/document.xml"].asText())
        const paragraphsXml = xml.getElementsByTagName("w:p")
        const paragraphs = []
        let totalWordCount = 0
    
        for (let i = 0, len = paragraphsXml.length; i < len; i++) {
            let fullText = ""
            const textsXml = paragraphsXml[i].getElementsByTagName("w:t")
            for (let j = 0, len2 = textsXml.length; j < len2; j++) {
                const textXml = textsXml[j]
                if (textXml.childNodes) {
                    fullText += textXml.childNodes[0].nodeValue
                }
            }
            if (fullText) {
                paragraphs.push(fullText);
                // Calculate word count for the current paragraph and add to total word count
                const words = fullText.trim().split(/\s+/)
                // console.log(words)
                totalWordCount += words.length
            }
        }

    
        // console.log("Paragraphs:", paragraphs)
        // console.log("Total Word Count:", totalWordCount)
        return {paragraphs, totalWordCount}
    }

    function handleSubmit(event) {
      if (formData.selectedFile === null){

        alert("You need to select a file!")
      }
      else{
        event.preventDefault()
        setFormsubmitted(true)
        console.log(formData)
      }
     
  }
    
    return (
        <div>
        <h1>Start Editing</h1>
        <div className="reccs">
            <h2>Reccomendations for faster and better experience!</h2>
            <p>The GPT-3 API usually allows about 3000 words per input to function effectively within the rate limit. Although you can upload your entire book into EasyEdit, it might take very long for GPT-3 to go through it. It is reccomended for you to upload your book in little chunks such as chapters within the 2000-3000 word range to get more detailed explanations and faster results.</p>


        </div>
        { !formSubmitted && <form onSubmit={handleSubmit}>
        <div className="form-section">
        <label htmlFor="genre"> What is the genre of your book? </label>
        <input
            id="genre"
            type="text"
            placeholder="Genre"
            onChange={handleChange}
            name="genre"
            value={formData.genre}
        />
            <br/>
            </div>
            <div className="form-section">
            <label htmlFor="selectedFile">Upload your book (doc, docx formats are allowed) : </label>
            <input 
                id="selectedFile"
                name="selectedFile" 
                type="file" 
                accept=".doc,.docx" 
                onChange={onFileUpload} />
            {formData.selectedFile && <p>Selected file: {formData.selectedFile.name}</p>}
            <br/>
            </div>
            <div className="submit-btn">
                <button className="form-submit-btn" >Submit</button>
            </div>
        </form>}
            {formSubmitted && 
                <div>
                    <h2 className="book-title">{formData.title} </h2>
                    <div className="book-info" >
                        <p>Word Number: {wordCount} </p>
                        <p>Genre: {formData.genre}</p>
                    </div>
                    <Edits editMaterial={paragraphs} genre={formData.genre} wordCount={wordCount}/>
                </div>}
        </div>
    )

}


