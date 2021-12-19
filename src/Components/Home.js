import React, { useState } from 'react'
import { Header } from './Header'
import { auth, db } from '../Config/Config'
export const Home = ({ currentUser }) => {

  const [uname, setUname] = useState('');
  const [fname, setFname] = useState('');
  const [cnic, setCnic] = useState('');
  const [dob, setDob] = useState('');
  const [fm, setFm] = useState('');
  const [infoError, setInfoError] = useState('');
  const handleInfoSubmit = (e) => {
    e.preventDefault();
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('Details of ' + user.uid).add({
          Info: {
            Name: uname,
            FatherName: fname,
            CNIC: cnic,
            DateOfBirth: dob,
            FamilyMember: fm,
          }
        }).then(setUname(''), setFname(''), setCnic(''), setDob(''), setFm('')).catch(err => setInfoError(err.message))
      }
      else {
        console.log('user is not signed in to add info to database');
      }
    })
  }
  return (
    <div className='wrapper'>
      <Header currentUser={currentUser} />
      <br></br>
      <br></br>
      <div className='container'>
        <form autoComplete='off' className='form-group'
          onSubmit={handleInfoSubmit}>
          {currentUser && <>
            <center><h1>ADMIN PANEL </h1></center>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div style={{
              width: 100 + '%',
              display: 'flex', justifyContent: 'flex-end'
            }}>
            </div>
          </>}
        </form>
      </div>
    </div>
  )
}