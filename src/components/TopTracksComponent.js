import { useState, useEffect } from 'react';
import '../App.css';

function TopTracksComponent() {

  let [topTracks, setTopTracks] = useState([]);
  let [token, setToken] = useState('');
  //const token = "BQCbaktkY2tcpOMBVn81A5XnjQqUVSFrkp5S3D8radus0-B3IqeCPA5XfctuPAmL1nLYIeyFSRZCTJ8HX98oTFKnvXrIaBd75qLpo4mYJYTMIw7FX1UImSRpcr-FeKs9MhXmu7MKIGFMyZIKlsaoXYVj-CZMV0DTl_6TROIV4r-LkHtDBcfOvKzOufFLv0HKuo2Q1lHp_dA";
  console.log("TOKENN: ", token)

    /*async function fetchWebApi(endpoint, method, body) {
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
        'v1/me/top/tracks?time_range=short_term&limit=10', 'GET'
      )).items;
    }*/
  

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    };
    const fetchData = async () => {
        //const data = await getTopTracks();
        
        setTopTracks(JSON.parse(localStorage.getItem('topTracks')));
        //localStorage.setItem('topTracks', JSON.stringify(data))
      }
      fetchData();
}, [])


  return (
    <div className="App">
      <h1>Your Top Tracks</h1>
      <p>Get your top 5 tracks from the last 30 days</p>
      <div>
        {topTracks.map(({id}) =>  
            <div><iframe src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`} width="80%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>
        )}
      </div>
    </div>
  );
}

export default TopTracksComponent;
