import React, { Component } from "react";
import Axios from "axios";
import firebase from './firebase';  
import Spinner from './Spinner';

import Firebase from './FirebaseComponent';
import swal from 'sweetalert';

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

      userGuess: '',
      wordToGuess: ''
    }
    // console.log(this.state.hideIndex);
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
      console.log(response)


      console.log(response)
      

      const lyrics = response.data.lyrics
      const splitLyrics = lyrics.replace(/\n/g, " ").replace(/\r/g, "").replace("?", " ?").replace(/\,/g, " ,").split(" ")
      console.log(splitLyrics)
      this.setState({
        firebaseData: {
          artist: this.state.firebaseData.artist,
          song: this.state.firebaseData.song,
          lyrics
        },
        isLoading: false,
        splitLyrics: splitLyrics,

      });
          if (lyrics === "") {
            console.log('okokokok')
            swal({
              title: "Try again!",
              icon: "error",
              button: "OK",
            });
          }
    })
  }

  // Remove Saved Song
  handleRemove = (dataKey) => {
    // Open portal to Firebase
    const dbRef = firebase.database().ref();
    // Remove data stored in key
    dbRef.child(dataKey).remove(); 
  }
  
  // Store firebaseData: (artist, song, lyrics) to firebase
  firebase = (event) => {
    event.preventDefault();

    if (this.state.firebaseData.lyrics === "") {
      console.log('test')
      swal({
        title: "Try again!",
        text: "There is no lyrics to save",
        icon: "error",
        button: "OK",
      })
    } else if (this.state.lyrics !== "") {
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
    this.setState({
      firebaseData: {
        artist: "",
        song: "",
        lyrics: ""
      },
      splitLyrics: [],
    });
  }

  test = (e) => {
    this.setState({
      userGuess: e.target.value
    })
  }

  handleSubmit = (e, word) => {
    e.preventDefault()
    if (this.state.userGuess === word) {
      // console.log(word)
      swal({
        title: "Good job!",
        text: "On to the next!",
        icon: "success",
        button: "Let's Go!",
      })
    } else  {
      swal({
        title: "OOPS!",
        text: "Incorrect word!",
        icon: "error",
        button: "Try again!",
      });
    }
  }

  // displayLyrics = () => {
  //   console.log('okokok')
  // }

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
                    required
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
                required
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
            <form action="">
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
                          const hide = this.state.splitLyrics;
                          // let i = '';
                          for (let i = 10; i < hide.length; i+=32) {
                            // if the value in the string is empty
                            // if (i === "") {
                              // i = i++
                            // }
                            if ( index === i ) {
                              return (
                              <form onSubmit={(e) => this.handleSubmit(e, word)} action="">
                                <input word={word} onChange={this.test}/>
                              </form>)
                            }
                          }
                          return word + " "
                        })
                }
  
              </div>
  
              <div className="buttonContainer">
                <button onClick={this.firebase} className="saveLyrics">
                  Store lyrics
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    )
  }
}
export default Main;