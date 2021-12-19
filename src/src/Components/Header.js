import React from 'react'
import applogo from '../Images/LogoKhanaSabkliye-01.png'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'

export const Header = ({ currentUser }) => {
    const handleLogout = () => {
        auth.signOut().then(() => {
            window.location.reload();
        });
    }
    return (
        <div className='header-box'>
            <div className='leftside'>
                <div className='img'>
                    <img src={applogo} alt="applogo" />
                </div>
                <div className='content'>
                    <div className='heading-big'>
                        A Project of Saylani Welfare Trust
                    </div>
                </div>
            </div>
            <div className='rightside'>
                {!currentUser && <>
                    <Link className='btn btn-primary btn-md' style={{ width: "200px", backgroundColor: "green" }} to="signup">
                        SIGN UP
                    </Link>
                    <Link className='btn btn-primary btn-md' style={{ width: "200px ", backgroundColor: "green" }} to="login">
                        LOGIN
                    </Link>
                    <Link style={{ width: "200px " }} to="">
                        LOGIN as  a Branch Manager
                    </Link>
                    <br></br>
                </>}
                {currentUser && <div className='welcome-div'>
                    <h2>WELCOME</h2>
                    <h5>{currentUser}</h5>
                    <br></br>
                    <br></br>
                    <button className='btn btn-danger'
                        onClick={handleLogout}>LOGOUT</button>
                </div>}
            </div>
        </div>
    )
}
