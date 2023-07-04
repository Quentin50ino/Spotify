
import '../App.css';
import Button from 'react-bootstrap/Button';


function LoginSuccess(props) {
    let { handleLogin } = props;
  return (
    <div className="App">
        <img width="300" height="300" src="https://img.icons8.com/material/480/spotify--v1.png" alt="spotify--v1"/>
        <h3>Login</h3>
        <div>Before you access the application, you have to login with your personal spotify account</div>
        <div style={{marginTop : '20px'}}><Button variant='danger' onClick={handleLogin}>Login with Spotify</Button></div>
    </div>
  );
}

export default LoginSuccess;
