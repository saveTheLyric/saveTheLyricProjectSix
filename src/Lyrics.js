import React from "react";
const Lyric = (props) => {
  return (
    //Maps over the split lyrics array and either creates an input or returns the word in the array
    props.lyrics.map((word, index) => {
      const replacedWord = props.lyrics;
      for (let i = 10; i < replacedWord.length; i += props.difficulty) {
        if (word === "," || word === "!" || word === "" || word === "." || word === "?") {
          return
        }
        if (index === i) {
          word = word.toLowerCase();
          return (
            <form key={index} onSubmit={(e) => props.submit(e, word)} action="">
              <input word={word} onChange={props.change} />
            </form>
          )
        }
      }
      return word + " "
    })
  )
}
export default Lyric;