import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context";
import "../../App.js";

const Search = () => {
  const [state, setState] = useContext(Context);
  const [userInput, setUserInput] = useState("");
  const [trackTitle, setTrackTitle] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=3&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        let track_list = res.data.message.body.track_list;
        setState({ track_list: track_list, heading: "Search Results" });
      })
      .catch(err => console.log(err));
  }, [trackTitle]);

  const findTrack = e => {
    e.preventDefault();
    setTrackTitle(userInput);
  };

  const onChange = e => {
    setUserInput(e.target.value);
  };

  return (
    <div className="card card-body mb-6 bg-dark p-8">
      <h1 className="display-4 text-white  text-center">
       <i className="fas fa-music text-muted text-white" /> Search For A Song       
      </h1>
      <p className="lead text-center text-primary p-4"><strong>Create the app using Reactjs with Bootstrap ...</strong></p>
      <form onSubmit={findTrack}>
        <div className="form-group">
          <input
            type="text"
            className=" f1 text-light bg-dark form-control form-control-lg"
            placeholder="Song title..."
            name="userInput"
            value={userInput}
            onChange={onChange}
          />
        </div>
        <button className="btn btn-primary btn-lg btn-block mb-5 text-white " type="submit">
          Get Track Lyrics
        </button>
      </form>
    </div>
  );
};

export default Search;
