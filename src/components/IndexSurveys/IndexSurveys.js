import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import DeleteSurveyBtn from '../DeleteSurveyBtn/DeleteSurveyBtn'
import EditSurvey from '../EditSurvey/EditSurvey'

const IndexSurveys = ({ user }) => {
  const [surveys, setSurveys] = useState([])

  useEffect(() => {
    axios({
      url: apiUrl + '/surveys/',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => setSurveys(res.data.surveys))
      .catch(console.error)
  })

  const surveysJsx = surveys.map(survey => (
    <div key={survey.id}>
      <h3>{survey.name}</h3>
      <p>Created on: {survey.created_on}</p>
      <p>Description: {survey.description}</p>
      <Button><Link to={`/survey/${survey.id}`}>View Survey</Link></Button>
      <DeleteSurveyBtn surveyId={survey.id} user={user} />
      <EditSurvey user={user} surveyId={survey.id} survey1={survey} />
    </div>
  ))

  return (
    <div>
      <h1>Here are your surveys!</h1>
      {surveysJsx}
    </div>
  )
}

export default IndexSurveys
