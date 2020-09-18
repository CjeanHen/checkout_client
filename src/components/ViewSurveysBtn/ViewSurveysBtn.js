import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ViewSurveysBtn = () => {
  return (
    <Button variant="info"><Link to='/index-surveys'>View your surveys</Link></Button>
  )
}

export default ViewSurveysBtn
