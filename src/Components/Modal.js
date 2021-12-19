import React,{useState} from 'react'
import { Icon } from 'react-icons-kit'
import {xCircle} from 'react-icons-kit/feather/xCircle'
import { auth, db } from '../Config/Config';

export const Modal = ({editInfoValue, editModal, updateInfoHandler}) => {

    const [editInfo,setEditInfo]=useState(editInfoValue.Info);

    const handleClose=()=>{
        editModal(null)
    }

    const handleEditInfoSubmit=(e)=>{
        e.preventDefault();
        handleClose();
        updateInfoHandler(editInfo, editInfoValue.id);
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('infos of ' + user.uid).doc(editInfoValue.id).update({
                    Info: editInfo
                })
            }
            else{
                console.log('user is not signed in to update info')
            }
        })
    }

    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='header'>
                        <div className='update-text'>
                        Update your info
                        </div>
                        <div className='close-btn'
                        onClick={handleClose}>
                            <Icon size={28} icon={xCircle}
                                style={{color: 'rgb(165, 2, 2)'}}
                            />
                        </div>
                </div>
                <div className='container-fluid'>
                    <form autoComplete="off" className='form-group'
                    onSubmit={handleEditInfoSubmit}>
                        <input type="text" className='form-control'
                            required placeholder="Update your info"
                            value={editInfo}
                            onChange={(e)=>setEditInfo(e.target.value)}
                        />
                        <br></br>
                        <button type="submit" className='btn btn-success btn-lg'>
                           UPDATE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
