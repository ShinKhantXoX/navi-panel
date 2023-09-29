import { Button, Card, Divider, Flex, Grid, Group, Image, NavLink, Text } from "@mantine/core"
import { useDocumentTitle } from "@mantine/hooks"
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getReqeust } from "../../../services/apiService";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../../redux/notificationSlice";
import { RecycleMediaParams } from "../RecycleMediaParams";
import { NavButton } from "../../../components/NavButton";
import { DataTable } from "mantine-datatable";
import { minHeight, paginationSize, recordsPerPageOptions } from "../../../config/datatable";

const RecycleMedia = () => {
  useDocumentTitle("RecycleBin Media");

  const [loading, setLoading] = useState(false);
  const [records, setRecord] = useState([]);
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState(RecycleMediaParams);
  const [sortStatus, setSortStatus] = useState({ columnAccessor: 'id', direction: 'asc' });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const columns = [
    {
      accessor: "url", title: 'Photo', sortable: true, render: ({ url }) => {
        return (
          <>
            {
              url ? (
                <Image
                  src={url ? url : null}
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
      }
    },
    {
      accessor: "name", title: 'Name', sortable: true, render: ({ name }) => {
        return (
          <div>{name?.substring(0, 5)} ...</div>
        )
      }
    },
    {
      accessor: "size", title: 'Size', sortable: true, render: ({ size }) => {
        return (
          <div>{size?.substring(0, 5)} ...</div>
        )
      }
    },
    {
      accessor: "id", title: 'Control', sortable: true, render: ({ id }) => {
        return (
          <>
            <Button
              variant="outline"
              color="blue"
              onClick={() => navigate(`${id}`)}
            >
              Restore
            </Button>
            <Button
              variant="outline"
              color="blue"
              onClick={() => navigate(`${id}`)}
              ml={5}
            >
              Delete
            </Button>
          </>
        )
      }
    },
  ];

  const sortStatusHandler = (e) => {
    let updateSortStatus = { ...sortStatus };
    updateSortStatus.columnAccessor = e.columnAccessor;
    updateSortStatus.direction = e.direction;
    setSortStatus(updateSortStatus);

    let updateParams = { ...params };
    updateParams.order = sortStatus.columnAccessor;
    updateParams.sort = sortStatus.direction;
    setParams(updateParams);
  }

  const paginateHandler = (e, field) => {
    let updateParams = { ...params };
    updateParams[field] = e;
    setParams(updateParams);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    const response = await getReqeust("photo/trash", params);
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
      setRecord(response?.data?.data);
      setTotal(response?.data.total);
      setLoading(false);
      return;
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (params) {
      loadingData();
    }
  }, [params, loadingData]);
  console.log(records);




  return (
    <Grid gutter={0}>

      <Grid.Col span={12} my={10}>
        <Flex
          gap={10}
          direction={{ sm: 'column', md: 'row', lg: 'row' }}
          align={"center"}
          justify={"space-between"}
        >
          {/* <TrashMediaSearch
            loading={loading}
            submitCountrySearch={(e) => paginateHandler(e, 'search')}
          /> */}
        </Flex>
      </Grid.Col>

      <Grid.Col my={10}>
        <Card p={20} className="card-border">
          <Card.Section my={10}>
            <Text sx={{ fontSize: 20, fontWeight: 500 }}> Trash Media List </Text>
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
              onRowClick={(e) => {
                navigate(`/bin/${e.id}`)
              }}
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

export default RecycleMedia;