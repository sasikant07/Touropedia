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
import './Register.css';
import { register } from '../../redux/features/authSlice';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const {loading, error} = useSelector(state => ({...state.auth}));
  const {firstName, lastName, email, password, confirmPassword} = formValue;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwod and Confirm Password doesn't match!")
    }

    if (firstName && lastName && email && password && confirmPassword) {
      dispatch(register({formValue, navigate, toast}));
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
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBValidationItem feedback="First Name is required" invalid>
                <MDBInput
                  label="First Name"
                  type="text"
                  value={firstName}
                  name="firstName"
                  onChange={onInputChange}
                  required
                  />
                </MDBValidationItem>
            </div>
            <div className="col-md-6">
              <MDBValidationItem feedback="Last Name is required" invalid>
                <MDBInput
                  label="Last Name"
                  type="text"
                  value={lastName}
                  name="lastName"
                  onChange={onInputChange}
                  required
                  />
                </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem feedback="Please provide your Email" invalid>
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
              <MDBValidationItem feedback="Please provide Password" invalid>
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
            <div className="col-md-12">
              <MDBValidationItem feedback="Please provide Confirm Password" invalid>
                <MDBInput
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={onInputChange}
                  required
                  />
                </MDBValidationItem>
            </div>
            <div className="col-12">
              <MDBBtn className="mt-2 register-btn">
                {loading && (
                  <MDBSpinner 
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}

export default Register;