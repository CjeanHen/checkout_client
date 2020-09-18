import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// This component is responsible for handling answers submitted for each question
const AnswerForm = ({ user, question, survey }) => {
  const [answer, setAnswer] = useState({})

  const handleChange = event => {
    event.persist()

    setAnswer(prevAnswer => {
      const updatedAnswer = { [event.target.name]: event.target.value, answer_to: question.id, on_survey: survey.id }

      const editedAnswer = Object.assign({}, prevAnswer, updatedAnswer)

      return editedAnswer
    })
  }

  // the API call to make a POST request for a new answer
  const handleSubmit = event => {
    event.preventDefault()

    return axios({
      url: apiUrl + '/answers/',
      method: 'POST',
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: { answer }
    })
      .then(() => setAnswer({}))
      .catch(console.error)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTextArea">
        <Form.Control type="text" name="response" value={answer.response || ''} placeholder="Your answer here" onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default AnswerForm
