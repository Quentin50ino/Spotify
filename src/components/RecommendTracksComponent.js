import { useEffect, useState } from 'react';
import '../App.css';

function RecommendTracksComponent() {

  let [recommendTracks, setRecommendTracks] = useState([]);
  let [token, setToken] = useState('');
  //const token = "BQCbaktkY2tcpOMBVn81A5XnjQqUVSFrkp5S3D8radus0-B3IqeCPA5XfctuPAmL1nLYIeyFSRZCTJ8HX98oTFKnvXrIaBd75qLpo4mYJYTMIw7FX1UImSRpcr-FeKs9MhXmu7MKIGFMyZIKlsaoXYVj-CZMV0DTl_6TROIV4r-LkHtDBcfOvKzOufFLv0HKuo2Q1lHp_dA";
  //const topTracksIds = ['0nVpE03Iv9uioPSomEN5v0','1qFyt3Dh235Lay6tYzXH1C','5g9lS8deSIxItFBmZRC4vN','2plRom0urixt6BE8t7kOhQ','3uqinR4FCjLv28bkrTdNX5'];
  
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
  JSON.parse(localStorage.getItem('topTracks')).map((track) => {
    topTracksIds.push(track.id)
  })
        return (await fetchWebApi(
            `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
            )).tracks;
    }

    const fetchData = async () => {
      const data = await getRecommendations();
      setRecommendTracks(data);
      localStorage.setItem('recommendedTracks', JSON.stringify(data))
    }

useEffect(() => {
  if (localStorage.getItem("accessToken")) {
    setToken(localStorage.getItem("accessToken"));
  };
  setRecommendTracks(JSON.parse(localStorage.getItem('recommendedTracks')));
      //fetchData();
}, [])
  
  return (
    <div className="App">
      <h1>Recommended Tracks</h1>
      <p>Recommend 5 songs based on your top 5 tracks</p>
      <div style={{cursor : 'pointer', marginBottom : '30px'}} onClick={() => fetchData()}><img width="50" height="50" src="https://img.icons8.com/material-rounded/96/000000/refresh.png" alt="refresh"/></div>
      <div>
        {recommendTracks.map(({id}) =>  
            <div><iframe src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`} width="80%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>
        )}
      </div>
    </div>
  );
}

export default RecommendTracksComponent;
