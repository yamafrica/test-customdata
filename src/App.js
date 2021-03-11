import React, { useEffect } from 'react'
import * as Realm from "realm-web";
import './App.css';

const REALM_APP_ID = '...'
const USER_EMAIL = '...'
const USER_PASSWORD = '...'

const app = new Realm.App({ id: REALM_APP_ID });


function App() {
  const [user, setUser] = React.useState(app.currentUser);

  useEffect(() => {
    const doEffect = async () => {
      await user.refreshCustomData()

      console.log('refreshed custom data', user.customData, app.currentUser.customData)
    }

    if (user) {
      doEffect()
    }
  }, [user])

  if (user) {
    console.log('custom data', user.customData, app.currentUser.customData)
  }


  return (
    <div className="App">
      <div className="App-header">
        {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
      </div>
    </div>
  );
}

function Login({ setUser }) {
  const loginAnonymous = async () => {
    const user = await app.logIn(
      Realm.Credentials.emailPassword(USER_EMAIL, USER_PASSWORD)
    )
    setUser(user);
  };
  return <button onClick={loginAnonymous}>Log In</button>;
}

// Create a component that displays the given user's details
function UserDetail({ user }) {
  return (
    <div>
      <h1>Logged in with user id: {user.id}</h1>
    </div>
  );
}

export default App;
