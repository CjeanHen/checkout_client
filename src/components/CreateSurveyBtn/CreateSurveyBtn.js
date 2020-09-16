import React from 'react'
import { Link } from 'react-router-dom'

const CreateSurveyBtn = () => {
  return (
    <button><Link to='/create-survey'>Create new survey</Link></button>
  )
}

export default CreateSurveyBtn
