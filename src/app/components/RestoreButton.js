import { Button, Divider, Flex, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { postRequest } from "../services/apiService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateNotification } from "../redux/notificationSlice";

export const RestoreButton = ({ title, message, action, callbackUrl }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    // yae
    // ! to_change
    const [name, setName] = useState('');
    const [payload, setPayload] = useState({
        name: '',
        photo: ''
    });
    const [errors, setErrors] = useState(null);
    // yae

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickRestoreHandler = async () => {
        
        // yae
        setLoading(true);
        setErrors(null);
        const response = await postRequest("type/create", payload);

        if (response && response.errors) {
            setErrors(response.errors);
            setLoading(false);
            return;
        }

        if (response && (response.status === 500 || response.status === 403)) {
            dispatch(updateNotification({
                title: "Error: User create",
                message: response.message,
                status: 'fail'
            }));
            setLoading(false);
            return;
        }

        if (response && response.status === 200) {
            dispatch(updateNotification({
                title: "User create",
                message: response.message,
                status: 'success'
            }));
            setLoading(false);
            return;
        }
    }

    useEffect(() => {
        // ! to_change
        setPayload({
            name: name,
            photo: imageSelect?.url
        })

    }, [name, imageSelect])

        // yae

        // const response = await postRequest(action);

    //     if (response && (response.status === 500 || response.status === 403)) {
    //         dispatch(updateNotification({
    //             title: "Error: Restoring Process!",
    //             message: response.message,
    //             status: 'fail'
    //         }));
    //         setLoading(false);
    //         return;
    //     }

    //     if (response && response.status === 200) {
    //         setLoading(false);
    //         close();
    //         navigate(callbackUrl);
    //     }
    // }

    return (
        <>
            <Button
                variant="outline"
                color="red"
                onClick={open}
                compact
            >
                Delete
            </Button>

            <Modal
                opened={opened}
                onClose={close}
                title={title}
            >
                <Divider variant="dashed" />
                <Text weight={700} my={20}> {message} </Text>

                <Flex
                    direction={"row"}
                    align={"center"}
                    justify={"flex-end"}
                >
                    <Button variant="outline" mx={10} disabled={loading} onClick={close}> Cancel </Button>
                    <Button variant="outline" color="red" disabled={loading} onClick={() => clickRestoreHandler()}> Restore </Button>
                </Flex>
            </Modal>
        </>

    )
} 