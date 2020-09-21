import React, { useEffect, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import CreateQuestion from '../CreateQuestion/CreateQuestion'
import DeleteQuestion from '../DeleteQuestion/DeleteQuestion'
import EditQuestion from '../EditQuestion/EditQuestion'
import ViewAnswers from '../ViewAnswers/ViewAnswers'

// Component for an individual survey
const ShowSurvey = ({ user, match }) => {
  const [survey, setSurvey] = useState({})
  const [questions, setQuestions] = useState([])

  // When the page loads, using the id from the URL a GET request is made
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
  }, [setSurvey])

  // Using the questions state, each question object is broken out for display on the survey
  const questionJsx = questions.map(question => (
    <div key={question.id}>
      <div className="question-container" key={question.id}>
        <li>{question.question}</li>
        <span className="question-controls">
          <EditQuestion
            user={user}
            questionId={question.id}
            question1={question}
            surveyId={survey.id}
            setQuestions={setQuestions}
          />
          <DeleteQuestion
            user={user}
            questionId={question.id}
            surveyId={survey.id}
            setQuestions={setQuestions}
          />
        </span>
      </div>
      <ViewAnswers user={user} question={question} survey={survey} />
    </div>
  ))

  return (
    <div key={survey.id}>
      <h3>{survey.name}</h3>
      <p>By {survey.author}</p>
      <p>Created on {survey.created_on}</p>
      <p>{survey.description}</p>
      <h4>Questions:</h4>
      <ol>
        {questionJsx}
      </ol>
      {survey.owner === user.id ? <CreateQuestion
        user={user}
        surveyId={survey.id}
        setQuestions={setQuestions}
      /> : ''}
    </div>
  )
}

export default withRouter(ShowSurvey)
