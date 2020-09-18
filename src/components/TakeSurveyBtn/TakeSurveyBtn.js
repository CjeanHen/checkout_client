import React from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const TakeSurveyBtn = ({ history }) => {
  const handleClick = event => {
    history.push('/browse-surveys')
  }
  return (
    <Button onClick={handleClick}>Browse surveys</Button>
  )
}

export default withRouter(TakeSurveyBtn)
