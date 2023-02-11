import React,{useState} from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../redux/features/authSlice';

const Header = () => {
    const [show, setShow] = useState(false);
    const {user} = useSelector((state) => ({...state.auth}));

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
    }

    return (
        <MDBNavbar fixed='top' expand='lg' className="header-navbar">
            <MDBContainer className="navbar-container">
                <MDBNavbarBrand href="/" className="brand">
                    Tourpedia
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    className='navbar-toggler'
                    type='button'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShow(!show)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        {user?.result?._id && (
                            <h5 className="logged-in-user">Welcome! {user?.result?.name}</h5>
                        )}
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/'>
                                <p className="header-text">Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/addTour'>
                                        <p className="header-text">Add Tour</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/dashboard'>
                                        <p className="header-text">Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                        {user?.result?._id ? (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/login'>
                                    <p className="header-text" onClick={handleLogout}>Logout</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/login'>
                                    <p className="header-text">Login</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Header;