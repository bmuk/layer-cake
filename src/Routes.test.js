import React from 'react'
import ReactDOM from 'react-dom'
import LayerCakeRoutes from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LayerCakeRoutes />, div)
})
