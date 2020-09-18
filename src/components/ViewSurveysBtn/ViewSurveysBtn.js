import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ViewSurveysBtn = () => {
  return (
    <Button variant="info"><Link to='/index-surveys'>Your Surveys</Link></Button>
  )
}

export default ViewSurveysBtn
