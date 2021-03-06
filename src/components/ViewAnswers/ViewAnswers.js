import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const ViewAnswers = ({ user, question, survey }) => {
  const [answers, setAnswers] = useState([])

  const handleClick = event => {
    event.preventDefault()

    return axios({
      url: apiUrl + `/questions/${question.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => setAnswers(res.data.question.answers))
      .catch(console.error)
  }

  const answersJsx = answers.map(answer => (
    <div key={answer.id}>
      <Card body>{answer.author}: {answer.response}</Card>
    </div>
  ))

  return (
    <div className="question-options">
      <Button size="sm" onClick={handleClick}>View responses</Button>
      {answersJsx}
    </div>
  )
}

export default ViewAnswers
