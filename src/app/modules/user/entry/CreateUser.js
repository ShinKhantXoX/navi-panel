import { Button, Card, Divider, Flex, Grid, Group, PasswordInput, Text, TextInput } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { useEffect, useState } from "react";
import { FormValidationMessage } from "../../../components/FormValidationMessage";
import { postRequest } from "../../../services/apiService";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../../redux/notificationSlice";
import { userPayload } from "../userPayload";
import { payloadHandler } from "../../../helpers/payloadHandler";
import { SaveButton } from "../../../components/SaveButton";
import { useNavigate } from "react-router-dom";
import { TextEditor } from "../../../components/TextEditor"
import { NavButton } from "../../../components/NavButton";
import { IconArrowLeft } from "@tabler/icons-react";

export const CreateUser = () => {
    useDocumentTitle("New User");

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [position, setPosition] = useState('');
    const [jd, setJd] = useState('');
    const [agree, setAgree] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [payload, setPayload] = useState({
        name: '',
        email: '',
        position: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCreateUser = async () => {
        setLoading(true);
        setErrors(null);

        const response = await postRequest("create-user", payload);

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

        setPayload({
            name: name,
            email: email,
            position: position,
            password: password,
            password_confirmation: passwordConfirmation
        })

    }, [name, email, phone, role, position, jd, password, passwordConfirmation])

    return (
        <Grid>

            <Grid.Col sm={12} md={4}>
                <Card p={20} className="card-border">

                    <Card.Section my={20}>
                        <Flex direction={"row"} justify={"space-between"} align={"center"}>
                            <Text sx={{ fontSize: 20, fontWeight: 500 }}> Create User </Text>
                            <Button
                                variant="outline"
                                color="grape.9"
                                onClick={() => navigate("/user")}
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
                            disabled={loading}
                            error={errors && errors['name'] && (<FormValidationMessage message={errors['name'][0]} />)}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextInput
                            my={10}
                            type="email"
                            placeholder="Enter email address"
                            label="Email"
                            disabled={loading}
                            error={errors && errors['email'] && (<FormValidationMessage message={errors['email'][0]} />)}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextInput
                            my={10}
                            placeholder="Enter position"
                            label="Position"
                            disabled={loading}
                            error={errors && errors['position'] && (<FormValidationMessage message={errors['position'][0]} />)}
                            onChange={(e) => setPosition(e.target.value)}
                        />

                        <PasswordInput
                            my={10}
                            placeholder="Enter password"
                            label="Password"
                            disabled={loading}
                            error={errors && errors['password'] && (<FormValidationMessage message={errors['password'][0]} />)}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <PasswordInput
                            my={10}
                            placeholder="Enter confirm password"
                            label="Password"
                            disabled={loading}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
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