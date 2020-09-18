import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const CreateSurveyBtn = () => {
  return (
    <Button variant="info"><Link to='/create-survey'>Create new survey</Link></Button>
  )
}

export default CreateSurveyBtn
