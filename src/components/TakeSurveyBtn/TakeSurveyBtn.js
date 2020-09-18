import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TakeSurveyBtn = () => {
  return (
    <Button variant="info"><Link to='/browse-surveys'>Browse surveys</Link></Button>
  )
}

export default TakeSurveyBtn
