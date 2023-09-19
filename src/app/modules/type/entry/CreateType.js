import { Card, Divider, Flex, Grid, Group, PasswordInput, Text, TextInput } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { useEffect, useState } from "react";
import { FormValidationMessage } from "../../../components/FormValidationMessage";
import { postRequest } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from "../../../redux/notificationSlice";
import { SaveButton } from "../../../components/SaveButton";
import { useNavigate } from "react-router-dom";
import { TextEditor } from "../../../components/TextEditor"
import { NavButton } from "../../../components/NavButton";
import { FileButton } from "../../../components/FileButton";

export const CreateType = () => {
    useDocumentTitle("New Type");

    const [name ,setName] = useState('');
    const [payload, setPayload] = useState({
        name : '',
        photo : ''
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageSelect = useSelector((state) => state.imageSelect)

    const submitCreateUser = async () => {
        setLoading(true);
        setErrors(null);

        const response = await postRequest("type/create", payload);

        if(response && response.errors) {
            setErrors(response.errors);
            setLoading(false);
            return;
        }

        if(response && (response.status === 500 || response.status === 403)) {
            dispatch(updateNotification({
                title: "Error: User create",
                message: response.message,
                status: 'fail'
            }));  
            setLoading(false);
            return;
        }

        if(response && response.status === 200) {
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

        setPayload({
            name : name,
            photo : imageSelect?.url
        })

    }, [name,imageSelect])

    return(
        <Grid>
            <Grid.Col md={12}>
                <Flex
                    direction={"row"}
                    justify={"flex-end"}
                    align={"center"}
                >
                    <Group>
                        <NavButton
                            label="Type List"
                            click={() => navigate('/type')}
                        />
                    </Group>
                </Flex>
            </Grid.Col>

            <Grid.Col sm={12} md={4}>
                <Card p={20} className="card-border">
                    <Card.Section my={20}>
                        <Text sx={{ fontSize: 20, fontWeight: 500}}> Create Type </Text>
                        <Divider variant="dashed" my={10} />
                    </Card.Section>

                    <Card.Section px={10}>

                        <FileButton 
                        title={"File Upload"}
                        />

                        <TextInput 
                            my={10}
                            placeholder="Enter full name"
                            label="Name"
                            disabled={loading}
                            error={errors && errors['name'] && (<FormValidationMessage message={errors['name'][0]} />)}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <SaveButton 
                            loading={loading}
                            submit={() => submitCreateUser()}
                        />
                    </Card.Section>
                </Card>
            </Grid.Col>
        </Grid>
    )
}