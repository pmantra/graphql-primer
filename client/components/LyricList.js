import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LyricList extends Component {

    handleClick(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                ___typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        })
    }

    render () {
        const { lyrics } = this.props
        return (
            <ul className='collection'>
                {lyrics.map(({ id, content, likes }) =>
                    <li key={id} className='collection-item'>
                        {content}
                        <div className='votebox'>
                            <i
                                className='material-icons'
                                onClick={() => this.handleClick(id,likes)}>
                                thumb_up
                            </i>
                            {likes}
                        </div>
                    </li>
                )}
            </ul>
        )
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id){
            id
            likes
        }
    }
`

export default graphql(mutation)(LyricList)