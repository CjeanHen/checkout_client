import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import CreateSurveyBtn from '../CreateSurveyBtn/CreateSurveyBtn'
import ViewSurveysBtn from '../ViewSurveysBtn/ViewSurveysBtn'
import TakeSurveyBtn from '../TakeSurveyBtn/TakeSurveyBtn'
import takeSurvey from './take_survey_img.jpeg'
import reviewSurvey from './review_survey_img.jpeg'
import survey from './survey.jpeg'

const Home = ({ user }) => {
  return (
    <div id="home-options">
      <div id="title-container">
        <h1>Let&apos;s get started</h1>
      </div>
      <Container fluid>
        <Row className="justify-content-between mt-5 h-50">
          <Col className="text-center col-3">
            <Card id="createSrvyCard" d-flex align-items-stretch className="optionCards">
              <Card.Img variant="top" src={survey} rounded cap/>
              <Card.Body>
                <CreateSurveyBtn />
              </Card.Body>
            </Card>
          </Col>
          <Col className="text-center col-3">
            <Card id="viewSrvyCard" d-flex align-items-stretch className="optionCards">
              <Card.Img variant="top"src={reviewSurvey} rounded cap />
              <Card.Body>
                <ViewSurveysBtn />
              </Card.Body>
            </Card>
          </Col>
          <Col className="text-center col-3">
            <Card className="optionCards" d-flex align-items-stretch>
              <Card.Img variant="top" src={takeSurvey} rounded cap />
              <Card.Body>
                <TakeSurveyBtn />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
