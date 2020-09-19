import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CreateSurveyBtn from '../CreateSurveyBtn/CreateSurveyBtn'
import ViewSurveysBtn from '../ViewSurveysBtn/ViewSurveysBtn'
import TakeSurveyBtn from '../TakeSurveyBtn/TakeSurveyBtn'

const Home = ({ user }) => {
  return (
    <div id="home-options">
      <div id="title-container">
        <h1>Let&apos;s get started</h1>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center col-6">
            <CreateSurveyBtn />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center col-6">
            <ViewSurveysBtn />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center col-6">
            <TakeSurveyBtn />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
