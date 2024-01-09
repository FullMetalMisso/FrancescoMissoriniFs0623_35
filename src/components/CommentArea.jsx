import { useState, useEffect } from 'react'
import CommentsList from './CommentsList'
import AddComment from './AddComment'

const CommentArea = (props) => {

  const [comments, setComments ] = useState ([])

  useEffect(() => (
    getComments()
  ), [props.bookId])


 const aggiornaCommenti = () => {
    getComments()
  }

  const getComments = () => {
    fetch(
      'https://striveschool-api.herokuapp.com/api/comments/' +
        props.bookId,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlkNWM1M2U2Mjg4NjAwMTg4M2Y1MmUiLCJpYXQiOjE3MDQ4MTE2MDQsImV4cCI6MTcwNjAyMTIwNH0.Hg1qDoqKiy5BMTkqnObsSJDOLGiDjJG779Tp6-UuQjE',
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('errore nel recupero dei commenti')
        }
      })
      .then((arrayOfComments) => {
        console.log(arrayOfComments)
        setComments(arrayOfComments)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  
    return (
      <div>
        <div>
          <CommentsList reviews={comments} />
        </div>
        <div>
          <AddComment bookId={props.bookId} aggiornaCommenti={aggiornaCommenti} />
        </div>
      </div>
    )
  }


export default CommentArea
