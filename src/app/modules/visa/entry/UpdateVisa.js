import { Badge, Card, Center, Divider, FileInput, Flex, Image, Select, Text, TextInput } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { useCallback, useEffect, useState } from "react";
import { FormValidationMessage } from "../../../components/FormValidationMessage";
import { getReqeust, putRequest } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from "../../../redux/notificationSlice";
import { SaveButton } from "../../../components/SaveButton";
import { useNavigate } from "react-router-dom";
import { FileButton } from "../../../components/FileButton";
import { TextEditor } from "../../../components/TextEditor";

export const UpdateVisa = ({ dataSource, update }) => {
    useDocumentTitle("Visa Detail And Update");

    const [name, setName] = useState(dataSource?.name ? dataSource.name : '');
    const [title, setTitle] = useState(dataSource?.title ? dataSource.title : '');
    const [content, setContent] = useState(dataSource?.content ? dataSource.content : '');
    const [mainPayload, setMainPayload] = useState({
        name : '',
        title : '',
        content : '',
        photo: ''
      })
    const [errors, setErrors] = useState(null);
    const [id ,setId] = useState();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectImage = useSelector((state) => state.imageSelect);



    const submitUpdateVisa = async () => {
        setLoading(true);
        setErrors(null);

        const response = await putRequest(`visa/update/${dataSource?.id}`, mainPayload);

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
            navigate("/visa")
            return;
        }
    }

    
  
    useEffect(() => {
        setMainPayload({
          name : name,
          title : title,
          photo : selectImage?.url ? selectImage?.url : dataSource?.photo,
          content: content
        })
    }, [selectImage, name , title, content])
  

    return(
        <Card p={20} className="card-border">
            <Card.Section my={20}>
                <Flex
                    direction={"row"}
                    justify={"space-between"}
                    align={"center"}
                >
                    <Text sx={{ fontSize: 20, fontWeight: 500}}> Update Visa </Text>
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

                <TextInput
                my={10}
                placeholder="Enter full name"
                label="Name"
                disabled={loading}
                defaultValue={name}
                error={
                  errors &&
                  errors["name"] && (
                    <FormValidationMessage message={errors["name"][0]} />
                  )
                }
                onChange={(e) => setName(e.target.value)
                }
              />

            <TextInput
                my={10}
                placeholder="Enter full title"
                label="Title"
                defaultValue={title}
                disabled={loading}
                error={
                  errors &&
                  errors["title"] && (
                    <FormValidationMessage message={errors["title"][0]} />
                  )
                }
                onChange={(e) => setTitle(e.target.value)
                }
              />

            <TextEditor
              loading={loading}
              error={errors}
              title={'Content'}
              defaultValue={content}
              setValue={setContent}
              onEdit={(e) => setContent(e)}
              />


                <SaveButton 
                    loading={loading}
                    submit={() => submitUpdateVisa()}
                />
            </Card.Section>
        </Card>
    )
}