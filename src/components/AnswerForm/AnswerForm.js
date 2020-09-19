import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
// This component is responsible for handling answers submitted for each question
const AnswerForm = ({ user, question, survey, msgAlert }) => {
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
      .then(() => msgAlert({
        heading: 'Success',
        message: messages.answerSentSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Uh-oh',
        message: messages.answerSentFailure,
        variant: 'danger'
      }))
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
