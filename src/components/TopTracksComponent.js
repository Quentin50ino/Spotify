import { useState, useEffect } from 'react';
import '../App.css';
import Spinner from 'react-bootstrap/Spinner';

function TopTracksComponent() {

  let [topTracks, setTopTracks] = useState([]);
  let [ ,setToken] = useState('');
  let [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    };
    const fetchData = async () => {
        setTopTracks(JSON.parse(localStorage.getItem('topTracks')));
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
      fetchData();
}, [])


  return (
    <div className="App">
      <h1>Your Top Tracks</h1>
      <p style={{marginBottom : '30px'}}>Get your top 5 tracks from the last 30 days</p>
      {!isLoading?<div>
        {topTracks.map(({id}) =>  
            <div><iframe title="Top 5 tracks" src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`} width="80%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>
        )}
      </div>:<div><Spinner animation="border" style={{color : '#1DB954'}} /></div>}
    </div>
  );
}

export default TopTracksComponent;
