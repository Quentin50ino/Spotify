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
    
  async function getRecommendations(){
      let topTracksIds = [];
      // eslint-disable-next-line array-callback-return
      JSON.parse(localStorage.getItem('topTracks')).map((track) => {
        topTracksIds.push(track.id)
      })
      return (await fetchWebApi(
          `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
      )).tracks;
    }

    const fetchData = async () => {
      setIsLoading(true);
      const data = await getRecommendations();
      setRecommendTracks(data);
      localStorage.setItem('recommendedTracks', JSON.stringify(data));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
      };
      setRecommendTracks(JSON.parse(localStorage.getItem('recommendedTracks')));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, [])
  
  return (
      <div className="App">
      <h1>Recommended Tracks</h1>
      <p>Recommend 5 songs based on your top 5 tracks</p>
      <div style={{cursor : 'pointer', marginBottom : '30px'}} onClick={() => fetchData()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
      </div>
      {!isLoading?<div>
        {recommendTracks.map(({id}) =>  
            <div><iframe title="Recommended tracks" src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`} width="80%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>
        )}
      </div>:<div><Spinner animation="border" style={{color : '#1DB954'}}/></div>}
    </div>
  );
}

export default RecommendTracksComponent;
