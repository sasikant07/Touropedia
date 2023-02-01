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
import './Login.css';
import { login } from '../../redux/features/authSlice';

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