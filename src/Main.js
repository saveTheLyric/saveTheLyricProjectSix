import React, { Component } from "react";
import Axios from "axios";
import firebase from './firebase';  
import Spinner from './Spinner';
import Firebase from './FirebaseComponent'




class Main extends Component {
  constructor() {
    super();
    this.state = {
      firebaseData: {
        artist: "",
        song: "",
        lyrics: "",
      },
      isLoading: false
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
    this.setState({
      isLoading: true
    });

    Axios.get(`https://api.lyrics.ovh/v1/${this.state.firebaseData.artist}/${this.state.firebaseData.song}`)
    .then((response) => {
      // console.log(response.data.lyrics);
      const lyrics = response.data.lyrics
      this.setState({
        firebaseData: {
          artist: this.state.firebaseData.artist,
          song: this.state.firebaseData.song,
          lyrics
        },
        isLoading: false
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
      <main>
        <div className="wrapper mainContainer">
        {/* Left */}
          <section className="left">
            <div className="findLyrics">
              <h3>Test your knowledge!</h3>
              <form onSubmit={this.getLyrics} action="">
                <div className="song">
                  <label htmlFor="song">Song:</label>
                  <input
                    type="text"
                    id="song"
                    className="song"
                    onChange={this.songInput}
                    value={this.state.firebaseData.song}
                  />
                </div>
                <div className="artist">
                <label htmlFor="artist">Artist:</label>
                <input
                  type="text"
                  id="artist"
                  className="artist"
                  onChange={this.artistInput}
                  value={this.state.firebaseData.artist}
                />
                </div>
                <div className="buttonContainer">
                  <button type="submit">Find the lyric</button>
                </div>
              </form>
            </div>
            <div className="myLyrics">
              <div className="logoContainer">
                <img src="./assets/myLyricsButton.jpg" alt=""></img>
              </div>
              <h3>My Lyrics</h3>
              {/* Dynamically add songs here */}
              {/* These are just placeholders */}
              
              {/* THIS IS WHERE THE FIREBASE COMPONENT IS DISPLAYED */}
              <Firebase />
        
            </div>
          </section>
          {/* Right */}
          <section className="right">
            <div className="lyrics">
              <form action="submit" onSubmit={this.firebase}>
                <textarea 
                className="lyricsContainer"
                name="plans" 
                cols="30" 
                rows="10" 
                minLength="10" 
                maxLength=""
                onChange={this.updatedLyrics}
                // value=""
                >
                    {/* {this.state.isLoading ? 
                    (
                      <div className="artSpinnerBox">
                        <Spinner />
                      </div>
                    ) 
                    : 
                    this.state.firebaseData.lyrics
                  }
                    */}
                    {this.state.firebaseData.lyrics}
                  
                  
                </textarea>
                <div className="buttonContainer">
                  <button className="saveLyrics">
                    Store lyrics
                  </button>
                </div>

              </form>
            </div>
          </section>
        </div>
      </main>
    )
  }
}
export default Main;