import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Cake from './Cake'

const CakeCreator = () => (
  <div>
    <h2>We create cakes! The best cakes!</h2>
  </div>
)

const CakeViewer = ({ match }) => {
  const audio = match.params.audio.split(",")
  return (
    <Cake visual={match.params.visual} audio={audio} />
  )
}

const LayerCakeRoutes = () => (
  <Router>
    <div style={{
      overflow: "hidden"
    }}>
      <Route exact path="/" component={CakeCreator} />
      <Route path="/view/:visual/:audio" component={CakeViewer} />
    </div>
  </Router>
)

export default LayerCakeRoutes
