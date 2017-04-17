import React, { Component } from 'react'
import { Container, Search } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { find } from './youtube'

const itemToResult = item => ({
    title: item.snippet.title,
    description: item.snippet.description,
    videoId: item.id.videoId
})

const justVideos = item => item.id.kind === "youtube#video"

class Creator extends Component {
  constructor(props) {
    super(props)
    this.state = {
        results: [],
        visual: "",
        audio: ""
    }
    this.clearResults = this.clearResults.bind(this)
    this.onPageLoad = this.onPageLoad.bind(this)
  }

  clearResults() {
    this.setState({ results: [] })
  }

  onPageLoad(items) {
      const mergedItems = _.uniqBy(this.state.results.concat(items.filter(justVideos).map(itemToResult)), item => item.title)
      this.setState({ results: mergedItems })
  }

  render() {
    return (
      <Container text>
            {this.state.visual !== ""
             ? <strong>{this.state.visual}</strong>
             : <Search
             results={this.state.results}
             onResultSelect={(_, data) => {
                 this.clearResults()
                 this.setState({ visual: data.videoId })
             }}
             onSearchChange={(event, value) => {
                 this.clearResults()
                 find(value, 10, this.onPageLoad)
             }}
             />
            }
        {this.state.audio !== ""
         ? <strong>{this.state.audio}</strong>
         : (this.state.visual !== "" ? <Search
         results={this.state.results}
         onResultSelect={(_, data) => {
             this.clearResults()
             this.setState({ audio: data.videoId })
         }}
         onSearchChange={(event, value) => {
             this.clearResults()
             find(value, 10, this.onPageLoad)
         }}
            /> : null)
        }

        <Link to={"/view/" + this.state.visual + "/" + this.state.audio}>Bake Cake!</Link>
      </Container>
    )
  }
}

export default Creator
