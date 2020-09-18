import React from 'react'
import CreateSurveyBtn from '../CreateSurveyBtn/CreateSurveyBtn'
import ViewSurveysBtn from '../ViewSurveysBtn/ViewSurveysBtn'
import TakeSurveyBtn from '../TakeSurveyBtn/TakeSurveyBtn'

const Home = ({ user }) => {
  return (
    <div>
      <CreateSurveyBtn />
      <ViewSurveysBtn />
      <TakeSurveyBtn />
    </div>
  )
}

export default Home
