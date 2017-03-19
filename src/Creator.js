import React, { Component } from 'react'
import { Container, Search } from 'semantic-ui-react'
import { find } from './youtube'

const itemToResult = (item) => ({
  title: item.snippet.title,
  description: item.snippet.title
})

class Creator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
    this.clearResults = this.clearResults.bind(this)
    this.onPageLoad = this.onPageLoad.bind(this)
  }

  clearResults() {
    this.setState({ results: [] })
  }

  onPageLoad(items) {
    this.setState({ results: this.state.results.concat(items.map(itemToResult)) })
  }

  render() {
    return (
      <Container text>
        <Search results={this.state.results} onSearchChange={(event, value) => {
            this.clearResults()
            find(value, 10, this.onPageLoad)
          }}/>
      </Container>
    )
  }
}

export default Creator
