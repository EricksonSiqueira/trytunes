import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loged: false,
    };
    this.setLoged = this.setLoged.bind(this);
  }

  setLoged(value) {
    this.setState({ loged: value });
  }

  render() {
    const { loged } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {loged ? <Redirect to="/search" /> : <Login setLoged={ this.setLoged } />}
          </Route>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="/*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
