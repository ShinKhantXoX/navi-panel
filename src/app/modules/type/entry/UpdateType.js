import { Badge, Button, Card, Center, Divider, FileInput, Flex, Image, PasswordInput, Text, TextInput } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { useEffect, useState } from "react";
import { FormValidationMessage } from "../../../components/FormValidationMessage";
import { putRequest } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from "../../../redux/notificationSlice";
import { SaveButton } from "../../../components/SaveButton";
import { TextEditor } from "../../../components/TextEditor";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { FileButton } from "../../../components/FileButton";

export const UpdateType = ({ dataSource, update }) => {
    useDocumentTitle("Type Detail And Update");
    const [name ,setName] = useState(dataSource ? dataSource?.name : '');
    const [payload, setPayload] = useState({
        name : dataSource ? dataSource?.name : '',
        photo : ''
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageSelect = useSelector((state) => state.imageSelect)

    const submitUpdateType = async () => {
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
                title: "Type is updated sucessfully",
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
            photo : imageSelect?.url
        })

    }, [name,imageSelect])

    console.log(dataSource);

    return(
        <Card p={20} className="card-border">
            <Card.Section my={20}>
                <Flex
                    direction={"row"}
                    justify={"space-between"}
                    align={"center"}
                >
                    <Text sx={{ fontSize: 20, fontWeight: 500}}> Update Type </Text>
                    <Button 
                    variant="outline"
                    color="grape.9"
                    onClick={() => navigate('/type')}
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

                        <FileButton 
                        title={"File Upload"}
                        url={dataSource?.photo}
                        />

                        <SaveButton 
                            loading={loading}
                            submit={() => submitUpdateType()}
                        />
                    </Card.Section>
        </Card>
    )
}