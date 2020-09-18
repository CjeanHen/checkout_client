import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'
import apiUrl from '../../apiConfig'

const EditSurvey = ({ user, surveyId, survey1, setSurveys }) => {
  const [survey, setSurvey] = useState(survey1)
  const [edited, setEdited] = useState(false)
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
      .then(res => setEdited(true))
      .catch(console.error)
  }

  // the effect that updates the index after the survey has been edited
  useEffect(() => {
    axios({
      url: apiUrl + '/surveys/',
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => setSurveys(res.data.surveys))
  }, [edited, setEdited])

  return (
    <div>
      <Button size="sm" variant="link" onClick={handleShow}>
        Edit
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
