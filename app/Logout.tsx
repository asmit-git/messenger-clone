"use client"
import React from 'react'

function Logout() {
    return (
        <div>
            <button onClick = {()=>console.log("hello")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Signout</button>
        </div>
    )
}

export default Logout