import React from "react"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const NavBar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuItem component={Link} to='/'>Its Alive</MenuItem>

                        {isAuthenticated() ?
                        <MenuItem component={Link} to='/mysettings'>My account</MenuItem>
                        : null
                        }
                        {isAuthenticated() ?
                        <MenuItem component={Link} to='/mycart'>Cart</MenuItem>
                        : null
                        }
                        { isAuthenticated() ?
                        <MenuItem component={Link}  onClick={() => {
                                     logout()
                                     props.history.push({
                                         pathname: "/"
                                     })
                                 }
                                }>Logout</MenuItem>
                        : <>
                        <MenuItem component={Link} to='/login'>Login</MenuItem>
                        <MenuItem component={Link} to='/register'>Register</MenuItem>
                        </>
                        }
                </IconButton>
            </AppBar>
    </div>
    )
}

export default NavBar








// const NavBar = props => {
//     const { isAuthenticated, logout } = useSimpleAuth()

//     return (
//         <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
//             <ul className="nav nav-pills nav-fill">
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/">ItsAlive</Link>
//                 </li>
//                 {isAuthenticated() ?
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/mysettings">My Profile</Link>
//                 </li> : null
//                 }
//                 {isAuthenticated() ?
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/mycart">My Cart</Link>
//                 </li> : null
//                 }

//                 {
//                     isAuthenticated() ?
//                         <li className="nav-item">
//                             <button className="nav-link fakeLink"
//                                 onClick={() => {
//                                     logout()
//                                     props.history.push({
//                                         pathname: "/"
//                                     })
//                                 }
//                                 }
//                             >Logout</button>
//                         </li> :
//                         <>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/login">Login</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/register">Register</Link>
//                         </li>
//                         </>
//                 }
//             </ul>
//         </nav>
//     )
// }

// export default NavBar
