import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {

    const classes = useStyles()
    const [ Users , setUsers ] = useState()
    const [isLoaded, setLoaded] = useState(true)

    const getUsers = async() => {
        setLoaded(false)
        const response = await fetch("https://reqres.in/api/users?page=1")
        const JsonData= await response.json();
        setUsers(JsonData.data);
        if(JsonData){
            setLoaded(true)
        }
    }

    return (
        <div>
            <div className="main">
                <div className="brand">
                    <h1>LetsGrowMore </h1>
                    <p>Click on the Button to get Users !!</p>
                </div>
                <div class="link">
                    <button class="but" onClick={getUsers}>Get Users</button>
                </div>
            </div>
            <div className="container">
                {Users?.map((user,id) => {
                    return(
                        <div className="card" key={id}>
                            <img src={user.avatar} alt="..."/>
                            <div className="name">{user.first_name} {user.last_name}</div>
                            <div className="email">{user.email}</div>
                        </div>
                    );
                })} 
            </div>
            {isLoaded ? null : <Backdrop className={classes.backdrop} open>
                 <CircularProgress color="inherit" />
                 </Backdrop>}
        </div>
    )
}

export default App