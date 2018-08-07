import React, { Component } from 'react';
import './App.css';


const defaultStyle = {
  color: '#fff'
}
const fakeServerData = {
  user: {
    name: 'Andre',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {name: 'Beat it', duration: 123}, 
          {name: 'Personal Jesus', duration: 123}, 
          {name: 'Bohemian Rhapsody', duration: 123}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Blue Orchid', duration: 123},
          {name: 'London Calling', duration: 123}, 
          {name: 'Civil War', duration: 123}
        ]
      },
      {
        name: 'Reggae',
        songs: [
          {name: 'One Love', duration: 123}, 
          {name: 'Legalize It', duration: 123}, 
          {name: 'Three Little Birds', duration: 123}
        ]
      },
      {
        name: 'Beethoven',
        songs: [
          {name: 'Sonata No. 14 Moonlight', duration: 123}, 
          {name: 'Für Elise', duration: 123}, 
          {name: 'Symphonie No. 9', duration: 123}
        ]
      }
    ]
  }
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
        <input type="text" name="" id=""/>
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, display: 'inline-block', width: '25%' }}>
        <img src="" alt=""/>
        <h3>{this.props.playlist.name}</h3>
        <ul>
          {
            this.props.playlist.songs.map(song => 
              <li>{song.name}</li>
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
    this.state = { serverData: {} }
  }

  componentDidMount() {
    setTimeout(() => {
      console.log('hey')
      this.setState({ serverData: fakeServerData })
    }, 1000)
  }
  
  render() {
    return (
      <div className="App">
        {
          this.state.serverData.user ?
            <div>
              <h1 style={{ ...defaultStyle, fontSize: '54px' }}>
                {this.state.serverData.user.name}'s playlist
              </h1>
              <PlaylistCounter playlists={this.state.serverData.user.playlists} />
              <HoursCounter playlists={this.state.serverData.user.playlists} />
              <Filter />
              {
                this.state.serverData.user.playlists.map(playlist => 
                  <Playlist playlist={playlist} />
                )
              }
            </div>
          : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    )
  }
}

export default App