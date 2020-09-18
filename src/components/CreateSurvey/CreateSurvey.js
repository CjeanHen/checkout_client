import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'

// Component with the view for the form to start a survey
const CreateSurvey = ({ user, history }) => {
  const [survey, setSurvey] = useState({})
  // const [createdSurveyId, setCreatedSurveyId] = useState('')

  // Event handler for completion of the survey input fields
  const handleChange = event => {
    event.persist()

    setSurvey(prevSurvey => {
      const updatedSurvey = { [event.target.name]: event.target.value }

      const editedSurvey = Object.assign({}, prevSurvey, updatedSurvey)

      return editedSurvey
    })
  }

  const handleClick = event => {
    history.push('/home')
  }

  // the API call to make a POST request for a new survey
  const handleSubmit = event => {
    event.preventDefault()

    return axios({
      url: apiUrl + '/surveys/',
      method: 'POST',
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: { survey }
    })
      .then(res => history.push(`survey/${res.data.survey.id}`))
      .catch(console.error)
  }

  return (
    <div>
      <h1>Create a new survey here</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Survey Name</Form.Label>
          <Form.Control type="text" name="name" value={survey.name || ''} onChange={handleChange} placeholder="Enter survey name" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name="description" value={survey.description || ''} onChange={handleChange} placeholder="Tell us about your survey" />
        </Form.Group>
        <Button variant="success" type="submit">
          Start
        </Button>
        <Button onClick={handleClick}>Cancel</Button>
      </Form>
    </div>
  )
}

export default withRouter(CreateSurvey)
