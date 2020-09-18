import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import CreateQuestion from '../CreateQuestion/CreateQuestion'

// Component for a survey that you wish to complete
const TakeSurvey = ({ user, match }) => {
  const [takeSurvey, setTakeSurvey] = useState({})
  const [questionsArr, setQuestionsArr] = useState([])

  // When the page loads, using the id from the URL a GET request is made
  useEffect(() => {
    axios({
      url: `${apiUrl}/surveysallusers/${match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => {
        setTakeSurvey(res.data.survey)
        setQuestionsArr(res.data.survey.questions)
      })
      .catch(console.error)
  }, [setTakeSurvey])

  // Using the questions state, each question object is broken out for display on the survey
  const questionJsx = questionsArr.map(question => (
    <div key={question.id}>
      <li>{question.question}
      </li>
    </div>
  ))

  return (
    <div key={takeSurvey.id}>
      <h3>{takeSurvey.name}</h3>
      <p>Created on {takeSurvey.created_on}</p>
      <p>{takeSurvey.description}</p>
      <h4>Questions:</h4>
      <ol>
        {questionJsx}
      </ol>
      {takeSurvey.owner === user.id ? <CreateQuestion
        user={user}
        surveyId={takeSurvey.id}
        setQuestions={setQuestionsArr}
      /> : ''}
    </div>
  )
}

export default withRouter(TakeSurvey)
