import React, { Component } from 'react'
import './App.css'
import queryString from 'query-string'


const defaultStyle = {
  color: '#fff'
}


class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    )
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, playlists) => {
      return songs.concat(playlists.songs)
    }, [])

    let totalDuration = Math.round(allSongs.reduce((sum, song) => {
      return sum + song.duration
    }, 0) / 60)

    return (
      <div style={{ ...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{totalDuration} hours</h2>
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img src="" alt=""/>
        <input type="text" name="" id="" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;

    return (
      <div style={{ ...defaultStyle, display: 'inline-block', width: '25%' }}>
        <img src={playlist.image} style={{width: '60px'}} alt=""/>
        <h3>{playlist.name}</h3>
        <ul>
          {
            playlist.songs.map((song, i) => 
              <li key={i}>{song.name}</li>
            )
          }
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = { 
      serverData: {},
      filterString: ''
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token

    if (!accessToken) return
    
    fetch('https://api.spotify.com/v1/me', {headers: {'Authorization': 'Bearer ' + accessToken}})
      .then((response) => response.json())
      .then((data) => this.setState({
        user: {
          name: data.display_name
        }
      }))
    
    fetch('https://api.spotify.com/v1/me/playlists', {headers: {'Authorization': 'Bearer ' + accessToken}})
      .then((response) => response.json())
      //.then((data) => console.log(JSON.stringify(data, true, "\t")))
      .then((data) => this.setState({
        playlists: data.items.map((item) => ({
            name: item.name, 
            image: item.images[0].url, 
            songs: []
          }))
      }))
    
    
  }
  
  render() {
    let thisServerData = this.state
    console.log('data', thisServerData)

    let playlistToRender = 
      this.state.user && this.state.playlists 
      ? this.state.playlists.filter(playlist =>
          playlist.name.toLocaleLowerCase().includes(this.state.filterString.toLocaleLowerCase())
        ) 
      : []

    return (
      <div className="App">
        {
          this.state.user
          ? <div>
              <h1 style={{ ...defaultStyle, fontSize: '54px' }}>
                {this.state.user.name}'s playlist
              </h1>
              <PlaylistCounter playlists={playlistToRender} />
              <HoursCounter playlists={playlistToRender} />
              <Filter onTextChange={text => this.setState({ filterString: text })} />
              {
                playlistToRender.map((playlist, i) =>
                  <Playlist key={i} playlist={playlist} />
                )
              }
            </div>
          : <button onClick={() => {
              window.location = window.location.href.includes('localhost') 
                ? 'http://localhost:8888/login'
                : 'https://andre-better-playlist-backend.herokuapp.com/login'
            }} style={{padding: '20px', marginTop: '20px', fontSize: '50px'}}>Sign in with Spotify</button>
        }
      </div>
    )
  }
}

export default App