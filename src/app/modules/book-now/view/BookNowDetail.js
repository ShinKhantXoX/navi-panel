import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getReqeust } from "../../../services/apiService";
import { updateNotification } from "../../../redux/notificationSlice";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Text,
  TextInput,
} from "@mantine/core";
import { FormValidationMessage } from "../../../components/FormValidationMessage";
import { IconArrowLeft } from "@tabler/icons-react";

const BookNowDetail = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [errors, setErrors] = useState();

  const params = useParams();
  console.log(params);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadingData = useCallback(async () => {
    setLoading(true);
    const response = await getReqeust(`book-form/show/${params.id}`);
    console.log(response);

    if (
      response &&
      (response.status === 401 ||
        response.status === 500 ||
        response.status === 403)
    ) {
      dispatch(
        updateNotification({
          title: "Error",
          message: response.message,
          status: "fail",
        })
      );
      setLoading(false);
      return;
    }

    if (response && response.status === 200) {
      setData(response.data);
      setLoading(false);
      return;
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);
  console.log(data);

  return (
    <Card p={20} className="card-border" w={500}>
      <Card.Section my={20}>
        <Flex direction={"row"} justify={"space-between"} align={"center"}>
          <Text sx={{ fontSize: 20, fontWeight: 500 }}>Book Now Detail </Text>
          <Button
            variant="outline"
            color="grape.9"
            onClick={() => navigate("/book-now")}
          >
            <IconArrowLeft size={20} />
          </Button>
        </Flex>

        <Divider variant="dashed" my={10} />
      </Card.Section>

      <Card.Section px={10}>
        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text color="dark.2" w={200}>
            Accommodation{" "}
          </Text>
          <Text>-</Text>
          <Text>{data?.accommodation}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Address</Text>
          <Text>-</Text>
          <Text>{data?.address}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Adult</Text>
          <Text>-</Text>
          <Text>{data?.adult}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Arrival Date</Text>
          <Text>-</Text>
          <Text>{data?.arrival_date}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Child</Text>
          <Text>-</Text>
          <Text>{data?.arrival_date}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Departure Date</Text>
          <Text>-</Text>
          <Text>{data?.departure_date}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Email</Text>
          <Text>-</Text>
          <Text>{data?.email}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Flight</Text>
          <Text>-</Text>
          <Text>{data?.flight}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Full Name</Text>
          <Text>-</Text>
          <Text>{data?.full_name}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Guide Type</Text>
          <Text>-</Text>
          <Text>{data?.guide_type}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Hotel Budget</Text>
          <Text>-</Text>
          <Text>{data?.hotel_budget}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Hotel Star</Text>
          <Text>-</Text>
          <Text>{data?.hotel_star}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Infants</Text>
          <Text>-</Text>
          <Text>{data?.infants}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Language</Text>
          <Text>-</Text>
          <Text>{data?.language}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Language Requirement</Text>
          <Text>-</Text>
          <Text>{data?.language_requirement}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Nationality</Text>
          <Text>-</Text>
          <Text>{data?.nationality}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Passport Number</Text>
          <Text>-</Text>
          <Text>{data?.passport_number}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Phone</Text>
          <Text>-</Text>
          <Text>{data?.phone}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Special Req</Text>
          <Text>-</Text>
          <Text>{data?.special_req}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Title</Text>
          <Text>-</Text>
          <Text>{data?.title}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Tour Budget</Text>
          <Text>-</Text>
          <Text>{data?.tour_budget}</Text>
        </Flex>

        <Flex gap={{ base: "sm", sm: "lg" }}>
          <Text w={200}>Tour guide</Text>
          <Text>-</Text>
          <Text>{data?.tour_guide}</Text>
        </Flex>
      </Card.Section>
    </Card>
  );
};

export default BookNowDetail;
