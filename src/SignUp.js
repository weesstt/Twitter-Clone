import React from 'react'
import "./SignUp.css"
import SignUpBox from "./SignUpBox.js"
import TwitterIcon from '@mui/icons-material/Twitter';

function SignUp(){
  return (
    <div className='signup'>
        <TwitterIcon className='twitter__icon'/>
        <SignUpBox />
    </div>
  )
}

export default SignUp