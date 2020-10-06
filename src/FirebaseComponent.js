import React, { Component } from "react";
import firebase from './firebase'; 

class Firebase extends Component {
    constructor() {
        super()
        this.state = {
            storedFirebaseData: [],
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
            // console.log(storedFirebaseData)
            this.setState({
                storedFirebaseData
            });
        
        });
    }

    displayLyrics = () => {
        // add modal functions eres to display modal of artist song lyrics
    }

    handleRemove = (dataKey) => {
        // Open portal to Firebase
        const dbRef = firebase.database().ref();
        // Remove data stored in key
        dbRef.child(dataKey).remove(); 
    }

    render() {
        return (
            <>
                {this.state.storedFirebaseData.map((data, index) => {
                    // {console.log(data)}
                    return (
                        <div className="allSavedSongs">
                            <div className="savedSongs" key={index}>
                                <button onClick={this.displayLyrics}>
                                    {data.artistSongLyrics.artist.toUpperCase()} - {data.artistSongLyrics.song.toUpperCase()}
                                </button>

                                <button 
                                    onClick={() => this.handleRemove(data.key)}
                                    className="">\
                                </button>
                            </div>
                        </div>
                    )
                })}
            </>
        );
    }  
}

export default Firebase;