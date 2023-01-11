import React, {useState, useEffect} from "react";
import './App.css';
import axios from "axios";

function App() {

  const [movieName, setMovieName] = useState("")
  const [review, setReview] = useState("")
  const [movieReviewList, setMovieList] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:3001/api/get").then((response)=>{
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () =>{
    axios.post("http://localhost:3001/api/insert", {
      movieName: movieName, 
      movieReview: review,
    }).then(()=>{
      alert("successful insert")
    });
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className='form'>
        <label htmlFor="movieName">Movie Name</label>
        <input type="text" name='movieName' onChange={(e)=>{
          setMovieName(e.target.value);
        }}/>
        <label htmlFor="review">Review</label>
        <input type="text" name='review' onChange={(e)=>{
          setReview(e.target.value);
        }}/>

        <button onClick={submitReview}>Submit</button>
      </div>

      {movieReviewList.map((val)=>{
        return <h3>Movie Name: {val.movieName} | Movie Review: {val.movieReview}</h3>
      })}
    </div>
  );
}

export default App;
