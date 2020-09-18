import React from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const ViewSurveysBtn = ({ history }) => {
  const handleClick = event => {
    history.push('/index-surveys')
  }

  return (
    <Button onClick={handleClick}>Your Surveys</Button>
  )
}

export default withRouter(ViewSurveysBtn)
