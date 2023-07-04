
import { useNavigate } from 'react-router';
import '../App.css';
import Button from 'react-bootstrap/Button';


function LoginSuccess() {
    let navigate = useNavigate();
  return (
    <div className="App">
        <img width="300" height="300" src="https://img.icons8.com/cute-clipart/512/spotify.png" alt="spotify"/>
        <h3>Login Success</h3>
        <div>Welcome inside the spotify create playlist app!</div>
        <div style={{marginTop : '20px'}}><Button variant='success' onClick={() => navigate('/mainPage')}>Go To App</Button></div>
    </div>
  );
}

export default LoginSuccess;
