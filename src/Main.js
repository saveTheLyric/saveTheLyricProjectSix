//Import packages
import React, { Component } from "react";
import Axios from "axios";
import swal from 'sweetalert';
import firebase from './firebase';  

//Import components
import Spinner from './Spinner';
import Firebase from './FirebaseComponent';

//Class based component
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
    }
  }

  //Functions

  //Stores user input into state
  artistInput = (e) => {
    this.setState({
      firebaseData: {
        artist: e.target.value,
        song: this.state.firebaseData.song,
      }
    })
  }

  //Stores user input into state
  songInput = (e)=> {
    this.setState({
      firebaseData: {
        song: e.target.value,
        artist: this.state.firebaseData.artist,
      }
    })
  }

  //Axios call to get lyrics based off of user inputs in state
  getLyrics = (e) => {
    e.preventDefault();

    this.setState({
      isLoading: true
    });

    Axios.get(`https://api.lyrics.ovh/v1/${this.state.firebaseData.artist}/${this.state.firebaseData.song}`)
    .then((response) => {
      const lyrics = response.data.lyrics
      //Removes unwanted characters and splits lyrics into an array
      const splitLyrics = lyrics.replace(/\n/g, " ").replace(/\r/g, "").replace("?", " ?").replace(/\,/g, " ,").split(" ")

      this.setState({
        firebaseData: {
          artist: this.state.firebaseData.artist,
          song: this.state.firebaseData.song,
          lyrics
        },
        isLoading: false,
        splitLyrics: splitLyrics,
      });

      //Error handling for no results
      if (lyrics === "") {
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

    //Empty state after storage 
    this.setState({
      firebaseData: {
        artist: "",
        song: "",
        lyrics: ""
      },
      splitLyrics: [],
    });
  }

  handleChange = (e) => {
    this.setState({
      userGuess: e.target.value
    })
  }

  //Compares users guess against the missing lyric
  handleSubmit = (e, word) => {
    e.preventDefault()
    if (this.state.userGuess === word) {
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

              {/* Ternary to display loading animation while axios call is made */}
              {this.state.isLoading 
                ? 
                  (
                    <div className="artSpinnerBox">
                      <Spinner />
                    </div>
                  ) 
                : 
                  //Maps over lyric array and reuturns either an input field or the lyric
                  this.state.splitLyrics.map((word, index) => {
                    //starting at 10th index every 32nd word is replaced with an input field
                    for (let i = 10; i < this.state.splitLyrics.length; i+=32) {
                      if ( index === i ) {
                        return (
                        <form onSubmit={(e) => this.handleSubmit(e, word)} action="">
                          <input onChange={this.handleChange}/>
                        </form>)
                      }
                    }
                    //if not returning a input field the lyric is displayed with a space
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