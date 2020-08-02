import React, { useEffect, useContext, useState } from 'react'
import Page from './Page'
import ProfilePosts from './ProfilePosts'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import StateContext from '../StateContext'

function Profile(props) {
  const { username } = useParams()
  const appState = useContext(StateContext)

  //create local state variables to act as placeholders
  //to be displayed whilst awaiting the response from the server.
  //use of state allows them to be replaced as the response comes in.
  const [profileData, setProfileData] = useState({
    profileUsername: username,
    profileAvatar: '/* https://gravatar.com/avatar/placeholder?s=128 */',
    isFollowing: false,
    counts: { postCount: '', followerCount: '', followingCount: '' },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, {
          token: appState.user.token,
        })
        setProfileData(response.data)
      } catch (errorData) {
        console.log(
          'There was a problem getting profile data from the server:',
          errorData
        )
      }
    }
    fetchData()
  }, [])

  return (
    <Page title="Your Profile">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} />
        {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>
      <ProfilePosts />
    </Page>
  )
}

export default Profile
