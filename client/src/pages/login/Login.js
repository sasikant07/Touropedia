import React, {useState, useEffect} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBInput,
  MDBBtn,
  MDBValidation,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {GoogleLogin} from 'react-google-login';
import './Login.css';
import { googleSignIn, login } from '../../redux/features/authSlice';

const initialState = {
  email: "",
  password: ""
}

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const {loading, error} = useSelector(state => ({...state.auth}));
  const {email, password} = formValue;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({formValue, navigate, toast}));
    }
  }

  const onInputChange = (e) => {
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  }

  const googleSuccess = (resp) => {
    const email = resp?.profileObj?.email;
    const name = resp?.profileObj?.name;
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const result = {email, name, token, googleId}
    dispatch(googleSignIn({result, navigate, toast}));
  }

  const googleFailure = (error) => {
    toast.error(error);
  }

  return (
    <div className="container col-md-4">
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-4x mt-4" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBValidationItem feedback="Please provide your email" invalid>
                <MDBInput
                  label="Email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={onInputChange}
                  required
                  />
                </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem feedback="Please provide your password" invalid>
                <MDBInput
                  label="Password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  required
                  />
                </MDBValidationItem>
            </div>
            <div className="col-12">
              <MDBBtn className="mt-2 login-btn">
                {loading && (
                  <MDBSpinner 
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br/>
          <GoogleLogin
            clientId="543352486074-a4mjrof9212oifpdiq6k4buasb4lmsek.apps.googleusercontent.com"     // to be added...
            render={(renderProps) => (
              <MDBBtn 
                className="google-signin-btn"
                color="danger"
                onClick={renderProps.onClick} 
              >
                <MDBIcon className="me-2" fab icon="google"/> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}

export default Login;