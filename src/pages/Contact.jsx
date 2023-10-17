import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const form = useRef()

  function sendEmail(e) {
    e.preventDefault()

    emailjs
      .sendForm('service_udlklle', 'template_wrk3hmh', form.current, 'EjypR1yjms_l57344')
      .then((result) => {
        console.log(result.text)
        // Clear the form after successful submission
        clearForm()
      })
      .catch((error) => {
        console.log(error.text)
      })
  }

  function clearForm() {
    // Reset form fields by setting their values to empty strings
    form.current.user_name.value = ''
    form.current.user_email.value = ''
    form.current.message.value = ''
  }

  return (
    <div>
      <h1>Contact</h1>
      <p>If you have any feedback or suggestions about the improvement of this app, please don't hesitate to let me know!</p>

      <form ref={form} onSubmit={sendEmail}>
        <div className="formPart">
          <label>Name</label>
          <input type="text" name="user_name" placeholder="Name" />
        </div>
        <div className="formPart">
          <label>Email</label>
          <input type="email" name="user_email" placeholder="Email" />
        </div>
        <div className="formPart">
          <label>Message</label>
          <textarea name="message" placeholder="Message" />
        </div>
        <input className="contact-submit-btn" type="submit" value="Send" />
      </form>
    </div>
  )
}
