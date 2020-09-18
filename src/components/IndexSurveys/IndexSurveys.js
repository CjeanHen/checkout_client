import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
    <div key={survey.id}>
      <Link to={`/survey/${survey.id}`}>{survey.name}</Link>
      <p>Created on: {survey.created_on}</p>
      <p>Description: {survey.description}</p>
      <DeleteSurveyBtn surveyId={survey.id} user={user} setSurveys={setSurveys} />
      <EditSurvey user={user} surveyId={survey.id} setSurveys={setSurveys} survey1={survey} />
    </div>
  ))

  return (
    <div>
      <h1>Here are your surveys!</h1>
      {surveysJsx.reverse()}
    </div>
  )
}

export default IndexSurveys
