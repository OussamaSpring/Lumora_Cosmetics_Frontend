import Field from "../../component/Field/Field";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Login.css';

export default function Login() {
  return (
    <div className="LoginPage">
      <div className="Login">
      <div className="box">
        <div className="header">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5Zm0 3.9a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0 7.9c2 0 6 1.09 6 3.08a7.2 7.2 0 0 1-12 0c0-1.99 4-3.08 6-3.08"/>
            </svg>
          </div>
          <h3>Admin</h3>
        </div>
        <div className="inputBox">
          <div className="fieldBox">
            <Field type='email' textLabel='Email' fontSize="0.8em" height="40px" width="100%" labelFontSize="0.75em" focusColor="#0B307D"/>
            <Field type='password' textLabel='Password' fontSize="0.8em" height="40px" width="100%" labelFontSize="0.75em" focusColor="#0B307D"/>
          </div>
          <p>Do you forget your <span>password?</span></p>
        </div>
        <Button variant="contained" sx={{ backgroundColor: "#0B307D", width: "100%", height:"40px"}}>LOGIN</Button>
      </div>
    </div>
    </div>
    
  );
}


