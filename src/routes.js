import React from 'react'
import { Route, Router, browserHistory } from 'react-router'
import App from './containers/App'
import EventPage from './containers/EventPage'
import AddEventPage from './containers/AddEventPage'
import HomePage from './containers/HomePage'

export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/event/:id" component={EventPage} />
            <Route path="/add" component={AddEventPage} />
            <Route path="/" component={HomePage} />
        </Route>
    </Router>
)
