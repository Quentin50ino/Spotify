import { useState } from 'react';
import '../App.css';
import RecommendTracksComponent from '../components/RecommendTracksComponent';
import TopTracksComponent from '../components/TopTracksComponent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function MainPage() {
    // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAmClLjDnNycgbAyh1j3F84Gm9PUYQQ_9iIy27sVghQ8mnufz8esVqwCq-KkWwjSSs_GIFocv9vAxeMrh_E0CiRQIjNZY7NXosuQs8ekL76P_bMifafyLpC2KJ8XNqMsDtGHRG7_tFtH09wugzuqetCh_5HXUIBtl7q-WJ2dLJ23OMLo6AzAN05gSh2cJGJnJODhYfYvY60a1u1d293QxezDUg9q0IrSZehOLOiP7GPSGvw1ZtjXD6x7BnCNjQc6XFiCnX7tX3rYA';
let [playlistId, setPlaylistId] = useState('');
let [modalShow, setModalShow] = useState(false);
let [playlistName, setPlaylistName] = useState('');
let [playlistDescription, setPlaylistDescription] = useState('');

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

  JSON.parse(localStorage.getItem('topTracks')).map((track) => {
    tracksUri.push('spotify:track:' + track.id);
})
JSON.parse(localStorage.getItem('recommendedTracks')).map((track) => {
    tracksUri.push('spotify:track:' + track.id);
})
  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  setPlaylistId(playlist.id);
  setModalShow(false);
  return playlist;
}

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Playlist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Playlist Name</Form.Label>
        <Form.Control type="text" placeholder="Name" onChange={() => handlePlaylistName()}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Playlist Description</Form.Label>
        <Form.Control type="text" placeholder="Description" onChange={() => handlePlaylistDescription()}/>
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createPlaylist()} disabled={playlistName === '' || playlistDescription === ''}>Create</Button>
        </Modal.Footer>
      </Modal>
    );
}

  return (
    <div className="App">
        <TopTracksComponent/>
        <RecommendTracksComponent/>
        <div>
            <Button variant="primary" onClick={() => setModalShow(true)}>Create Playlist</Button>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
        

{playlistId?<iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
  width="100%"
  height="500px"
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>:null}
    </div>
  );
}

export default MainPage;
