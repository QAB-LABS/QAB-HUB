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
import Carousel from './Carousel/Carousel'
import Footer from './Footer/Footer'


class App extends React.Component {

  render() {
    const { alert } = this.props;
    return (
      <div className="App">
        
        <MainNavbar />
        <Carousel />
        <div className="container main">
          <div className="row">
        {alert.message &&
            <div className={`ui message ${alert.type}`}>{alert.message}</div>
          }
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/games" component={Games} />
            <Route path="/post/:id" component={Post} />
            <Route path="/reviews" exact component={Reviews} />
            <Route path="/reviews/:id" component={Reviews} />
            <Route path="/me" component={Profile} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route render={() => <h2>404</h2>} />
<<<<<<< HEAD
          </Switch> 
          </div>
        </div>

=======
          </Switch>

          <Footer />
>>>>>>> 2031e94514dfebdcd873190f4e6773fd17c56897
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