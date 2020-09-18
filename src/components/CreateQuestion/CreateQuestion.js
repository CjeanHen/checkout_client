import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const CreateQuestion = ({ user, surveyId }) => {
  const [question, setQuestion] = useState({})

  // Event handler for the completion of the question input field
  const handleChange = event => {
    event.persist()

    setQuestion(prevQuestion => {
      const updatedQuestion = { [event.target.name]: event.target.value, part_of: surveyId }

      const editedQuestion = Object.assign({}, prevQuestion, updatedQuestion)

      return editedQuestion
    })
  }

  // API call to POST the question
  const handleSubmit = event => {
    event.preventDefault()

    return axios({
      url: apiUrl + '/questions/',
      method: 'POST',
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: { question }
    })
      .then(res => console.log(res))
      .catch(console.error)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>New Question</Form.Label>
        <Form.Control type="text" name="question" value={question.question || ''} onChange={handleChange} placeholder="Type your question here" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default CreateQuestion
