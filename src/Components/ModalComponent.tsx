import {useContext, useState} from "react";
import ButtonComponent from "./ButtonComponent.tsx";
import Link from '@mui/material/Link';
import {AuthContext, AuthProvider} from './AuthContext.js';
import {
    Alert,
    Button,
    Dialog, DialogContent,
    FilledInput,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel, Snackbar,
    TextField, Typography
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
    const [correctLogin,setCorrectLogin] = useState(true);
    const [justLoggedIn, setJustLoggedIn] = useState(null);
    const {login, isLoggedIn, cartData} = useContext(AuthContext);
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
    const [isValidLogin, setIsValidLogin] = useState(true);
    const handleUsernameLoginChange= (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordLoginChange= (event) => {

        setInitialPassword(event.target.value)
    }
    const  handleLogin = async (event) => {
        console.log(username + ":" + initialPassword);
        await axios
            .get('https://localhost:7146/user/' + username)
            .then(async (response) => {
                const existingUser = response.data;
                if (existingUser && existingUser.password === initialPassword) {
                    // credentials are correct, do something
                    console.log('credentials are correct');
                    setJustLoggedIn(true);
                    setCorrectLogin(true);
                    // Make a POST request to /cart/{username}
                    await axios
                        .get('https://localhost:7146/Cart/' + username)
                        .then(async (response) => {
                            // Handle the response after adding the cart data
                            const cartData = response.data;

                            await login(username, cartData);
                        })
                        .catch((error) => {
                            // Handle any errors that occurred during the request
                            console.error('Error adding cart data:', error);
                        });
                } else {
                    // credentials are incorrect, do something
                    console.log('credentials are incorrect');
                    setCorrectLogin(false);
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
    };

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
        console.log(isValidUsername,isValidPassword,validEmail)
        console.log("login: " +isValidLogin)
        if(isValidLogin) {
            data.email=email;
            data.password=initialPassword;
            data.username=username;
            console.log("se trimite",data)
            axios.post('https://localhost:7146/user', data)
                .then(response => {
                    console.log(response.data);
                    setOpenValue("login");
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
        if(emailValue.length > 0) {
            setEmail(emailValue);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setValidEmail(emailRegex.test(emailValue));
            console.log(validEmail)
        }
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

            <Dialog open={!isLoggedIn && openValue === 'login'} PaperProps={{ style: { backgroundColor: '#F5F5F5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', } }}>
                <DialogContent>
                    <Container>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                            <img src={require('../img/logo_bun_dark.png')} style={{ width: '60px', height: '60px' }} alt="Logo" />
                        </Box>
                        <DialogContentText sx={{ mb: 2, fontWeight: 'bold', borderBottom: '1px solid #000000', textAlign: 'center' }}>Log in below using your account</DialogContentText>
                        {!correctLogin && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                Invalid username or password.
                            </Typography>
                        )}
                        <Box sx={{ my: 1, textAlign: 'center' }}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input
                                    error={!correctLogin}
                                    id="username"
                                    type="text"
                                    onChange={(event) => handleUsernameLoginChange(event)}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ my: 1, textAlign: 'center' }}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                <Input
                                    error={!correctLogin}
                                    onChange={(event) => handlePasswordLoginChange(event)}
                                    id="filled-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ my: 1, textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                No account? <Link href="#" onClick={() => handleOpen('register')} sx={{ color: '#FF5722' }}>SIGN UP</Link>
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                <Link href="#" sx={{ color: '#FF5722' }}>Forgot password?</Link>
                            </Typography>
                        </Box>
                        <Box sx={{ my: 1, textAlign: 'center' }}>
                            <Button
                                onClick={() => handleLogin()}
                                variant="contained"
                                sx={{ backgroundColor: '#FF5722', color: '#FFF', width: '100%' }}
                            >
                                LOG IN
                            </Button>
                        </Box>
                        <Snackbar
                            open={justLoggedIn}
                            autoHideDuration={6000}
                            message="Successfully logged in"
                        />
                    </Container>
                </DialogContent>
            </Dialog>





            <Dialog open={openValue === 'register'} style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <img src={require('../img/logo_bun_dark.png')} style={{ width: '60px', height: '60px', marginTop: "10px" }} alt="Logo" />
                    </Box>
                    <DialogContentText sx={{ mb: 2 }}>Register a new account</DialogContentText>
                    {existingUser && (
                        <Alert severity="error">Username is taken</Alert>
                    )}
                    {!isValidLogin && (
                        <Alert severity="error">Incorrect sign up details</Alert>
                    )}
                    <Box sx={{ my: 1, mb: 2 }}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <TextField
                                label="username"
                                id="username"
                                type="text"
                                error={!isValidUsername}
                                onChange={(event) => handleUserChange(event)}
                                helperText={!isValidUsername ? "Username should be longer than 8 characters!" : ''}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ my: 1, mb: 2 }}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <TextField
                                label="Email"
                                id="email"
                                type="email"
                                error={!validEmail}
                                onChange={(event) => handleEmailChange(event)}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ my: 1 }}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password"></InputLabel>
                            <TextField
                                color={passwordStrengthColors[passwordStrength]}
                                id="filled-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                onChange={(event) => handlePasswordChange(event)}
                                helperText={passwordStrength === 'error' ? "Password should be at least 6 characters long." : " "}
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
                                label="Confirm Password"
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
                    <Box sx={{ display: "flex", justifyContent: "center", mt:2, mb: 2, borderBottom: '1px solid #FFFFFF', paddingBottom: '10px' }}>
                        <Button
                            onClick={testAxios}
                            variant="contained"
                            sx={{ backgroundColor: '#FF5722', color: '#FFF', width: '25ch' }}
                        >
                            REGISTER
                        </Button>
                    </Box>
                </Container>
            </Dialog>



                            </>
    );
}
export default ModalComponent