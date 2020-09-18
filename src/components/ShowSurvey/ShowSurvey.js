import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import CreateQuestion from '../CreateQuestion/CreateQuestion'
import DeleteQuestion from '../DeleteQuestion/DeleteQuestion'

const ShowSurvey = ({ user, match }) => {
  const [survey, setSurvey] = useState({})
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/surveys/${match.params.id}/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => {
        setSurvey(res.data.survey)
        setQuestions(res.data.survey.questions)
      })
      .catch(console.error)
  }, [])

  const questionJsx = questions.map(question => (
    <div key={question.id}>
      <li>{question.question}<Button variant="secondary">Edit</Button><DeleteQuestion user={user} questionId={question.id}/></li>
    </div>
  ))

  return (
    <div key={survey.id}>
      <h3>{survey.name}</h3>
      <p>Created on: {survey.created_on}</p>
      <p>Description: {survey.description}</p>
      <h4>Questions:</h4>
      <ol>
        {questionJsx}
      </ol>
      <CreateQuestion user={user} surveyId={survey.id} />
    </div>
  )
}

export default withRouter(ShowSurvey)
