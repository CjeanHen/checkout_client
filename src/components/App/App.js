import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import CreateSurvey from '../CreateSurvey/CreateSurvey'
import IndexSurveys from '../IndexSurveys/IndexSurveys'
import ShowSurvey from '../ShowSurvey/ShowSurvey'
import Home from '../Home/Home'
import BrowseSurveys from '../BrowseSurveys/BrowseSurveys'
import TakeSurvey from '../TakeSurvey/TakeSurvey'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/home' render={() => (
            <Home user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-survey' render={() => (
            <CreateSurvey user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/index-surveys' render={() => (
            <IndexSurveys user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/survey/:id' render={() => (
            <ShowSurvey user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/browse-surveys' render={() => (
            <BrowseSurveys user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/take-survey/:id' render={() => (
            <TakeSurvey msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
