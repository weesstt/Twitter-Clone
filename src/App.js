import './App.css';
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import React, {useState} from 'react';
import Widgets from "./Widgets";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase.js'
import SignUp from './SignUp'

function App() {
  const [authorized, setAuthorized] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if(user){
      setAuthorized(true);
    }else{
      setAuthorized(false);
    }
  })


  return (
    <>
    {authorized && <div className="app">

    {/* {Sidebar} */}
    <Sidebar />

    {/* {Feed} */}
    <Feed/>

    {/* {Widgets} */}
    <Widgets />

    </div>}

    {!authorized && <div>
      <SignUp />
    </div>}
    </>
  );
}

export default App;
