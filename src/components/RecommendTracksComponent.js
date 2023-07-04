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
      <div style={{cursor : 'pointer', marginBottom : '30px'}} onClick={() => fetchData()}><img width="50" height="50" src="https://img.icons8.com/color-glass/96/available-updates.png" alt="available-updates"/></div>
      {!isLoading?<div>
        {recommendTracks.map(({id}) =>  
            <div><iframe title="Recommended tracks" src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`} width="80%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>
        )}
      </div>:<div><Spinner animation="border" variant="success" /></div>}
    </div>
  );
}

export default RecommendTracksComponent;
