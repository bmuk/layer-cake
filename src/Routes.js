import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Creator from './Creator'
import Cake from './Cake'

const CakeViewer = ({ match }) => {
  const audio = match.params.audio.split(",")
  return (
    <Cake visual={match.params.visual} audio={audio} />
  )
}

const LayerCakeRoutes = () => (
  <Router>
    <div style={{
      overflow: "hidden",
      maxHeight: "100vh",
      maxWidth: "100vw"
    }}>
      <Route exact path="/" component={Creator} />
      <Route path="/view/:visual/:audio" component={CakeViewer} />
    </div>
  </Router>
)

export default LayerCakeRoutes
