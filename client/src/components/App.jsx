import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { alertActions } from '../actions/alert'
import MainNavbar from './MainNavbar/MainNavbar'
import SideBar from './SideBar/SideBar'
import Home from './pages/Home'
import Games from './pages/Games'
import Profile from './pages/Profile'
import Post from './pages/Post'
import Login from './pages/Login'
import Signup from './pages/Signup'


class App extends React.Component {

  render() {
    const { alert } = this.props;
    return (
      <div className="App">
        <SideBar />
        <div className="pusher">
          {alert.message &&
            <div className={`ui message ${alert.type}`}>{alert.message}</div>
          }
          <MainNavbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/games" component={Games} />
            <Route path="/post/:id" component={Post} />
            <Route path="/me" component={Profile} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
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