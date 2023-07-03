import { useState, useEffect } from 'react';
import '../App.css';

function TopTracksComponent() {

  let [topTracks, setTopTracks] = useState([]);
  const token = 'BQAmClLjDnNycgbAyh1j3F84Gm9PUYQQ_9iIy27sVghQ8mnufz8esVqwCq-KkWwjSSs_GIFocv9vAxeMrh_E0CiRQIjNZY7NXosuQs8ekL76P_bMifafyLpC2KJ8XNqMsDtGHRG7_tFtH09wugzuqetCh_5HXUIBtl7q-WJ2dLJ23OMLo6AzAN05gSh2cJGJnJODhYfYvY60a1u1d293QxezDUg9q0IrSZehOLOiP7GPSGvw1ZtjXD6x7BnCNjQc6XFiCnX7tX3rYA';
  
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

    async function getTopTracks(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
      return (await fetchWebApi(
        'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
      )).items;
    }
  

  useEffect(() => {
    const fetchData = async () => {
        const data = await getTopTracks();
        setTopTracks(data);
        localStorage.setItem('topTracks', JSON.stringify(data))
      }
      fetchData();
}, [])


  return (
    <div className="App">
      <h1>Top Tracks</h1>
      <p>Get your top 5 tracks from the last 30 days</p>
      <div>
        {topTracks.map(({id}) =>  
            <div><iframe src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`} width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>
        )}
      </div>
    </div>
  );
}

export default TopTracksComponent;
