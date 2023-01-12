import React, {useState, useEffect} from "react";
import './App.css';
import axios from "axios";

function App() {

  const [movieName, setMovieName] = useState("")
  const [review, setReview] = useState("")
  const [movieReviewList, setMovieList] = useState([])

  const [newReview, setNewReview] = useState("")

  useEffect(()=>{
    axios.get("http://localhost:3001/api/get").then((response)=>{
      setMovieList(response.data);
    });
  }, []);

  const submitReview = (event) =>{
    axios.post("http://localhost:3001/api/insert", {
      movieName: movieName, 
      movieReview: review,
    });
    setMovieList([
      ...movieReviewList, 
      {movieName:movieName, movieReview:review,}
    ]);
    event.target.reset();
  };

  const deleteReview = (movie) =>{
    axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) =>{
    axios.put("http://localhost:3001/api/update",{
      movieName: movie, 
      movieReview: newReview,
    });
    setNewReview('');
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className='form'>
        <div className="box">
          <div className="label">
            <label htmlFor="movieName">Movie Name</label>
            <input type="text" name='movieName' onChange={(e)=>{
              setMovieName(e.target.value);
            }}/>
          </div>
          <div className="label">
            <label htmlFor="review">Review</label>
            <input type="text" name='review' onChange={(e)=>{
              setReview(e.target.value);
            }}/>
          </div>
          <button onClick={submitReview}>Submit</button>
          {movieReviewList.map((val)=>{
            return (
              
                <div className="card" key={val.id}>
                  <h3 >{val.movieName}</h3>
                  <p>{val.movieReview}</p>

                  <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button><br />
                  <input type="text" onChange={(e)=>{
                      setNewReview(e.target.value);
                    }}/>
                  <button onClick={()=>{updateReview(val.movieName)}}>Update</button>
                </div>
            
            );
          })} </div>
      </div>
    </div>
  );
}

export default App;
