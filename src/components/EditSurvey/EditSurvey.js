import React, { useState } from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'
import apiUrl from '../../apiConfig'

const EditSurvey = ({ user, surveyId, survey1 }) => {
  const [survey, setSurvey] = useState(survey1)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Event handler for compeletion of the survey input fields
  const handleChange = event => {
    event.persist()

    setSurvey(prevSurvey => {
      const updatedSurvey = { [event.target.name]: event.target.value }

      const editedSurvey = Object.assign({}, prevSurvey, updatedSurvey)

      return editedSurvey
    })
  }

  // call to update the survey on the api
  const handleSubmit = event => {
    event.preventDefault()

    return axios({
      url: `${apiUrl}/surveys/${surveyId}/`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: { survey }
    })
      .then(res => console.log(res))
      .catch(console.error)
  }

  return (
    <div>
      <Button variant="secondary" onClick={handleShow}>
        Edit Survey
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Survey Name</Form.Label>
              <Form.Control type="text" name="name" value={survey.name || ''} onChange={handleChange} placeholder="Enter survey name" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={survey.description || ''} onChange={handleChange} placeholder="Tell us about your survey" />
            </Form.Group>
            <Button variant="success" type="submit" onClick={handleClose}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditSurvey
