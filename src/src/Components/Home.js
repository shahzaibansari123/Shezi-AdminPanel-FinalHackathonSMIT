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
            <center><h1>USER PANEL </h1></center>
            <input type="text" placeholder="Enter Full Name"
              className='form-control' required
              onChange={(e) => setUname(e.target.value)}
              value={uname}
            />
            <br></br>
            <input type="text" placeholder="Enter Father Name"
              className='form-control' required
              onChange={(e) => setFname(e.target.value)}
              value={fname}
            />
            <br></br>
            <input type="number" placeholder="Enter CNIC"
              className='form-control' required
              onChange={(e) => setCnic(e.target.value)}
              value={cnic}
            />
            <br></br>
            <input type="date" placeholder="Enter DOB"
              className='form-control' required
              onChange={(e) => setDob(e.target.value)}
              value={dob}
            />
            <br></br>
            <input type="number" placeholder="Enter Family Member"
              className='form-control' required
              onChange={(e) => setFm(e.target.value)}
              value={fm}
            />
            <br></br>
            <div style={{
              width: 100 + '%',
              display: 'flex', justifyContent: 'flex-end'
            }}>
              <button type="submit" className='btn btn-success'
                style={{ width: 100 + '%' }} onClick={() => { alert('your request has been sent') }}>
                make a request
              </button>
            </div>
          </>}
        </form>
      </div>
    </div>
  )
}