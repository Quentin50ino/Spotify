import { useEffect, useState } from 'react';
import '../App.css';

function RecommendTracksComponent() {

  let [recommendTracks, setRecommendTracks] = useState([]);
  const token = 'BQAmClLjDnNycgbAyh1j3F84Gm9PUYQQ_9iIy27sVghQ8mnufz8esVqwCq-KkWwjSSs_GIFocv9vAxeMrh_E0CiRQIjNZY7NXosuQs8ekL76P_bMifafyLpC2KJ8XNqMsDtGHRG7_tFtH09wugzuqetCh_5HXUIBtl7q-WJ2dLJ23OMLo6AzAN05gSh2cJGJnJODhYfYvY60a1u1d293QxezDUg9q0IrSZehOLOiP7GPSGvw1ZtjXD6x7BnCNjQc6XFiCnX7tX3rYA';
  const topTracksIds = ['0nVpE03Iv9uioPSomEN5v0','1qFyt3Dh235Lay6tYzXH1C','5g9lS8deSIxItFBmZRC4vN','2plRom0urixt6BE8t7kOhQ','3uqinR4FCjLv28bkrTdNX5'];
  
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
        return (await fetchWebApi(
            `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
            )).tracks;
    }

useEffect(() => {
    const fetchData = async () => {
        const data = await getRecommendations();
        setRecommendTracks(data);
        localStorage.setItem('recommendedTracks', JSON.stringify(data))
      }
      fetchData();
}, [])
  
  return (
    <div className="App">
      <h1>Recommended Tracks</h1>
      <p>Recommend 5 songs based on your top 5 tracks</p>
      <div>
        {recommendTracks.map(({id}) =>  
            <div><iframe src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`} width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>
        )}
      </div>
    </div>
  );
}

export default RecommendTracksComponent;
