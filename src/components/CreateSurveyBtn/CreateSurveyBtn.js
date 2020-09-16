import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const CreateSurveyBtn = () => {
  return (
    <div>
      <Button><Link to='/create-survey'>Create new survey</Link></Button>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Survey Name</Form.Label>
          <Form.Control type="email" placeholder="Enter survey name" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control type="password" placeholder="Tell us about your survey" />
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
        <Button variant="danger" type="submit">
          Cancel
        </Button>
      </Form>
    </div>
  )
}

export default CreateSurveyBtn
