import React, { Component } from 'react'
import query from '../queries/fetchSongs'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import mutation from '../queries/deleteSong'

class SongList extends Component {

    onSongDelete (id) {
        this.props.mutate({ variables: { id } })
            .then(() => this.props.data.refetch())
    }

    render () {
        const { loading, songs } = this.props.data
        if(loading===true)
            return (<div>Loading...</div>)
        return (
            <div>
                <ul className='collection'>
                    {songs.map(({ id, title }) =>
                        <li key={id} className='collection-item'>
                            <Link to={`/songs/${id}`}>
                                {title}
                            </Link>
                            <i
                                className="material-icons"
                                onClick={() => this.onSongDelete(id)}
                            >delete</i>
                        </li>
                    )}
                </ul>
                <Link
                    to='songs/new'
                    className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

export default graphql(mutation)(graphql(query)(SongList))