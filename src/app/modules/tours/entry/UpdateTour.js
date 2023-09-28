import {
  Badge,
  Button,
  Card,
  Center,
  Divider,
  FileInput,
  Flex,
  Image,
  Select,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { FormValidationMessage } from "../../../components/FormValidationMessage";
import { getReqeust, putRequest } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from "../../../redux/notificationSlice";
import { SaveButton } from "../../../components/SaveButton";
import { useNavigate } from "react-router-dom";
import { FileButton } from "../../../components/FileButton";
import { TextEditor } from "../../../components/TextEditor";
import { IconArrowLeft } from "@tabler/icons-react";

export const UpdateTour = ({ dataSource, update }) => {
  useDocumentTitle("Tour Detail And Update");

  const [packag, setPackage] = useState();
  const [packageId, setPackageId] = useState(
    dataSource ? dataSource?.package_id : ""
  );
  const [title, setTitle] = useState(dataSource ? dataSource?.title : "");
  const [tourCode, setTourCode] = useState(
    dataSource ? dataSource?.tour_code : ""
  );
  const [destination, setDestination] = useState(
    dataSource ? dataSource?.destination : ""
  );
  const [duration, setDuration] = useState(
    dataSource ? dataSource?.duration : ""
  );
  const [highlight, setHighlight] = useState(
    dataSource ? dataSource?.highlight : ""
  );
  const [service, setService] = useState(dataSource ? dataSource?.service : "");
  const [mainPayload, setMainPayload] = useState({
    title: dataSource ? dataSource?.title : "",
    package_id: dataSource ? dataSource?.package_id : "",
    photo: dataSource ? dataSource?.photo : "",
    tour_code: dataSource ? dataSource?.tour_code : "",
    destination: dataSource ? dataSource?.destination : "",
    duration: dataSource ? dataSource?.duration : "",
    highlight: dataSource ? dataSource?.highlight : "",
    service: dataSource ? dataSource?.service : "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectImage = useSelector((state) => state.imageSelect);

  const loadingData = useCallback(async () => {
    const response = await getReqeust("package/list");
    console.log(response);

    if (response && (response.status === 500 || response.status === 403)) {
      dispatch(
        updateNotification({
          title: "Error: Retrived type status",
          message: response.message,
          status: "fail",
        })
      );
      setLoading(false);
      return;
    }

    if (response && response.status === 200) {
      // setDescription(response.data.toString());
      let itemData = response?.data?.map((pack) => {
        return {
          value: pack?.id,
          label: pack?.name,
        };
      });
      setPackage(itemData);
      setLoading(false);
      return;
    }
  }, [dispatch]);

  const submitUpdateCountry = async () => {
    setLoading(true);
    setErrors(null);

    const response = await putRequest(
      `tour/update/${dataSource?.id}`,
      mainPayload
    );

    if (response && response.errors) {
      setErrors(response.errors);
      setLoading(false);
      return;
    }

    if (
      response &&
      (response.status === 401 ||
        response.status === 500 ||
        response.status === 403)
    ) {
      dispatch(
        updateNotification({
          title: "User Update",
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
          title: "Update",
          message: response.message,
          status: "success",
        })
      );
      update(response.data);
      setLoading(false);
      navigate("/tour");
      return;
    }
  };

  useEffect(() => {
    setMainPayload({
      package_id: packageId,
      title: title,
      tour_code: tourCode,
      destination: destination,
      duration: duration,
      highlight: highlight,
      service: service,
      photo: selectImage?.url ? selectImage?.url : dataSource?.phoyo,
    });
  }, [
    selectImage,
    packageId,
    title,
    tourCode,
    destination,
    duration,
    highlight,
    service,
  ]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  console.log(dataSource);

  return (
    <Card p={20} className="card-border">
      <Card.Section my={20}>
        <Flex direction={"row"} justify={"space-between"} align={"center"}>
          <Text sx={{ fontSize: 20, fontWeight: 500 }}> Update Tour </Text>
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
            url={dataSource?.photo}
            title={"File upload"}
          />
        </Center>

        {packag && (
          <Select
            label="Choose Package"
            // description={description}
            dropdownPosition={"bottom"}
            data={packag ? packag : null}
            defaultValue={packageId ? packageId : ""}
            nothingFound="No Package Found"
            clearable
            disabled={loading}
            // value={typeId}
            maxDropdownHeight={100}
            error={
              errors &&
              errors["package"] && (
                <FormValidationMessage message={errors["package"][0]} />
              )
            }
            onChange={(e) => setPackageId(e)}
          />
        )}

        <TextInput
          my={10}
          placeholder="Enter full title"
          label="Title"
          disabled={loading}
          defaultValue={title ? title : ""}
          error={
            errors &&
            errors["name"] && (
              <FormValidationMessage message={errors["name"][0]} />
            )
          }
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextInput
          my={10}
          placeholder="Enter full tour code"
          label="Tour code"
          disabled={loading}
          defaultValue={tourCode}
          error={
            errors &&
            errors["tour_code"] && (
              <FormValidationMessage message={errors["tour_code"][0]} />
            )
          }
          onChange={(e) => setTourCode(e.target.value)}
        />

        <TextInput
          my={10}
          placeholder="Enter full destination"
          label="Destination"
          defaultValue={destination}
          disabled={loading}
          error={
            errors &&
            errors["destination"] && (
              <FormValidationMessage message={errors["destination"][0]} />
            )
          }
          onChange={(e) => setDestination(e.target.value)}
        />

        <TextInput
          my={10}
          placeholder="Enter full duration"
          label="Duration"
          defaultValue={duration}
          disabled={loading}
          error={
            errors &&
            errors["duration"] && (
              <FormValidationMessage message={errors["duration"][0]} />
            )
          }
          onChange={(e) => setDuration(e.target.value)}
        />

        <Textarea
          my={10}
          placeholder="Enter full highlight"
          label="Highlight"
          defaultValue={highlight}
          disabled={loading}
          error={
            errors &&
            errors["tour_code"] && (
              <FormValidationMessage message={errors["tour_code"][0]} />
            )
          }
          onChange={(e) => setHighlight(e.target.value)}
        />

        <TextEditor
          loading={loading}
          error={errors}
          title={"Service"}
          defaultValue={service}
          setValue={setService}
          onEdit={(e) => setService(e)}
        />

        <SaveButton loading={loading} submit={() => submitUpdateCountry()} />
      </Card.Section>
    </Card>
  );
};
