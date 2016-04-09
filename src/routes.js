import React from 'react'
import { Route, Router, browserHistory } from 'react-router'
import App from './containers/App'
import EventPage from './containers/EventPage'
import AddEventPage from './containers/AddEventPage'

export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/event/:id" component={EventPage} />
            <Route path="/add" component={AddEventPage} />
        </Route>
    </Router>
)