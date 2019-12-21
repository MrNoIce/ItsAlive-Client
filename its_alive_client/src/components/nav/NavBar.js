import React from "react"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu'
import './navbar.css'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    media: {
        width: '45%',
        height: '45%',
    },
    style: {
        background : '#2E3B55',
    },
    title: {
      flexGrow: 1,
    },
    menuButton: {
        // float: "left",
    }
  }));

const NavBar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const classes = useStyles();
    const open = Boolean(anchorEl);


    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = event => {
        setAnchorEl(null);
    };


    return (
        <>
        {/* <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <img src={require("/Users/jakescott/workspace/ItsAlive/ItsAlive-Client/its_alive_client/src/static/images/kombuchaStock.jpg")}
                className={classes.media}
                style={useStyles.media}
                title="Kombucha Stock Photo"
                /></div> */}
        <div className={classes.root}>

                <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}
                >
                </MenuIcon>
                </IconButton>

                <AppBar position="static"
                    className={classes.style}
                >
                    <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >

                    <MenuItem onClick={handleClose} component={Link} to='/'>Its Alive</MenuItem>

                    {isAuthenticated() ?
                    <MenuItem onClick={handleClose} component={Link} to='/mysettings'>My account</MenuItem>
                    : null
                    }
                    {isAuthenticated() ?
                    <MenuItem onClick={handleClose} component={Link} to='/mycart'>Cart</MenuItem>
                    : null
                    }
                    { isAuthenticated() ?
                    <MenuItem onClick={handleClose} component={Link}
                        onClick={() => {
                            logout()
                                props.history.push({
                                    pathname: "/"
                                })
                            }
                        }>Logout</MenuItem>
                    : <>
                    <MenuItem onClick={handleClose} component={Link} to='/login'>Login</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to='/register'>Register</MenuItem>
                    </>
                    }
                    </Menu>

            </AppBar>
    </div>
    </>
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
