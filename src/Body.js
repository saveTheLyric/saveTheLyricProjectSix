import React, {Component} from "react";

class Body extends Component {
  render(){
    return(

      // <div className="something">
        <div className="wrapper">
          <div className="info">
            <h1>Guess the Lyric</h1>
            {/* <img src="./assets/guessLyricsLogo.png" alt=""Guess the Lyric/> */}
            <form action="">
              <label htmlFor="artist">Artist:</label>
              <input type="text" className="artist"/>
              <label htmlFor="song">Song:</label>
              <input type="text" className="song"/>
              <button>Submit</button>
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