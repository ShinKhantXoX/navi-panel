import {
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
  
  export const CreatePackage = () => {
    useDocumentTitle("New Package");
  
    const [payload, setPayload] = useState('');
    const [type, setType] = useState();
    const [typeId, setTypeId] = useState();
    const [mainPayload, setMainPayload] = useState({
      name : '',
      types_id : '',
      country_photo: ''
    })
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
  
    const selectImage = useSelector((state) => state.imageSelect);

    const loadingData = useCallback(async () => {
        const response = await getReqeust("type/list");
        console.log(response);

        
        if(response && (response.status === 500 || response.status === 403)) {
            dispatch(updateNotification({
                title: "Error: Retrived type status",
                message: response.message,
                status: 'fail'
            }));  
            setLoading(false);
            return;
        }

        if(response && response.status === 200) {
            // setDescription(response.data.toString());
            let itemData = response?.data?.map((type) => {
                return {
                    value : type?.id,
                    label: type?.name
                }
            });
            setType(itemData);
            setLoading(false);
            return;
        }

    },[dispatch]);
  
    const submitCreateCountry = async () => {
      setLoading(true);
      setErrors(null);
    //   return;
  
      const response = await postRequest("package/create", mainPayload);
  
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
          name : payload,
          types_id : typeId,
          photo : selectImage?.url
        })
    }, [selectImage, payload,typeId])
  
    useEffect(() => {
        loadingData();
    }, [loadingData]);
  
    return (
      <Grid>
        <Grid.Col md={12}>
          <Flex direction={"row"} justify={"flex-end"} align={"center"}>
            <Group>
              <NavButton
                label="Package List"
                click={() => navigate("/package")}
              />
            </Group>
          </Flex>
        </Grid.Col>
  
        <Grid.Col sm={12} md={6}>
          <Card p={20} className="card-border">
            <Card.Section my={20}>
              <Text sx={{ fontSize: 20, fontWeight: 500 }}> Create Package </Text>
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
                type && (
                    <Select
                    label="Choose Type"
                    // description={description}
                    dropdownPosition={"bottom"}
                    data={type ? type : null}
                    defaultValue={payload.types_id || ''}
                    nothingFound="No Status Found"
                    clearable
                    disabled={loading}
                    // value={typeId}
                    maxDropdownHeight={100}
                    error={errors && errors['type'] && (<FormValidationMessage message={errors['type'][0]} />)}                      
                    onChange={(e) => setTypeId(e)}
                />
                )
            }
  
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
                onChange={(e) => setPayload(e.target.value)
                }
              />
  
                {/* <div className={'hidden'}> */}
                {/* </div> */}
  
              <SaveButton
                loading={loading}
                submit={() => submitCreateCountry()}
              />
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    );
  };
  