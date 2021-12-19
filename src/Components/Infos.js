import React from 'react'
import { IndividualInfo } from './IndividualInfo'

export const Infos = ({infos, deleteInfo, editModal}) => {
    return infos.map((individualInfo)=>(
        <IndividualInfo individualInfo={individualInfo} 
        key={individualInfo.id} deleteInfo={deleteInfo}
            editModal={editModal}
        />
    ))
}
