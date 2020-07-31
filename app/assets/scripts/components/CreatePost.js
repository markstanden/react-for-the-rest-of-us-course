import React, { useEffect, useState, useContext } from 'react'
import Page from './Page'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import DispatchContext from '../DispatchContext'

function CreatePost(props) {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const appDispatch = useContext(DispatchContext)

  async function handleSubmit(e) {
    e.preventDefault()
    let urlRelPath = '/create-post'
    try {
      const response = await Axios.post(urlRelPath, {
        title,
        body,
        token: localStorage.getItem('complexAppToken'),
      })
      // redirect to new post url
      appDispatch({
        type: 'flashMessage',
        value: 'Congrats you created a new post',
      })
      props.history.push(`/post/${response.data}`)
      console.log('new post created')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Page title="Create new post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            onChange={e => setTitle(e.target.value)}
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            onChange={e => setBody(e.target.value)}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default withRouter(CreatePost)