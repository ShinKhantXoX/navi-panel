import { Badge, Card, Divider, Flex, Grid, Group, Image, NavLink, Text } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { useNavigate } from "react-router-dom";
import {DataTable} from "mantine-datatable";
import { useCallback, useEffect, useState } from "react";
import { getReqeust } from "../../../services/apiService";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../../redux/notificationSlice";
import { NavButton } from "../../../components/NavButton";
import { itineraryParamsInit } from "../useItineraryParams";
import { minHeight, paginationSize, recordsPerPageOptions } from "../../../config/datatable";
import { ItinerarySearch } from "../entry/ItinerarySearch";

export const ItineraryList = () => {
    useDocumentTitle("Itinerary List");

    const [loading, setLoading] = useState(false);
    const [records, setRecord] = useState([]);
    const [total, setTotal] = useState(0);
    const [params, setParams] = useState(itineraryParamsInit);
    const [sortStatus, setSortStatus] = useState({ columnAccessor: 'id', direction: 'asc' });
 
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const columns = [
        {
            accessor: "id", title: "Id", sortable: true, render: ({id}) => {
                return (
                    <NavLink 
                        sx={{
                            color: "blue",
                            textDecoration: 'underline'
                        }}
                        label={id}
                        onClick={() => navigate(`${id}`)}
                    />
                )
            }
        },
        { accessor: "title", title: 'Title', sortable: true, render : ({title}) => {
            return (
                <div>{title?.substring(0,5)} ...</div>
            )
        } },
        { accessor: "content", title: 'Content', sortable: true, render : ({content}) => {
            return (
                <div>{content?.substring(0,5)} ...</div>
            )
        } },
        { accessor: "content_photo", title: 'Content Photo', sortable: true, render: ({content_photo}) => {
            return (
                <>
                    {
                        content_photo ? (
                            <Image
                            src={content_photo ? content_photo : null} 
                            width={50}
                            height={50}
                            mx={'auto'}
                            withPlaceholder
                            />
                        ) : (
                            <Image w={20} h={20} radius="md" src={null} alt="Random image" withPlaceholder />
                        )
                    }
                </>
            )
        } },
    ];

    const sortStatusHandler = (e) => {
        let updateSortStatus = {...sortStatus};
        updateSortStatus.columnAccessor = e.columnAccessor;
        updateSortStatus.direction = e.direction;
        setSortStatus(updateSortStatus);

        let updateParams = {...params};
        updateParams.order = sortStatus.columnAccessor;
        updateParams.sort = sortStatus.direction;
        setParams(updateParams);
    }

    const paginateHandler = (e, field) => {
        let updateParams = {...params};
        updateParams[field] = e;
        setParams(updateParams);
    }

    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await getReqeust("itinerary/list", params);
        console.log(response);

        if(response && (response.status === 401 || response.status === 500 || response.status === 403)) {
            dispatch(updateNotification({
                title: "Error",
                message: response.message,
                status: 'fail'
            }));  
            setLoading(false);
            return;
        }

        if(response && response.status === 200) {
            setRecord(response?.data?.data);
            setTotal(response?.data.total);
            setLoading(false);
            return;
        }
    }, [dispatch, params]);

    useEffect(() => {
        if(params) {
            loadingData();
        }
    }, [params, loadingData]);

    return(
        <Grid gutter={0}>
            <Grid.Col span={12} my={10}>
                <Flex
                    direction={"row"}
                    align={"center"}
                    justify={"space-between"}
                >
                    <ItinerarySearch 
                        loading={loading}
                        submitUserSearch={(e) => paginateHandler(e, 'search')}
                    />

                    <Group> 
                        <NavButton color={'red.8'} label="Create" disabled={loading} click={() => navigate("/itinerary/new")} />
                    </Group>
                </Flex>
            </Grid.Col>

            <Grid.Col my={10}>
                <Card p={20} className="card-border">
                    <Card.Section my={10}>
                        <Text sx={{ fontSize: 20, fontWeight: 500}}> Itinerary List </Text>
                        <Divider my={10} variant="dashed" />
                    </Card.Section>

                    <Card.Section my={20}>
                        <DataTable 
                            minHeight={minHeight}
                            striped
                            highlightOnHover
                            records={records}
                            columns={columns}
                            sortStatus={sortStatus}
                            totalRecords={total}
                            recordsPerPage={params.per_page}
                            page={params.page}
                            paginationSize={paginationSize}
                            recordsPerPageOptions={recordsPerPageOptions}
                            onSortStatusChange={(e) => sortStatusHandler(e)}
                            onRecordsPerPageChange={(e) => paginateHandler(e, 'per_page')}
                            onPageChange={(e) => paginateHandler(e, 'page')}
                        />
                    </Card.Section>
                </Card>
            </Grid.Col>
        </Grid>
    )
}