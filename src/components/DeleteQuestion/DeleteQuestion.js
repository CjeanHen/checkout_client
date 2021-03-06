import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete'

const DeleteQuestion = ({ questionId, user, surveyId, setQuestions }) => {
  const [show, setShow] = useState(false)
  const [deletedQuestion, setDeletedQuestion] = useState(false)

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
      .then(res => setDeletedQuestion(true))
      .catch(console.error)
  }

  // effect to update the index of questions after a question is deleted
  useEffect(() => {
    axios({
      url: apiUrl + `/surveys/${surveyId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => setQuestions(res.data.survey.questions))
  }, [deletedQuestion, setDeletedQuestion])

  return (
    <div className="question-options">
      <Button size="sm" onClick={handleShow}>
        <DeleteIcon fontSize="small" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this question? All answers will be deleted as well.</Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleSubmit}>
            Delete
          </Button>
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default DeleteQuestion
