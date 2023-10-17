import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./index.css"
import TextEditor from './components/TextEditor'

const apiKey = "YOUR API KEY HERE" // Replace with your actual API key
// the correct one

export default function Edits(props) {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false)
  const [seeEdits, setSeeEdits] = useState(false)
  const [segmentedResponses, setSegmentedResponses] = useState([])
  const segmentedBook = splitBookIntoSegments(makeIntoString(props.editMaterial))

  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0)

  const promptBase = `I'd like for you to act as a professional ${props.genre} book editor and make edits. Put the edits you want to propose by highlighting the new words or sentences, punctuation, etc. edit you offer. Put the new changes in square brackets ([]) in the original text. Then explain why you want them changed in a separate section from the original text called "Explanation" by providing details and in-depth explanations for each specific edit you made. Here is the text I want you to edit: `
  
  useEffect(() => {
    if (segmentedResponses.length === currentSegmentIndex) {
      // Request the current segment if segmentedResponses length matches currentSegmentIndex
      sendRequest(segmentedBook[currentSegmentIndex])
    }
  }, [segmentedResponses, currentSegmentIndex])

  function makeIntoString(paragraphs) {
    if (Array.isArray(paragraphs)) {
      return paragraphs.join('\n\n')
    } else {
      return '' // Return an empty string or handle the case when paragraphs are undefined.
    }
  }

  function highlightSquareBrackets(content) {
    return content.replace(/\[(.*?)\]/g, '<span class="square-bracket">$1</span>')
  }

  function formatResponse(content) {
    return content.split('\n').map((paragraph, index) => (
      <p
        key={index}
        dangerouslySetInnerHTML={{
          __html: highlightSquareBrackets(paragraph),
        }}
      />
    ))
  }


  function splitOriginalAndEdits(response) {
  const parts = response.split('Explanation:')
  const finalFormat = parts.map((part) => part.trim()).map((item) => formatResponse(item))
  return finalFormat
}

  async function sendRequest(bookSegment) {
    setLoading(true)

    try {
      const apiRequestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'I\'m a Student using ChatGPT for learning' },
          {
            role: 'user',
            content: `${promptBase}${bookSegment}`,
          },
        ],
      }

      const response = await axios.post('https://api.openai.com/v1/chat/completions', apiRequestBody, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      })

      setSegmentedResponses((prevResponses) => [...prevResponses, response.data.choices[0].message.content])

      // Handle rate limits
      const rateLimitRemaining = response.headers['x-ratelimit-remaining']
      const rateLimitReset = response.headers['x-ratelimit-reset']

      if (rateLimitRemaining <= 0) {
        // Rate limit exceeded, wait until reset time
        const resetTime = new Date(parseInt(rateLimitReset) * 1000)
        const now = new Date()
        const timeToWait = resetTime - now

        if (timeToWait > 0) {
          console.log(`Rate limit exceeded. Waiting for ${timeToWait / 1000} seconds...`)
          setTimeout(() => {
            sendRequest(bookSegment) // Retry after waiting
          }, timeToWait)
          return // Return to avoid setting loading to false prematurely
        }
      }

      console.log(response.data.choices[0].message.content)

      if (currentSegmentIndex + 1 < segmentedBook.length) {
        // If there are more segments to process, increment the index
        setCurrentSegmentIndex(currentSegmentIndex + 1)
      } else {
        setLoading(false) // All segments processed, stop loading animation
        setSeeEdits(true) // Set seeEdits to true when all segments are processed
      }
    } catch (error) {
      console.error('Error sending API request:', error)
      setLoading(false) // Stop loading animation on error
    }
  }

  function splitBookIntoSegments(material) {
    const words = material.split(/\s+/)
    const wordsPerSegment = 2048
    const segments = []
    let currentSegment = ''
    let wordCount = 0

    for (const word of words) {
      if (wordCount + word.split(/\s+/).length <= wordsPerSegment) {
        currentSegment += `${word} `
        wordCount += word.split(/\s+/).length
      } else {
        segments.push(currentSegment.trim())
        currentSegment = `${word} `
        wordCount = word.split(/\s+/).length
      }
    }

    if (currentSegment.trim() !== '') {
      segments.push(currentSegment.trim())
    }

    return segments
  }

  return (
    <div>
      <button className="see-edits-btn" onClick={() => sendRequest(segmentedBook[0])}>See Edits</button>
      <div>
        {loading ? (
          <div>
          <div className="loading-animation"></div>
          <p className="loading-percentage">Loading...</p>
          </div>
        ) : (
          <div >
            {seeEdits && segmentedResponses.map((segmentedResponse, index) => (
              <div key={index} className="editor">
                <div className="edited-text">
                  <span className="edited-text-title">Edited Text (Part {index + 1}):</span> {'\n'}
                  {splitOriginalAndEdits(segmentedResponse)[0]}
                </div>
                <div className="explanations">
                  <span className="explanations-title">Explanations (Part {index + 1}):</span> {'\n'}
                  {splitOriginalAndEdits(segmentedResponse)[1]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
