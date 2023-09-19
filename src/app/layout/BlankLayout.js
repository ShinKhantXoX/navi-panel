import { Container, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { AppNotification } from '../components/AppNotification';

export const BlankLayout = () => {
    // const [token] = useLocalStorage({key: 'token', defaultValue: null });
    // const token = useSelector((state) => state.token);
    // console.log(token);
    const [colorScheme] = useLocalStorage({key: 'color-schema', defaultValue: 'light' });


    return(
        <MantineProvider 
            withGlobalStyles 
            withNormalizeCSS 
            theme={{
                colorScheme: colorScheme,
            }}
        >
            {/* { token?.token?.user.role !== 'admin' ? (navigate('/attendance')) : ( */}
                <Container fluid sx={{backgroundColor: "#FAFBFC",height: "100vh"}} p={0}>
                    <AppNotification />
                    <Outlet />
                </Container>
                
             {/* ) } */}
        </MantineProvider>
    )
}