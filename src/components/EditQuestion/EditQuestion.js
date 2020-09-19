import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'
import apiUrl from '../../apiConfig'
import EditIcon from '@material-ui/icons/Edit'

// Button, modal and axios call to PATCH an individual question
const EditQuestion = ({ user, questionId, question1, surveyId, setQuestions }) => {
  const [question, setQuestion] = useState(question1)
  const [show, setShow] = useState(false)
  const [edited, setEdited] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Event handler for compeletion of the survey input fields
  const handleChange = event => {
    event.persist()

    setQuestion(prevQuestion => {
      const updatedQuestion = { [event.target.name]: event.target.value }

      const editedQuestion = Object.assign({}, prevQuestion, updatedQuestion)

      return editedQuestion
    })
  }

  // call to update the survey on the api
  const handleSubmit = event => {
    event.preventDefault()

    return axios({
      url: `${apiUrl}/questions/${questionId}/`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: { question }
    })
      .then(res => setEdited(true))
      .catch(console.error)
  }

  // the effect that updates the index of questions after the question has been edited
  useEffect(() => {
    axios({
      url: apiUrl + `/surveys/${surveyId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => setQuestions(res.data.survey.questions))
  }, [edited, setEdited])

  // Edit button to display next to the question & modal to edit
  return (
    <div className="question-options">
      <Button size="sm" onClick={handleShow}>
        <EditIcon fontSize="small" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Edit question</Form.Label>
              <Form.Control type="text" name="question" value={question.question || ''} onChange={handleChange} placeholder="Edit your question" />
            </Form.Group>
            <Button type="submit" onClick={handleClose}>
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditQuestion
