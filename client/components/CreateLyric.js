import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { isMutationInitAction } from 'apollo-client/actions';

class CreateLyric extends Component {

    constructor(props) {
        super(props)

        this.state = {
            content: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.mutate({
            variables: {
                content: this.state.content,
                id: this.props.songId
            }
        }).then(this.setState({content: ''}))

    }

    render() {
        const { content } = this.state
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input
                    value={content}
                    onChange={(e) => this.setState({content: e.target.value})}/>
            </form>
        )
    }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $id:ID) {
        addLyricToSong(content: $content, songId: $id) {
            id
            lyrics{
                id
                likes
                content
            }
        }
}
`

export default graphql(mutation)(CreateLyric)