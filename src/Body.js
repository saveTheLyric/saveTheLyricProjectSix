import React, { Component } from "react";
import Axios from "axios";
import firebase from './firebase';   


class Body extends Component {
  constructor() {
    super();
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
    .then((response) => {
      console.log(response.data.lyrics);
      const lyrics = response.data.lyrics
      this.setState({
        firebaseData: {
          artist: this.state.firebaseData.artist,
          song: this.state.firebaseData.song,
          lyrics
        }
      });
    })
  }

updatedLyrics = () => {
// reset input field
  this.setState({
    firebaseData: {
      artist: "",
      song: "",
      lyrics: ""
    }  
  })
}

  // Store firebaseData: (artist, song, lyrics) to firebase
  firebase = (event) => {
    event.preventDefault();
  
    // open portal to Firebase
    const dbRef = firebase.database().ref()

    // add new record to Firebase
    dbRef.push(this.state.firebaseData);

    // reset input field
    this.setState({
      firebaseData: {
        artist: "",
        song: "",
        lyrics: ""
      }    
    });
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

          {/* button to push to firebase */}
          {/* option 1 */}
          {/* <section className="right">
            <div className="lyrics">
              <p value={this.state.firebaseData.lyrics}>
                {this.state.firebaseData.lyrics}
              </p>
            </div>
            <div className="buttonContainer">
              <button className="saveLyrics" onClick={this.firebase}>
                Store lyrics
              </button>
            </div>
          </section> */}

          {/* option 2 */}
          <section className="right">
            <div className="lyrics">
                <form action="submit" onSubmit={this.firebase}>

                  <textarea 
                  name="plans" 
                  cols="30" 
                  rows="10" 
                  minLength="10" 
                  maxLength=""
                  onChange={this.updatedLyrics}
                  value={this.state.firebaseData.lyrics}
                  >
                    {this.state.firebaseData.lyrics}
                  </textarea>

                  <div className="buttonContainer">
                    <button className="saveLyrics">Store lyrics</button>
                  </div>

              </form>
            </div>
          </section>
        </div>
      // </div>

    );
  }
}

export default Body;