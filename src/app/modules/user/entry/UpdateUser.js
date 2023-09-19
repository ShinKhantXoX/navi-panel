import { Badge, Button, Card, Center, Divider, FileInput, Flex, Image, PasswordInput, Text, TextInput } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { useEffect, useState } from "react";
import { FormValidationMessage } from "../../../components/FormValidationMessage";
import { putRequest } from "../../../services/apiService";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../../redux/notificationSlice";
import { SaveButton } from "../../../components/SaveButton";
import { TextEditor } from "../../../components/TextEditor";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const UpdateUser = ({ dataSource, update }) => {
    useDocumentTitle("User Detail And Update");
    const [name ,setName] = useState(dataSource ? dataSource?.name : '');
    const [email, setEmail] = useState(dataSource ? dataSource?.email : '');
    const [position, setPosition] = useState(dataSource ? dataSource?.position : '');
    const [payload, setPayload] = useState({
        name : dataSource ? dataSource?.name : '',
        email : dataSource ? dataSource?.email : '',
        position : dataSource ? dataSource?.position : '',
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitUpdateUser = async () => {
        setLoading(true);
        setErrors(null);
        const response = await putRequest(`edit`, payload);

        if(response && response.errors) {
            setErrors(response.errors);
            setLoading(false);
            return;
        }

        if(response && (response.status === 401 || response.status === 500 || response.status === 403)) {
            dispatch(updateNotification({
                title: "User Update",
                message: response.message,
                status: 'fail'
            }));  
            setLoading(false);
            return;
        }

        if(response && response.status === 200) {
            dispatch(updateNotification({
                title: "Update",
                message: response.message,
                status: 'success'
            }));
            update(response.data);
            setLoading(false);
            return;
        }
    }

    useEffect(() => {

        setPayload({
            name : name,
            email : email,
            position : position,
        })

    }, [name,email,position])

    console.log(dataSource);

    return(
        <Card p={20} className="card-border">
            <Card.Section my={20}>
                <Flex
                    direction={"row"}
                    justify={"space-between"}
                    align={"center"}
                >
                    <Text sx={{ fontSize: 20, fontWeight: 500}}> Update User </Text>
                    <Button 
                    variant="outline"
                    color="grape.9"
                    onClick={() => navigate('/user')}
                    >
                        <IconArrowLeft size={20} />
                    </Button>
                </Flex>
                
                <Divider variant="dashed" my={10} />
            </Card.Section>

            <Card.Section px={10}>
                        <TextInput 
                            my={10}
                            placeholder="Enter full name"
                            label="Name"
                            defaultValue={dataSource?.name}
                            disabled={loading}
                            error={errors && errors['name'] && (<FormValidationMessage message={errors['name'][0]} />)}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextInput
                            my={10}
                            type="email"
                            placeholder="Enter email address"
                            label="Email"
                            defaultValue={dataSource?.email}
                            disabled={loading}
                            error={errors && errors['email'] && (<FormValidationMessage message={errors['email'][0]} />)}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextInput 
                            my={10}
                            placeholder="Enter position"
                            label="Position"
                            defaultValue={dataSource?.position}
                            disabled={loading}
                            error={errors && errors['position'] && (<FormValidationMessage message={errors['position'][0]} />)}
                            onChange={(e) => setPosition(e.target.value)}
                        />

                        <SaveButton 
                            loading={loading}
                            submit={() => submitUpdateUser()}
                        />
                    </Card.Section>
        </Card>
    )
}