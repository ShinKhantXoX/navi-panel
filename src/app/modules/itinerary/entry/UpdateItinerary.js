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

export const UpdateItinerary = ({ dataSource, update }) => {
  useDocumentTitle("Itinerary Detail And Update");

  const [title, setTitle] = useState(dataSource?.title ? dataSource.title : "");
  const [tour, setTour] = useState();
  const [tourId, setTourId] = useState(
    dataSource?.tour_id ? dataSource?.tour_id : ""
  );
  const [content, setContent] = useState(
    dataSource?.content ? dataSource?.content : ""
  );
  const [mainPayload, setMainPayload] = useState({
    title: "",
    tour_id: "",
    content_photo: "",
    content: "",
  });
  const [errors, setErrors] = useState(null);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectImage = useSelector((state) => state.imageSelect);

  const loadingData = useCallback(async () => {
    const response = await getReqeust("tour/list");

    if (response && (response.status === 500 || response.status === 403)) {
      dispatch(
        updateNotification({
          title: "Error: Retrived country status",
          message: response.message,
          status: "fail",
        })
      );
      setLoading(false);
      return;
    }

    if (response && response.status === 200) {
      // setDescription(response.data.toString());
      let itemData = response?.data?.map((tour) => {
        return {
          value: tour?.id,
          label: tour?.title,
        };
      });
      setTour(itemData);
      setLoading(false);
      return;
    }
  }, [dispatch]);

  const submitUpdateItinerary = async () => {
    setLoading(true);
    setErrors(null);

    const response = await putRequest(
      `itinerary/update/${id?.id}`,
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
      navigate("/itinerary");
      return;
    }
  };

  useEffect(() => {
    if (dataSource) {
      setId(dataSource);
    }
  }, [dataSource]);

  useEffect(() => {
    setMainPayload({
      tour_id: tourId,
      title: title,
      content_photo: selectImage?.url
        ? selectImage?.url
        : dataSource?.content_photo,
      content: content,
    });
  }, [selectImage, tourId, title, content]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Card p={20} className="card-border">
      <Card.Section my={20}>
        <Flex direction={"row"} justify={"space-between"} align={"center"}>
          <Text sx={{ fontSize: 20, fontWeight: 500 }}> Update Package </Text>
          <Button
            variant="outline"
            color="grape.9"
            onClick={() => navigate("/itinerary")}
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
            url={dataSource?.content_photo}
            title={"File upload"}
          />
        </Center>

        {tour && (
          <Select
            label="Choose Tour"
            // description={description}
            dropdownPosition={"bottom"}
            data={tour ? tour : null}
            defaultValue={tourId}
            nothingFound="No tour Found"
            clearable
            disabled={loading}
            // value={tourId}
            maxDropdownHeight={100}
            error={
              errors &&
              errors["tour"] && (
                <FormValidationMessage message={errors["tour"][0]} />
              )
            }
            onChange={(e) => setTourId(e)}
          />
        )}

        <TextInput
          my={10}
          placeholder="Enter full title"
          label="Title"
          disabled={loading}
          defaultValue={title}
          error={
            errors &&
            errors["name"] && (
              <FormValidationMessage message={errors["name"][0]} />
            )
          }
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextEditor
          loading={loading}
          error={errors}
          title={"Content"}
          defaultValue={content}
          setValue={setContent}
          onEdit={(e) => setContent(e)}
        />

        <SaveButton loading={loading} submit={() => submitUpdateItinerary()} />
      </Card.Section>
    </Card>
  );
};
