import { useEffect, useState } from 'react';
import '../App.css';
import Spinner from 'react-bootstrap/Spinner';

function RecommendTracksComponent() {

  let [recommendTracks, setRecommendTracks] = useState([]);
  let [token, setToken] = useState('');
  let [isLoading, setIsLoading] = useState(true);
  
  async function fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
            body:JSON.stringify(body)
      });
      return await res.json();
  }
    
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
      };
      setRecommendTracks(JSON.parse(localStorage.getItem('topSavedTracks')));
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, [])
  
  return (
      <div className="App">
      <h1>Recommended Tracks</h1>
      <p>Top 5 of your saved tracks</p>
      {!isLoading?<div>
        {recommendTracks?.map(({track}) => {
      return (
        <div key={track.id}>
          <iframe
            title="Recommended tracks"
            src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
            width="80%"
            height="152"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      );
    })}
      </div>:<div><Spinner animation="border" style={{color : '#1DB954'}}/></div>}
    </div>
  );
}

export default RecommendTracksComponent;
