import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
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
      <p>{answer.response}</p>
    </div>
  ))

  return (
    <div>
      <Button variant="link" onClick={handleClick}>See responses</Button>
      <div>{answersJsx}</div>
    </div>
  )
}

export default ViewAnswers
