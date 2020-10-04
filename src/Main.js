import Axios from "axios";
import React, { Component } from "react";

class Main extends Component {
  constructor() {
    super()
    this.state = {
      artist: "",
      song: "",
    }
  }

  //Functions

  artistInput = (e) => {
    this.setState({
      artist: e.target.value,
    })
  }

  songInput = (e)=> {
    this.setState({
      song: e.target.value,
    })
  }

  getLyrics = (e) => {
    e.preventDefault();
    Axios.get(`https://api.lyrics.ovh/v1/${this.state.artist}/${this.state.song}`)
    .then((results) => {
      console.log(results);
    })
  }

  render(){
    return(

      <main>
        <div className="wrapper">
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
                    value={this.state.song}
                  />
                </div>
                <div className="artist">
                <label htmlFor="artist">Artist:</label>
                <input
                  type="text"
                  id="artist"
                  className="artist"
                  onChange={this.artistInput}
                  value={this.state.artist}
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
              <div className="savedSongs">
                <input type="radio"/>
                <label htmlFor="radio">Song 1</label>
              </div>
              <div className="savedSongs">
                <input type="radio" />
                <label htmlFor="radio">Song 2</label>
              </div>
              <div className="savedSongs">
                <input type="radio" />
                <label htmlFor="radio">Song 3</label>
              </div>
              <div className="savedSongs">
                <input type="radio" />
                <label htmlFor="radio">Song 4</label>
              </div>
              {/* <div className="savedSongs">
                <input type="radio" />
                <label htmlFor="radio">Song 5</label>
              </div> */}
            </div>
          </section>
          {/* Right */}
          <section className="right">
            <div className="lyrics">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, adipisci omnis ipsum assumenda magni veniam, fuga, rerum quae incidunt voluptate sit aspernatur ipsa optio earum recusandae ducimus quas nisi quod ab. Facilis quo debitis assumenda amet, nisi optio perferendis fuga. Nesciunt quo eligendi iusto eaque est aut minus recusandae optio.</p>
            </div>
            <div className="buttonContainer">
              <button className="saveLyrics">
                Store lyrics
              </button>
            </div>
          </section>
        </div>
      </main>
    )
  }
}

export default Main;