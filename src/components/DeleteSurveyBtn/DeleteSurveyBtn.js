import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const DeleteSurveyBtn = ({ surveyId, user, setSurveys }) => {
  const [show, setShow] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // call to delete the survey from the api
  const handleSubmit = event => {
    event.preventDefault()

    return axios({
      url: `${apiUrl}/surveys/${surveyId}/`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => setDeleted(true))
      .catch(console.error)
  }

  // this call updates the index after a delete
  useEffect(() => {
    axios({
      url: apiUrl + '/surveys/',
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => setSurveys(res.data.surveys))
  }, [deleted, setDeleted])

  return (
    <div>
      <Button size="sm" variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this survey?</Modal.Body>
        <Modal.Footer>
          <Form onSubmit={handleSubmit}>
            <Button variant="danger" type="submit" onClick={handleClose}>
              Delete
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default DeleteSurveyBtn
