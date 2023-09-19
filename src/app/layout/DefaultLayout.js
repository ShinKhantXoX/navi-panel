import { AppShell, Container, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { DefaultHeader } from './components/DefaultHeader';
import { DefaultNavigation } from './components/DefaultNavigation';
import { AppNotification } from "../components/AppNotification";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const DefaultLayout = () => {

    // const [token, removeValue] = useLocalStorage({key: 'token' });
    const [schema] = useLocalStorage({defaultValue: null, key: "color-schema"});

    const navigate = useNavigate();

    const token = useSelector((state) => state.token);
    console.log(token?.token);

    useEffect(() => {   
        // localStorage.clear();
        // if(token?.token?.access_token !== undefined | token?.token?.access_token !== null | token?.token?.access_token !== ''){
        //     setTimeout(() => {
        //         localStorage.clear();
        //         navigate('/auth/login')
        //     }, 3600000);
        // }

        if(token?.token?.access_token === undefined) {
            console.log(token?.token?.access_token);
            navigate('/auth/login')
        }else {
                navigate('/user')
        }

    }, [])

    useEffect(() => {
        const handleTabClose = event => {
          event.preventDefault();
            localStorage.clear()
        };
    
        window.addEventListener('beforeunload', handleTabClose);
    
        return () => {
          window.removeEventListener('beforeunload', handleTabClose);
        };
      }, []);

    return(
        <>
            {token && (
                <MantineProvider 
                withGlobalStyles 
                withNormalizeCSS 
                theme={{
                    // colorScheme: schema ? schema : "light",
                }}
            >
                <Container 
                    fluid sx={{
                        backgroundColor: "#FAFBFC",
                        minHeight: "100vh"
                    }} 
                    p={0}
                >
                    <AppShell
                        padding="md"
                        navbar={ <DefaultNavigation role={token?.token?.user?.role} />}
                        header={<DefaultHeader />}
                        style={{
                            overflow : 'hidden'
                        }}
                    >
                        <AppNotification />
                        <Outlet />
                    </AppShell>
                </Container>
                
            </MantineProvider>
            ) }
        </>
    )
}