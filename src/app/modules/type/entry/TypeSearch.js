import { Button, Flex, Group, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useState } from "react"
import { typeParamsInit } from "../useTypeParams"

export const TypeSearch = ({submitUserSearch, loading}) => {
    
    const [search, setSearch] = useState("");

    return(
        <Group>
            <Flex
                direction={"row"}
                justify={"flex-start"}
                align={"flex-end"}
            >
                <TextInput 
                    icon={<IconSearch />}
                    placeholder="Search items"
                    label="Search By"
                    disabled={loading}
                    description={`[${typeParamsInit.columns}]`}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            submitUserSearch(search);
                        }
                    }}
                />

                <Button
                    color={'red.8'}
                    disabled={loading}
                    mx={10}
                    variant="outline"
                    onClick={() => submitUserSearch("")}
                >
                    Reset
                </Button>
            </Flex>
        </Group>
    )
}