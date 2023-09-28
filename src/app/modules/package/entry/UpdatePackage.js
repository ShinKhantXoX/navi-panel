import { Badge, Button, Card, Center, Divider, FileInput, Flex, Image, Select, Text, TextInput } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { useCallback, useEffect, useState } from "react";
import { FormValidationMessage } from "../../../components/FormValidationMessage";
import { getReqeust, putRequest } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from "../../../redux/notificationSlice";
import { SaveButton } from "../../../components/SaveButton";
import { useNavigate } from "react-router-dom";
import { FileButton } from "../../../components/FileButton";
import { IconArrowLeft } from "@tabler/icons-react";

export const UpdatePackage = ({ dataSource, update }) => {
    useDocumentTitle("Package Detail And Update");

    const [payload, setPayload] = useState(dataSource?.name ? dataSource.name : '');
    const [type, setType] = useState();
    const [typeId, setTypeId] = useState(dataSource?.types_id ? dataSource?.types_id : '');
    const [mainPayload, setMainPayload] = useState({
        name: '',
        types_id: '',
        photo: ''
    })
    const [errors, setErrors] = useState(null);
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectImage = useSelector((state) => state.imageSelect);

    const loadingData = useCallback(async () => {
        const response = await getReqeust("type/list");


        if (response && (response.status === 500 || response.status === 403)) {
            dispatch(updateNotification({
                title: "Error: Retrived country status",
                message: response.message,
                status: 'fail'
            }));
            setLoading(false);
            return;
        }

        if (response && response.status === 200) {
            // setDescription(response.data.toString());
            let itemData = response?.data?.map((type) => {
                return {
                    value: type?.id,
                    label: type?.name
                }
            });
            setType(itemData);
            setLoading(false);
            return;
        }

    }, [dispatch]);

    const submitUpdateCountry = async () => {
        setLoading(true);
        setErrors(null);

        const response = await putRequest(`package/update/${id?.id}`, mainPayload);

        if (response && response.errors) {
            setErrors(response.errors);
            setLoading(false);
            return;
        }

        if (response && (response.status === 401 || response.status === 500 || response.status === 403)) {
            dispatch(updateNotification({
                title: "User Update",
                message: response.message,
                status: 'fail'
            }));
            setLoading(false);
            return;
        }

        if (response && response.status === 200) {
            dispatch(updateNotification({
                title: "Update",
                message: response.message,
                status: 'success'
            }));
            update(response.data);
            setLoading(false);
            navigate("/package")
            return;
        }
    }

    useEffect(() => {
        if (dataSource) {
            setId(dataSource);
        }
    }, [dataSource]);

    useEffect(() => {
        setMainPayload({
            name: payload,
            types_id: typeId,
            photo: selectImage?.url
        })
    }, [selectImage, payload, typeId])

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    console.log(id);

    return (
        <Card p={20} className="card-border">
            <Card.Section my={20}>
                <Flex
                    direction={"row"}
                    justify={"space-between"}
                    align={"center"}
                >
                    <Text sx={{ fontSize: 20, fontWeight: 500 }}> Update Package </Text>
                    <Button
                        variant="outline"
                        color="grape.9"
                        onClick={() => navigate("/package")}
                    >
                        <IconArrowLeft size={20} />
                    </Button>
                </Flex>

                <Divider variant="dashed" my={10} />
            </Card.Section>

            <Card.Section px={10}>
                <Center>
                    <FileButton
                        id="file"
                        className="photo"
                        url={dataSource?.photo}
                        title={"File upload"}
                    />
                </Center>

                {
                    type && (
                        <Select
                            label="Choose Type"
                            // description={description}
                            dropdownPosition={"bottom"}
                            data={type}
                            // defaultValue={dataSource?.country_id}
                            nothingFound="No City Found"
                            clearable
                            defaultValue={dataSource?.types_id}
                            name="country_id"
                            required={true}
                            disabled={loading}
                            maxDropdownHeight={100}
                            error={errors && errors['type'] && (<FormValidationMessage message={errors['type'][0]} />)}
                            onChange={(e) => setTypeId(e)}
                        />
                    )
                }

                <TextInput
                    my={10}
                    placeholder="Enter full name"
                    label="Name"
                    disabled={loading}
                    name="name"
                    defaultValue={id?.name}
                    error={errors && errors['name'] && <FormValidationMessage message={errors['name'][0]} />}
                    onChange={(e) => setPayload(e.target.value)}
                    required
                />


                <SaveButton
                    loading={loading}
                    submit={() => submitUpdateCountry()}
                />
            </Card.Section>
        </Card>
    )
}