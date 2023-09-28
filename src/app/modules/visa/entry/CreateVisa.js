import {
  Button,
  Card,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { FormValidationMessage } from "../../../components/FormValidationMessage";
import { getReqeust, postRequest } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from "../../../redux/notificationSlice";
import { SaveButton } from "../../../components/SaveButton";
import { useNavigate } from "react-router-dom";
import { NavButton } from "../../../components/NavButton";
import { FileButton } from "../../../components/FileButton";
import { TextEditor } from "../../../components/TextEditor";
import { IconArrowLeft } from "@tabler/icons-react";

export const CreateVisa = () => {
  useDocumentTitle("New Visa");

  const [name, setName] = useState('');
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [mainPayload, setMainPayload] = useState({
    name: '',
    title: '',
    content: '',
    photo: ''
  })
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const selectImage = useSelector((state) => state.imageSelect);

  const submitCreateVisa = async () => {
    setLoading(true);
    setErrors(null);
    //   return;

    const response = await postRequest("visa/create", mainPayload);

    if (response && response.errors) {
      setErrors(response.errors);
      setLoading(false);
      return;
    }

    if (response && (response.status === 500 || response.status === 403)) {
      dispatch(
        updateNotification({
          title: "Error: Package create",
          message: response.message,
          status: "fail",
        })
      );
      setLoading(false);
      return;
    }

    if (response && response.status === 200) {
      dispatch(
        updateNotification({
          title: "Package create",
          message: response.message,
          status: "success",
        })
      );
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    setMainPayload({
      name: name,
      title: title,
      photo: selectImage?.url,
      content: content
    })
  }, [selectImage, name, title, content])


  return (
    <Grid>


      <Grid.Col sm={12} md={6}>
        <Card p={20} className="card-border">
          <Card.Section my={20}>
            <Flex direction={"row"} justify={"space-between"} align={"center"}>
              <Text sx={{ fontSize: 20, fontWeight: 500 }}> Create Visa </Text>
              <Button
                variant="outline"
                color="grape.9"
                onClick={() => navigate("/visa")}
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

                title={"File upload"}
              />
            </Center>


            <TextInput
              my={10}
              placeholder="Enter full name"
              label="Name"
              disabled={loading}
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
              setValue={setContent}
              onEdit={(e) => setContent(e)}
            />

            {/* <div className={'hidden'}> */}
            {/* </div> */}

            <SaveButton
              loading={loading}
              submit={() => submitCreateVisa()}
            />
          </Card.Section>
        </Card>
      </Grid.Col>
    </Grid>
  );
};
