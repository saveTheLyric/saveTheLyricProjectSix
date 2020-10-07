import React from "react";

const Lyric = (props) => {
    return (
        //Maps over the split lyrics array and either creates an input or returns the word in the array
        
        props.lyrics.map((word, index) => {
            const hide = props.lyrics;
            // let i = '';
            for (let i = 10; i < hide.length; i+=32) {
                // if the value in the string is empty
                // if (i === "") {
                // i = i++
                // }
                if ( index === i ) {
                return (
                <form onSubmit={(e) => props.submit(e, word)} action="">
                    <input word={word} onChange={props.change}/>
                </form>)
                }
            }
            return word + " "
            })
    )
}

export default Lyric;