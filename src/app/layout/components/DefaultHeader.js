import { Button, Flex, Group, Header, Image, Text } from "@mantine/core"
import { IconUser,IconMenu2 } from "@tabler/icons-react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { drawerOpen, drawerToggle } from "../../redux/drawerSlice";
import defaultLogo from "../../assets/images/defaultLogo.png";
import { useNavigate } from "react-router-dom";

export const DefaultHeader = () => {
    
    const [openMenu, setOpenMenu] = useState(false);
    
    const drawerState = useSelector(state => state.drawer);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if(drawerState) {
            setOpenMenu(drawerState);
            dispatch(drawerOpen(openMenu));
        }
    },[drawerState, dispatch, openMenu]);

    return(
        <Header height={60} p="xs" style={{
            background : '#dc2626'
        }}>
            <Flex
                direction={"row"}
                align={"center"}
                justify={"space-between"}
            >
                <Group className="group-row">
                    <Image 
                        src={'/logo.png'} 
                        withPlaceholder 
                        width={40}
                        height={40}
                    />
                    <Text color="gray.0">Navi Plus Travel </Text>
                </Group>
                
                <Group>
                    <Text color="gray.0">
                        <IconMenu2
                        onClick={() => dispatch(drawerToggle())}
                        />
                    </Text>
                    <Button
                        leftIcon={<IconUser />}
                        variant="outline"
                        // variant="filled"
                        // bg={'primary'}
                        color="gray.0"
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload()
                        }}
                    > 
                        Logout 
                    </Button>
                </Group>
                
            </Flex>
        </Header>
    )
}