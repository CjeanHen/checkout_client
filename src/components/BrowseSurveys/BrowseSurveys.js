import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const BrowseSurveys = ({ user }) => {
  const [allSurveys, setAllSurveys] = useState([])

  useEffect(() => {
    axios({
      url: apiUrl + '/availablesurveys/',
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => setAllSurveys(res.data.surveys))
      .catch(console.error)
  }, [setAllSurveys])

  const surveysJsx = allSurveys.map(survey => (
    <div key={survey.id}>
      <Link to={`/survey/${survey.id}`}>{survey.name}</Link>
      <p>Created on: {survey.created_on}</p>
      <p>Description: {survey.description}</p>
    </div>
  ))

  return (
    <div>
      <h1>Browse surveys</h1>
      {surveysJsx.reverse()}
    </div>
  )
}

export default BrowseSurveys
