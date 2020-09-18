import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
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
    <Card key={survey.id}>
      <Card.Body>
        <Card.Title><Link to={`/take-survey/${survey.id}`}>{survey.name}</Link></Card.Title>
        <Card.Subtitle><p>Created on: {survey.created_on}</p></Card.Subtitle>
        <p>Description: {survey.description}</p>
      </Card.Body>
    </Card>
  ))

  return (
    <div>
      <h1>Browse surveys</h1>
      {surveysJsx.reverse()}
    </div>
  )
}

export default BrowseSurveys
