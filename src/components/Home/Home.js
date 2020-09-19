import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CreateSurveyBtn from '../CreateSurveyBtn/CreateSurveyBtn'
import ViewSurveysBtn from '../ViewSurveysBtn/ViewSurveysBtn'
import TakeSurveyBtn from '../TakeSurveyBtn/TakeSurveyBtn'

const Home = ({ user }) => {
  return (
    <div id="home-options">
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center">
            <CreateSurveyBtn />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center">
            <ViewSurveysBtn />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center">
            <TakeSurveyBtn />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
