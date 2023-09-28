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

export const CreateTour = () => {
  useDocumentTitle("New Tour");

  const [packag, setPackage] = useState();
  const [packageId, setPackageId] = useState();
  const [title, setTitle] = useState("");
  const [tourCode, setTourCode] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [highlight, setHighlight] = useState("");
  const [service, setService] = useState("");
  const [mainPayload, setMainPayload] = useState({
    title: '',
    packages_id: '',
    photo: '',
    tour_code: '',
    destination: '',
    duration: '',
    highlight: '',
    service: ''
  })
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const selectImage = useSelector((state) => state.imageSelect);

  const loadingData = useCallback(async () => {
    const response = await getReqeust("package/list");
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
      let itemData = response?.data?.map((pack) => {
        return {
          value: pack?.id,
          label: pack?.name
        }
      });
      setPackage(itemData);
      setLoading(false);
      return;
    }

  }, [dispatch]);

  const submitCreateTour = async () => {
    setLoading(true);
    setErrors(null);
    //   return;

    const response = await postRequest("tour/create", mainPayload);

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
      packages_id: packageId,
      title: title,
      tour_code: tourCode,
      destination: destination,
      duration: duration,
      highlight: highlight,
      service: service,
      photo: selectImage?.url
    })
  }, [selectImage, packageId, title, tourCode, destination, duration, highlight, service])

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Grid>

      <Grid.Col sm={12} md={6}>
        <Card p={20} className="card-border">
          <Card.Section my={20}>
            <Flex direction={"row"} justify={"space-between"} align={"center"}>
              <Text sx={{ fontSize: 20, fontWeight: 500 }}> Create Tours </Text>
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
              packag && (
                <Select
                  label="Choose Package"
                  // description={description}
                  dropdownPosition={"bottom"}
                  data={packag ? packag : null}
                  // defaultValue={payload. || ''}
                  nothingFound="No Package Found"
                  clearable
                  disabled={loading}
                  // value={typeId}
                  maxDropdownHeight={100}
                  error={errors && errors['package'] && (<FormValidationMessage message={errors['package'][0]} />)}
                  onChange={(e) => setPackageId(e)}
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

            <TextInput
              my={10}
              placeholder="Enter full tour code"
              label="Tour code"
              disabled={loading}
              error={
                errors &&
                errors["tour_code"] && (
                  <FormValidationMessage message={errors["tour_code"][0]} />
                )
              }
              onChange={(e) => setTourCode(e.target.value)
              }
            />

            <TextInput
              my={10}
              placeholder="Enter full destination"
              label="Destination"
              disabled={loading}
              error={
                errors &&
                errors["destination"] && (
                  <FormValidationMessage message={errors["destination"][0]} />
                )
              }
              onChange={(e) => setDestination(e.target.value)
              }
            />

            <TextInput
              my={10}
              placeholder="Enter full duration"
              label="Duration"
              disabled={loading}
              error={
                errors &&
                errors["duration"] && (
                  <FormValidationMessage message={errors["duration"][0]} />
                )
              }
              onChange={(e) => setDuration(e.target.value)
              }
            />

            <Textarea
              my={10}
              placeholder="Enter full highlight"
              label="Highlight"
              disabled={loading}
              error={
                errors &&
                errors["tour_code"] && (
                  <FormValidationMessage message={errors["tour_code"][0]} />
                )
              }
              onChange={(e) => setHighlight(e.target.value)
              }
            />

            <TextEditor
              loading={loading}
              error={errors}
              title={'Service'}
              setValue={setService}
              onEdit={(e) => setService(e)}
            />

            {/* <div className={'hidden'}> */}
            {/* </div> */}

            <SaveButton
              loading={loading}
              submit={() => submitCreateTour()}
            />
          </Card.Section>
        </Card>
      </Grid.Col>
    </Grid>
  );
};
