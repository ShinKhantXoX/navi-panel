import { Flex, Grid, PasswordInput, TextInput, Text, Button, Box, Card, Image, Checkbox, ScrollArea } from "@mantine/core"
import { useDocumentTitle, useLocalStorage } from "@mantine/hooks"
import { IconLock, IconPassword, IconUser } from "@tabler/icons-react"
import { useEffect, useState } from "react";
import { postRequest } from '../../../services/apiService';
import { FormValidationMessage } from "../../../components/FormValidationMessage";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../../redux/notificationSlice";
import coverImage from "../../../assets/images/photo.jpg";
import { useNavigate } from "react-router-dom";
import { setTokenRed } from "../../../redux/tokenSlice";

export const Login = () => {
    useDocumentTitle("Login");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [token, setToken, removeValue] = useLocalStorage({key: 'token'});

    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [payload, setPayload] = useState({
        email: 'admin@gmail.com',
        password: 'asdffdsa'
    });

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const submitLogin = async () => {
        setLoading(true);
        setErrors(null);

        const response = await postRequest('/login', {
            email: 'admin@gmail.com',
            password: 'asdffdsa'
        });

        if(response && response.errors) {
            setErrors(response.errors);
            setLoading(false);
            return;
        }

        if(response && (response.status === 401 || response.status === 500 || response.status === 403)) {
            dispatch(updateNotification({
                title: "Login Fail",
                message: response.message,
                status: 'fail'
            }));  
            setErrors(response.errors)
            setLoading(false);
            return;
        }

        if(response && (response.status === 422)) {
            dispatch(updateNotification({
                title: "Login Fail",
                message: response.message,
                status: 'fail'
            }));  
            console.log(response);
            setErrors(response.message)
            setLoading(false);
            return;
        }

        if(response && response.status === 200) {
            localStorage.setItem('token',JSON.stringify(response.data))
            setToken(response.data);
            dispatch(updateNotification({
                title: "Login Success",
                message: response.message,
                status: 'success',
                // token : response.data.access_token
            }));
            dispatch(setTokenRed({
                token : response.data
            }))
            setLoading(false);
            if(token !== undefined | token !== null) {
                    navigate("/user")
            }
        }
    }

    useEffect(() => {
        removeValue();

        // Access the navigator object to get device information
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const appVersion = window.navigator.appVersion;

    // You can also check other properties from the navigator object
    // For example, window.navigator.userAgent gives information about the user agent string.

    // Log the device information to the console
    console.log(`User Agent: ${userAgent}`);
    console.log(`Platform: ${platform}`);
    console.log(`App Version: ${appVersion}`);
    }, [])
    

    useEffect(() => {
        setPayload({
            email : email,
            password : password,
        })

    } ,[email,password])

    return(
        <Grid gutter={0}
        >

            {/* <Grid.Col sm={12} md={8}
            // style={{
            //     backgroundImage : "url('https://img.freepik.com/free-vector/funky-tone-memphis-background_53876-99526.jpg?w=826&t=st=1693814006~exp=1693814606~hmac=4440879462a9097116375add42d70438cb429e804c0d9597e2c1ab8875438fff')",
            //     backgroundRepeat : 'no-repeat',
            //     backgroundSize : 'cover',
            //     width : '100%',
            //     height : '100vh !important'
            // }}
            >

                <Flex
                mih={"100vh"}
                w={"100%"}
                direction={"column"}
                justify={"center"}
                align={"center"}
                p={40}
                >
                    <Card className=" card-border" p={20}>
                        <ScrollArea w={700} h={300}>
                        <h4 className=" primary">1. Introduction</h4>
                        <p>Define the parties involved, including your agency's name and contact information and the client's name and contact information.</p>

                        <h4 className=" primary">2. Services</h4>
                        <p>Define the parties involved, including your agency's name and contact information and the client's name and contact information.</p>

                        <h4 className=" primary">3. Fees and Payment</h4>
                        <p>Define the parties involved, including your agency's name and contact information and the client's name and contact information.</p>

                        </ScrollArea>

                    </Card>
                </Flex>

            </Grid.Col> */}

            <Grid.Col sm={12} md={12}
            style={{
                backgroundImage : "url('/white_red.jpg')",
                backgroundRepeat : 'no-repeat',
                backgroundSize : 'cover',
                width : '100%',
                height : '100vh !important'
            }}
            >
                <Flex
                    mih={"100vh"}
                    w={"100%"}
                    direction={"column"}
                    justify={"center"}
                    align={"center"}
                >
                    <Card shadow='lg' className=" card-border" p={20} 
                    style={{
                        background : '#fef2f2'
                    }}
                    >
                        <Text size={30} color="#dc2626">Navi Plus Dashboard</Text>

                        <TextInput 
                            w={{md: "300px"}}
                            icon={<IconUser size={20}/>}
                            placeholder="Enter your email"
                            label="Email"
                            description="email can be @email.com"
                            error={errors && errors['email'] && (<FormValidationMessage message={errors['email'][0]} />)}
                            my={10}
                            value={payload.email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />

                        <PasswordInput 
                            w={{md: "300px"}}
                            my={10}
                            icon={<IconPassword size={20}/>}
                            placeholder="Enter your password"
                            label="Password"
                            description="password must be min 6 and max 18"
                            value={payload.password}
                            error={errors && errors['password'] && (<FormValidationMessage message={errors['password'][0]} />)}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />

                        <Button
                            fullWidth
                            style={{
                                background : '#dc2626'
                            }}
                            // variant="outline"
                            mt={20}
                            leftIcon={<IconLock />}
                            onClick={() => submitLogin()}
                            disabled={loading}
                            loading={loading}
                        > 
                            LOGIN 
                        </Button>
                    </Card>
                </Flex>
            </Grid.Col>
        </Grid>

    )
}