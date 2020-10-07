//Import packages
import React, { Component } from "react";
import firebase from './firebase'; 
import swal from 'sweetalert';

//Class based component
class Firebase extends Component {
  constructor() {
    super()
    this.state = {
        storedFirebaseData: [
        ],
        splitLyrics: [],
        userModalGuess: ''
    }
  } 

  componentDidMount() {
    // create a Firebase reference
    const dbRef = firebase.database().ref();
    // listen to the value change and use `response` as the db value
    dbRef.on('value', (response) => {
      // clean up data from Firebase and store in state
        const storedFirebaseData = [];
        const data = response.val();

        for(let key in data) {
          storedFirebaseData.push({
            key: key, 
            artistSongLyrics: data[key]
          });  
        }

        this.setState({
            storedFirebaseData
        });
    });
  }

  saveLyrics = () => {
    this.state.storedFirebaseData.map((data, index) => {
      const savedSong = data.artistSongLyrics.song
      const savedArtist = data.artistSongLyrics.artist
      const savedLyrics = data.artistSongLyrics.lyrics
    })
  }

  displayLyrics = (lyrics) => {
    const splitLyrics = lyrics.replace(/\n/g, " ").replace(/\r/g, "").replace("?", " ?").replace(/\,/g, " ,").split(" ")
    this.setState({
      splitLyrics
    });
  }   

  handleRemove = (dataKey) => {
    // Open portal to Firebase
    const dbRef = firebase.database().ref();
    // Remove data stored in key
    dbRef.child(dataKey).remove(); 
  }
    
  check = (e) => {
    this.setState({
      userModalGuess: e.target.value
    })
  }

  handleModalSubmit = (e, word) => {
    e.preventDefault()
    if (this.state.userModalGuess === word) {
      swal({
        title: "Good job!",
        text: "On to the next!",
        icon: "success",
        button: "Let's Go!",
      });
    } else  {
      swal({
        title: "OOPS!",
        text: "Incorrect word!",
        icon: "error",
        button: "Try again!",
      });
    }
  }

  render() {
    return (
      <>
        {this.state.storedFirebaseData.map((data, index) => {
          return (
            <div className="allSavedSongs">
              <div className="savedSongs" key={index}>
                <button props={data.artistSongLyrics.lyrics}  onClick={() => this.displayLyrics(data.artistSongLyrics.lyrics)}>
                  {data.artistSongLyrics.artist.toUpperCase()} - {data.artistSongLyrics.song.toUpperCase()}
                </button>
                    
                <button 
                  onClick={() => this.handleRemove(data.key)}
                  className="">
                </button>
              </div>
            </div>
          )
        })}
        <div>
          {this.state.splitLyrics.map((word, index) => {
            const hide = this.state.splitLyrics;
            for (let i = 10; i < hide.length; i+=32) {
              if ( index === i ) {
              return (
              <form onSubmit={(e) => this.handleModalSubmit(e, word)} action="">
                <input word={word} onChange={this.check}/>
              </form>)
              }
            }
            return word + " "
          })}
        </div>
      </>
    );
  }  
}

export default Firebase;