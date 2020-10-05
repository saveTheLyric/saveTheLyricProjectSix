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
      isLoading: false,
      splitLyrics: [],
      hideIndex: [4], //when mapping splitLyrics compares each index to this number. We need it to compare several numbers in here
                      //for example if hideIndex: [4, 8, 10, 22, 34, 89, 99, 102, 119, 136]. How do we compare the mapped over index to each number
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
      const lyrics = response.data.lyrics
      const splitLyrics = lyrics.split(" ")
      this.setState({
        firebaseData: {
          artist: this.state.firebaseData.artist,
          song: this.state.firebaseData.song,
          lyrics
        },
        isLoading: false,
        splitLyrics: splitLyrics,
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
      },
      isLoading: false,
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
              {/* THIS IS WHERE THE FIREBASE COMPONENT IS DISPLAYED */}
              <Firebase />
            </div>
          </section>
          {/* Right */}
          <section className="right">
            <div className="lyrics">
              {this.state.isLoading ? 
                    (
                      <div className="artSpinnerBox">
                        <Spinner />
                      </div>
                    ) 
                    : 
                      //Maps over the split lyrics array and either creates an input or returns the word in the array
                      //to figure out:
                      //how to compare the index to multiple hideIndex
                      //how to compare the users input word with the missing lyric
                      this.state.splitLyrics.map((word, index) => {
                        const hide = this.state.hideIndex;
                        if (index === hide[0] ) {
                          return (<input />)
                        }
                        return word + " "
                      })
                  }
                
                    


                <div className="buttonContainer">
                  <button className="saveLyrics">
                    Store lyrics
                  </button>
                </div>
            </div>
          </section>
        </div>
      </main>
    )
  }
}
export default Main;