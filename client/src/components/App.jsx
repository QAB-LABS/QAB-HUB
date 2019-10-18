import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { alertActions } from '../actions/alert'
import MainNavbar from './MainNavbar/MainNavbar'
import Home from './pages/Home'
import Games from './pages/Games'
import Reviews from './pages/Reviews'
import Profile from './pages/Profile'
import Post from './pages/Post'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Carousel from './Carousel/Carousel'
import Footer from './Footer/Footer'
import GameDetails from './pages/GameDetails'


class App extends React.Component {

  render() {
    const { alert } = this.props;
    return (
      <div className="App">

        <MainNavbar />
        <Carousel />
        <div className="container main">
          <div className="row">
            <div className="col-4">
              One
            </div>
            <div className="col-4">
              Two
            </div>
            <div className="col-4">
              Three
            </div>
            <div className="col-4">
              Four
            </div>
          </div>
          <div className="row">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/games" exact component={Games} />
              <Route path="/games/:id" component={GameDetails} />
              <Route path="/post/:id" component={Post} />
              <Route path="/reviews" exact component={Reviews} />
              <Route path="/reviews/:id" component={Reviews} />
              <Route path="/me" component={Profile} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/profile/:id" component={Profile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route render={() => <h2>404</h2>} />
            </Switch>
          </div>
          <Footer />
        </div>
        {alert.message && <div className={`ui message ${alert.type}`}>{alert.message}</div>}
      </div>
    )
  }
}

function mapState(state) {
  return { alert: state.alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(App);