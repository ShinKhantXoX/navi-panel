import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getReqeust } from '../../../services/apiService';
import { updateNotification } from '../../../redux/notificationSlice';
import { Card, Image, Text, Badge, Button, Group, Grid, Flex } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';

const BookNowDetail = () => {
    // const params = useParams();
    // console.log(params)
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const params = useParams();
    console.log(params)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await getReqeust(`book-form/show/${params.id}`);
        console.log(response);

        if (response && (response.status === 401 || response.status === 500 || response.status === 403)) {
            dispatch(updateNotification({
                title: "Error",
                message: response.message,
                status: 'fail'
            }));
            setLoading(false);
            return;
        }

        if (response && response.status === 200) {
            setData(response.data);
            setLoading(false);
            return;
        }
    }, [dispatch, params.id])

    useEffect(() => {
        loadingData();
    }, [loadingData])

    return (
        <Card shadow="sm" padding="lg" radius="lg" w={600} className="card-border">
            <Flex direction={"row"} justify={"space-between"}>
                <Card.Section>
                    <Text fw={650} fz="xl" lh="md" pl={20} pt={10} mb={20}>Book Now Detail</Text>
                </Card.Section>

                <Button mt={9} justify="flex-end" align variant="outline" color="grape.9" onClick={() => navigate('/book-now')}>
                    <IconArrowNarrowLeft size={20} />
                </Button>
            </Flex>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Accommodation</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.accommodation}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Address</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.address}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Adult</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.adult}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Arrival Date</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.arrival_date}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Child</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.child}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Departure Date</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.departure_date}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Email</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.email}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Flight</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.flight}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Full Name</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.full_name}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Guide Type</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.guide_type}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Hotel Budget</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.hotel_budget}</Text>
                </Grid.Col>
            </Grid>


            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Hotel Star</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.flight}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Infants</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.infants}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Language</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.language}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Language Requirement</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.language_requirement}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Nationality</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.nationality}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Passport Number</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.passport_number}</Text>
                </Grid.Col>
            </Grid>


            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Phone</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.phone}</Text>
                </Grid.Col>
            </Grid>


            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Special Request</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.special_req}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Title</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.title}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Tour Budget</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.tour_budget}</Text>
                </Grid.Col>
            </Grid>

            <Grid gutter='md'>
                <Grid.Col span={4}>
                    <Text fw={600}>Tour Guide</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                    <Text fw={600}>{data?.flight}</Text>
                </Grid.Col>
            </Grid>
        </Card>
    );
}

export default BookNowDetail


// hotel_star: "5"

// phone: "121121212"
// special_req: "none"
// title: "Mr ."
// tour_budget: "$ 1200"
// tour_guide: 1
// tour_id: 341636910268610
// updated_at: "2023-09-26T03:52:00.000000Z"
// updated_by: null