
import '../App.css';
import Button from 'react-bootstrap/Button';


function Login(props) {
    let { handleLogin } = props;
  return (
    <div style={{display : 'flex', justifyContent: 'center'}}>
      <div className='vertical-center'>
          <img style={{marginBottom : '20px'}} width="300" height="300" src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/384/external-spotify-music-and-podcasts-from-record-labels-and-media-companies-logo-shadow-tal-revivo.png" alt="external-spotify-music-and-podcasts-from-record-labels-and-media-companies-logo-shadow-tal-revivo"/>
          <h3>Login</h3>
          <div>Before you can access the application, <br></br> you have to login with your personal spotify account</div>
          <div style={{marginTop : '20px'}}>
            <Button style={{fontSize : '20px', padding : '20px 30px', borderRadius : '40px'}} variant='light' onClick={handleLogin}>Login with Spotify</Button>
          </div>
      </div>
    </div>
  );
}

export default Login;
