import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// This component allows users to browse surveys made by all users and answer any one they choose
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
    <Card key={survey.id}>
      <Card.Body>
        <Card.Title><Link to={`/take-survey/${survey.id}`}>{survey.name}</Link></Card.Title>
        <Card.Subtitle><p>Created on: {survey.created_on}</p></Card.Subtitle>
        <p>{survey.description}</p>
      </Card.Body>
    </Card>
  ))

  return (
    <div>
      <h1>Browse all surveys</h1>
      {surveysJsx.reverse()}
    </div>
  )
}

export default BrowseSurveys
