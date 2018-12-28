import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import fetchSongDetail from '../queries/fetchSongDetail'
import { Link } from 'react-router'
import CreateLyric from './CreateLyric'
import LyricList from './LyricList'

class SongDetail extends Component {

    render () {
        const { song } = this.props.data
        if(!song) {
            return <div>Loading Song Detail...</div>
        }
        return (
            <div className="container">
                <Link to='/'>Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics}/>
                <CreateLyric songId={this.props.params.id}/>
            </div>
        )
    }
}

export default graphql(fetchSongDetail, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail)