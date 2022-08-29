import React from 'react'
import "../Styles/navbar.css"
export default function Navbar() {

  return (
    <nav>
      <div className="container-fluid bg-danger fixed-top gridapply">
        <div className='main-icon'>
          <h1 className="text-center rounded-circle bg-light text-danger px-2 my-auto my-2">e!</h1>
        </div>
        <div className='buttongroup my-auto'>
          <button> sign in</button>
          <button>Create account</button>
        </div>
      </div>
    </nav>

  )

}
