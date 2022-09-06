import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = (props) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)


    const getFetch = async () => {

        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + props.asin, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjAyOTIxNzAwOTM4MjAwMTVkNjlkNGQiLCJpYXQiOjE2NjIwMjMxMjcsImV4cCI6MTY2MzIzMjcyN30.I6b0OH9Z19fA56gR_JN7igfZg1dCjRkXr39-NUxd1iE'
                }
            })
            console.log(response)
            if (response.ok) {
                let comments = await response.json()
                // this.setState({ comments: comments, isLoading: false, isError: false })
                setComments(comments)
                setIsLoading(false)
                setIsError(false)

            } else {
                console.log('error')
                // this.setState({ isLoading: false, isError: true })
                setIsError(true)
                setIsLoading(false)

            }
        } catch (error) {
            console.log(error)
            // this.setState({ isLoading: false, isError: true })
            setIsError(true)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getFetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.asin])


    return (
        <div>
            {isLoading && <Loading />}
            {isError && <Error />}
            <AddComment asin={props.asin} />
            <CommentList commentsToShow={comments} />
        </div>
    )
}



export default CommentArea