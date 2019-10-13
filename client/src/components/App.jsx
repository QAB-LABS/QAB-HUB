import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { alertActions } from '../actions/alert'
import MainNavbar from './MainNavbar/MainNavbar'
import Home from './pages/Home'
import Games from './pages/Games'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'


class App extends React.Component {

  render() {
    const { alert } = this.props;
    return (
      <div className="App">
        <div className="container ui grid">
          <div className="two wide column">Left</div>
          <div className="fourteen wide column">
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <MainNavbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/games" component={Games} />
              <Route path="/me" component={Profile} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/profile/:id" component={Profile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route render={() => <h2>404</h2>} />
            </Switch>
          </div>
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