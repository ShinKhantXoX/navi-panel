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
  Textarea,
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

export const CreateItinerary = () => {
  useDocumentTitle("New Itinerary");

  const [tour, setTour] = useState();
  const [tourId, setTourId] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mainPayload, setMainPayload] = useState({
    title: '',
    tour_id: '',
    content_photo: '',
    content: ''
  })
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const selectImage = useSelector((state) => state.imageSelect);

  const loadingData = useCallback(async () => {
    const response = await getReqeust("tour/list");
    console.log(response);


    if (response && (response.status === 500 || response.status === 403)) {
      dispatch(updateNotification({
        title: "Error: Retrived type status",
        message: response.message,
        status: 'fail'
      }));
      setLoading(false);
      return;
    }

    if (response && response.status === 200) {
      // setDescription(response.data.toString());
      let itemData = response?.data?.map((tour) => {
        return {
          value: tour?.id,
          label: tour?.title
        }
      });
      setTour(itemData);
      setLoading(false);
      return;
    }

  }, [dispatch]);

  const submitCreateItinerary = async () => {
    setLoading(true);
    setErrors(null);
    //   return;

    const response = await postRequest("itinerary/create", mainPayload);

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
          title: "Itinerary create",
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
      tour_id: tourId,
      title: title,
      content_photo: selectImage?.url,
      content: content
    })
  }, [selectImage, tourId, title, content])

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Grid>
      <Grid.Col sm={12} md={6}>
        <Card p={20} className="card-border">
          <Card.Section my={20}>
            <Flex direction={"row"} justify={"space-between"} align={"center"}>
              <Text sx={{ fontSize: 20, fontWeight: 500 }}> Create Itinerary </Text>
              <Button
                variant="outline"
                color="grape.9"
                onClick={() => navigate("/tour")}
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

            {
              tour && (
                <Select
                  label="Choose Tour"
                  // description={description}
                  dropdownPosition={"bottom"}
                  data={tour ? tour : null}
                  // defaultValue={payload. || ''}
                  nothingFound="No tour Found"
                  clearable
                  disabled={loading}
                  // value={tourId}
                  maxDropdownHeight={100}
                  error={errors && errors['tour'] && (<FormValidationMessage message={errors['tour'][0]} />)}
                  onChange={(e) => setTourId(e)}
                />
              )
            }

            <TextInput
              my={10}
              placeholder="Enter full title"
              label="Title"
              disabled={loading}
              error={
                errors &&
                errors["name"] && (
                  <FormValidationMessage message={errors["name"][0]} />
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
              submit={() => submitCreateItinerary()}
            />
          </Card.Section>
        </Card>
      </Grid.Col>
    </Grid>
  );
};
