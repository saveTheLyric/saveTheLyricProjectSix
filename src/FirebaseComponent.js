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
            console.log(storedFirebaseData)
            this.setState({
                storedFirebaseData: storedFirebaseData
            });
        
        });
    }

    render() {
        return (
            <>
                <div>
                    {this.state.storedFirebaseData.map((data, index) => {
                        {console.log(data)}
                        return (
                            <>
                                <h2>{data.artistSongLyrics.artist.toUpperCase()} - {data.artistSongLyrics.song.toUpperCase()}</h2>
                                <p>{data.artistSongLyrics.lyrics}</p>
                            </>
                        )
                    })}
                </div>
            </>
        );
    }  
}

export default Firebase;