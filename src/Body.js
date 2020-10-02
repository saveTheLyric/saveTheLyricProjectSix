import Axios from "axios";
import React, { Component } from "react";

class Body extends Component {
  constructor() {
    super()
    this.state = {
      firebaseData: {
        artist: "",
        song: "",
        lyrics: "",
      },
    }
  }

  //Functions

  artistInput = (e) => {
    this.setState({
      firebaseData: {
        artist: e.target.value,
        song: this.state.firebaseData.song,
      }
    })
  }

  songInput = (e)=> {
    this.setState({
      firebaseData: {
        song: e.target.value,
        artist: this.state.firebaseData.artist,
      }
    })
  }

  getLyrics = (e) => {
    e.preventDefault();
    Axios.get(`https://api.lyrics.ovh/v1/${this.state.firebaseData.artist}/${this.state.firebaseData.song}`)
    .then((results) => {
      
      console.log(results);
    })
  }

  render(){
    return(

      // <div className="something">
        <div className="wrapper">
          <div className="info">
            <h1>Guess the Lyric</h1>
            {/* <img src="./assets/guessLyricsLogo.png" alt=""Guess the Lyric/> */}
            <form onSubmit={this.getLyrics} action="">
              <label htmlFor="artist">Artist:</label>
              <input 
                type="text"
                id="artist"
                className="artist"
                onChange={this.artistInput}
                value={this.state.firebaseData.artist}
                />
              <label htmlFor="song">Song:</label>
              <input 
                type="text" 
                id="song"
                className="song"
                onChange={this.songInput}
                value={this.state.firebaseData.song}
                />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="lyrics">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, adipisci omnis ipsum assumenda magni veniam, fuga, rerum quae incidunt voluptate sit aspernatur ipsa optio earum recusandae ducimus quas nisi quod ab. Facilis quo debitis assumenda amet, nisi optio perferendis fuga. Nesciunt quo eligendi iusto eaque est aut minus recusandae optio.</p>
          </div>
        </div>
      // </div>

    )
  }
}

export default Body;