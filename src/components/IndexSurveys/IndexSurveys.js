import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import DeleteSurveyBtn from '../DeleteSurveyBtn/DeleteSurveyBtn'
import EditSurvey from '../EditSurvey/EditSurvey'

const IndexSurveys = ({ user }) => {
  const [surveys, setSurveys] = useState([])

  useEffect(() => {
    axios({
      url: apiUrl + '/surveys/',
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => setSurveys(res.data.surveys))
      .catch(console.error)
  }, [setSurveys])

  const surveysJsx = surveys.map(survey => (
    <Card key={survey.id}>
      <Card.Body>
        <Card.Title><Link to={`/survey/${survey.id}`}>{survey.name}</Link></Card.Title>
        <Card.Subtitle className="mb-2 text-muted"><p>Created on: {survey.created_on}</p></Card.Subtitle>
        <Card.Text>
          <p>{survey.description}</p>
        </Card.Text>
        <DeleteSurveyBtn surveyId={survey.id} user={user} setSurveys={setSurveys} />
        <EditSurvey user={user} surveyId={survey.id} setSurveys={setSurveys} survey1={survey} />
      </Card.Body>
    </Card>
  ))

  return (
    <div>
      <h1>Here are your surveys!</h1>
      {surveysJsx.reverse()}
    </div>
  )
}

export default IndexSurveys
