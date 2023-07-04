import './App.css';
import MainPage from './pages/MainPage';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpotifyWebApi from 'spotify-web-api-js';
import LoginSuccess from './pages/LoginSuccess';
import Login from './pages/Login';

const CLIENT_ID = "254a994ee5344359b5bc8afcf3dc603c";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
//const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/"; //dev env
const REDIRECT_URL_AFTER_LOGIN = "https://spotify-create-playlist.web.app"; //prod env
const SPACE_DELIMITER = "%20";
const topTracksIds = ['0nVpE03Iv9uioPSomEN5v0','1qFyt3Dh235Lay6tYzXH1C','5g9lS8deSIxItFBmZRC4vN','2plRom0urixt6BE8t7kOhQ','3uqinR4FCjLv28bkrTdNX5'];
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "user-top-read",
  "playlist-modify-private",
  "playlist-modify-public"
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

export const getTokenFromUrl = () => {
  return window.location.hash.substring(1).split('&').reduce((initial, item) => {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {});
}

function App() {

  const spotify = new SpotifyWebApi();
  const [, setSpotifyToken] = useState('');

  useEffect(() => {
    const _spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = "";

    if(_spotifyToken){

      setSpotifyToken(_spotifyToken);
      spotify.setAccessToken(_spotifyToken);
      localStorage.setItem('accessToken', spotify.getAccessToken());
      
      spotify.getMyTopTracks({limit : 5, time_range : 'short_term'}).then((tracks) => {
        console.log("TOP TRACKS: ", tracks.items)
        localStorage.setItem('topTracks', JSON.stringify(tracks.items))
      })

      spotify.getRecommendations({limit : 5, seed_tracks : topTracksIds}).then((tracks) => {
        console.log("RECOMMENDATION: ", tracks);
        localStorage.setItem('recommendedTracks', JSON.stringify(tracks.tracks));
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!localStorage.getItem('accessToken') ? <Login handleLogin={handleLogin}/> : <LoginSuccess />}></Route>
          <Route path="/mainPage" element={<MainPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
