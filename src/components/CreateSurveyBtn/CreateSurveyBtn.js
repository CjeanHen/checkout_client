import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const CreateSurveyBtn = ({ history }) => {
  const handleClick = event => {
    history.push('/create-survey')
  }
  return (
    <Button onClick={handleClick}>Start a new survey</Button>
  )
}

export default withRouter(CreateSurveyBtn)
