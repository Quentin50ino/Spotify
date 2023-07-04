import { useState } from 'react';
import '../App.css';
import RecommendTracksComponent from '../components/RecommendTracksComponent';
import TopTracksComponent from '../components/TopTracksComponent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';

function MainPage() {
  const token = localStorage.getItem("accessToken")
  let [playlistId, setPlaylistId] = useState('');
  let [modalShow, setModalShow] = useState(false);
  let [playlistName, setPlaylistName] = useState('');
  let [playlistDescription, setPlaylistDescription] = useState('');
  const navigate = useNavigate();
  
  function handlePlaylistName(event){
    setPlaylistName(event.target.value);
  }
  
  function handlePlaylistDescription(event){
    setPlaylistDescription(event.target.value);
  }
  
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

  async function createPlaylist(){
    let tracksUri = [];
    const { id: user_id } = await fetchWebApi('v1/me', 'GET')
    const playlist = await fetchWebApi(
      `v1/users/${user_id}/playlists`, 'POST', {
      "name": playlistName,
      "description": playlistDescription,
      "public": false
    })
    // eslint-disable-next-line array-callback-return
    JSON.parse(localStorage.getItem('topTracks')).map((track) => {
      tracksUri.push('spotify:track:' + track.id);
    })
    // eslint-disable-next-line array-callback-return
    JSON.parse(localStorage.getItem('recommendedTracks')).map((track) => {
      tracksUri.push('spotify:track:' + track.id);
    })
    await fetchWebApi(
      `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
      'POST'
      );
    setPlaylistName('')
    setPlaylistDescription('')
    setPlaylistId(playlist.id);
    setModalShow(false);
    return playlist;
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('topTracks');
    localStorage.removeItem('recommendedTracks');
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="App">
      <div style={{display : 'flex' , justifyContent : 'flex-end', paddingRight : '80px', cursor : 'pointer'}} onClick={() => logout()}>
      <img width="50" height="50" src="https://img.icons8.com/external-tal-revivo-green-tal-revivo/72/external-web-secure-session-sign-out-internet-logoff-login-green-tal-revivo.png" alt="external-web-secure-session-sign-out-internet-logoff-login-green-tal-revivo"/>
      </div>
      <div><img width="200" height="200" src="https://img.icons8.com/cute-clipart/512/spotify.png" alt="spotify"/></div>
        <TopTracksComponent/>
        <RecommendTracksComponent/>
        <div>
          <Button variant="success" onClick={() => setModalShow(true)} style={{margin : '50px 0px', fontSize : '20px', padding : '20px 30px', borderRadius : '40px'}}> Create Playlist</Button>
          <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Create Playlist</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Playlist Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={(event) => handlePlaylistName(event)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Playlist Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" onChange={(event) => handlePlaylistDescription(event)}/>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button style={{fontSize : '20px', padding : '10px 30px', borderRadius : '40px'}} variant='success' onClick={() => createPlaylist()} disabled={playlistName === '' || playlistDescription === ''}>Create</Button>
              </Modal.Footer>
          </Modal>
        </div>
        {playlistId?<iframe style={{marginBottom : '50px'}} title="Spotify Embed: Recommendation Playlist " src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`} width="80%" height="740px" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" id="playlist"/>:null}
    </div>
  );
}

export default MainPage;
