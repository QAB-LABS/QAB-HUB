import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { alertActions } from '../actions/alert'
import MainNavbar from './MainNavbar/MainNavbar'
import Carousel from './Carousel/Carousel'
import Home from './pages/Home'
import Games from './pages/Games'
import Reviews from './pages/Reviews'
import Profile from './pages/Profile'
import Post from './pages/Post'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './Footer/Footer'
import GameDetails from './pages/GameDetails'

import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faHeart } from '@fortawesome/free-solid-svg-icons'
 
library.add(fab, faBars, faHeart)


class App extends React.Component {

  render() {
    const { alert } = this.props;
    return (
      <div className="App">

        <MainNavbar />
        <Carousel />
        <div className="container main">
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
        </div>

        <Footer />
        
        {alert.message &&
          <div className={`alert message ${alert.type}`}>{alert.message}</div>
        }

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