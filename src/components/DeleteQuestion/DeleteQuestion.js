import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const DeleteQuestion = ({ questionId, user }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // call to delete the survey from the api
  const handleSubmit = event => {
    event.preventDefault()

    return axios({
      url: `${apiUrl}/questions/${questionId}/`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => console.log(res))
      .catch(console.error)
  }

  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit" onClick={handleSubmit}>
            Yes, delete question
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default DeleteQuestion
