import {useContext, useState} from "react";
import ButtonComponent from "./ButtonComponent.tsx";
import Link from '@mui/material/Link';
import {AuthContext, AuthProvider} from './AuthContext.js';
import {
    Alert,
    Button,
    Dialog,
    FilledInput,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel, Snackbar,
    TextField
} from '@mui/material';
import {DialogContentText} from '@mui/material';
import {Box} from "@mui/material";
import {Container} from "@mui/material";
import {Visibility} from '@mui/icons-material';
import {VisibilityOff} from '@mui/icons-material';
import axios from 'axios'
import {motion}  from 'framer-motion'
const buttonStyle =
    {
        backgroundColor: '#FF8C00',
        color: '#ffff',
        borderColor: '#FF8C00'
    }
const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
}
function ModalComponent() {
    const passwordStrengthColors = {
        'error': 'error',
        'warning': 'warning',
        'success': 'success'
    };
    const data = {
        username: 'myusername',
        password: 'mypassword',
        email: 'myemail@example.com'
    };
    const [justLoggedIn, setJustLoggedIn] = useState(false);
    const {login, isLoggedIn} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [existingUser,setExistingUser] = useState(false);
    const [username,setUsername] = useState('none');
    const [isValidPassword, setIsValidPassword] = useState(false)
    const [initialPassword, setInitialPassword] = useState('none');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('none')
    const [isValidUsername, setIsValidUsername] = useState(true)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [openValue, setOpenValue] = useState('none')
    const [isValidLogin, setIsValidLogin] = useState(false);
    const handleUsernameLoginChange= (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordLoginChange= (event) => {

        setInitialPassword(event.target.value)
    }
    const handleLogin= (event) => {
        console.log(username+":"+initialPassword);
        axios.get('https://localhost:7146/user/'+username,)
            .then((response) => {
                const existingUser = response.data;
                if (existingUser && existingUser.password === initialPassword) {
                    // credentials are correct, do something
                    console.log('credentials are correct');
                    setJustLoggedIn(true)
                    login(username);
                } else {
                    // credentials are incorrect, do something
                    console.log('credentials are incorrect');
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error(error);
            });

    }
    const testAxios = () =>
    {
        axios.get('https://localhost:7146/user/'+username,)
            .then((response) => {
                // Handle the response data here
                const existingUser=response.data;
                if(!existingUser)
                {
                    setExistingUser(true);
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
        setIsValidLogin(isValidPassword && isValidUsername && validEmail);
        console.log("login: " +isValidLogin)
        if(isValidLogin) {
            data.email=email;
            data.password=initialPassword;
            data.username=username;
            axios.post('https://localhost:7146/user', data)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }

    const handleOpen = (value) => {
        setOpenValue(value)
    }
    const specialCarracters=["!","@","#","$","%","^","&","*", "(",")"]
    const numbers=['1','2','3','4','5','6','7','8','9','0']
    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidEmail(emailRegex.test(emailValue));
        console.log(validEmail)
    };
    const handleUserChange = (event) => {
        console.log(isValidUsername)
        if(event.target.value.length > 8)
        {

            setIsValidUsername(true);
            setUsername(event.target.value)
        }
        else
            setIsValidUsername(false)
    }
    const handlePasswordChange = (event) =>
    {


        if(event.target.value.length < 6) {
            setPasswordStrength('error');
            setInitialPassword('none');
        }
        else if(event.target.value.length >= 6 && !specialCarracters.some(char => event.target.value.includes(char)))
        {
            setPasswordStrength('warning');
            setInitialPassword(event.target.value)
        }
        else
        {
            setPasswordStrength('success');
            setInitialPassword(event.target.value)
        }
    }
    const handlePasswordConfirmation = (event) =>
    {
        console.log(isValidPassword)
        setIsValidPassword(event.target.value===initialPassword);
    }
    const handleClose = () => {
        setOpenValue("none");
    }
    return (
        <>
            <ButtonComponent Text={"Order Now"} onClick={() => handleOpen('login')}></ButtonComponent>

            <Dialog open={!isLoggedIn && openValue === 'login'} style={{backgroundColor: 'rgba(0,0,0,.8)'}}>

                <Container >

                    <DialogContentText sx={{mb:2}}>Log in below using your account</DialogContentText>
                    <Box sx={{ my: 1 ,mb: 2}}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                            <InputLabel htmlFor="username"></InputLabel>
                            <TextField
                                id="username"
                                type="text"
                                label='username'
                                onChange={(event) => handleUsernameLoginChange(event)}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ my: 1 }}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password"></InputLabel>
                            <TextField
                                onChange={(event) => handlePasswordLoginChange(event)}
                                id="filled-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                label='Password'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Link href="#"
                              onClick={() => handleOpen('register')}
                        > SIGN UP</Link>
                        <Button
                            onClick={() => handleLogin()}
                            variant="contained">Log In</Button>
                    </Box>
                    <Snackbar
                        open={justLoggedIn}
                        autoHideDuration={6000}
                        message="Sucessfully logged in"
                    />
                </Container>
            </Dialog>
            <Dialog open={openValue === 'register'} style={{backgroundColor: 'rgba(0,0,0,.8)'}}>

                <Container >

                    <DialogContentText sx={{mb:2}}>Log in below using your account</DialogContentText>
                    {existingUser && (
                        <Alert severity="error">
                            Username is taken
                        </Alert>)}
                    {!isValidLogin && (
                        <Alert severity="error">
                            Incorrect username or password
                        </Alert>)}
                    <Box sx={{ my: 1 ,mb: 2}}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">


                            <TextField
                                label='username'
                                id="username"
                                type="text"
                                error={!isValidUsername}
                                onChange={(event) => handleUserChange(event)}
                                helperText={ !isValidUsername ? "Username should be longer than 8 characters!" : ''}
                            >

                            </TextField>

                        </FormControl>
                    </Box>
                    <Box sx={{ my: 1 ,mb: 2}}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">


                            <TextField
                                label='Email'
                                id="email"
                                type="email"
                                error={!validEmail}
                                onChange={(event) => handleEmailChange(event)}
                            >

                            </TextField>

                        </FormControl>
                    </Box>
                    <Box sx={{ my: 1 }}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password"></InputLabel>
                            <TextField
                                color={passwordStrengthColors[passwordStrength]}

                                id="filled-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                label='Password'
                                onChange={(event) => handlePasswordChange(event)}
                                helperText={passwordStrength==='error' ? "Password should be at least 6 characters long." : " "  }

                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ my: 1 }}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password"></InputLabel>
                            <TextField
                                id="filled-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                label='Confirm Password'
                                color={!isValidPassword ? passwordStrengthColors['error'] : passwordStrengthColors['success']}
                                onChange={(event) => handlePasswordConfirmation(event)}
                                helperText={isValidPassword ? "" : "Passwords must match."}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mb:2 }}>
                        <Link href="#"
                              onClick={testAxios}
                        > SIGN UP</Link>
                    </Box>

                </Container>

            </Dialog>


        </>
    );
}
export default ModalComponent