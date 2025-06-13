import { MARKET_CATEGORIES } from "@/utils/consistant";
import { Box, Button, Flex, Grid, Group, Image, Menu, Text, TextInput } from "@mantine/core";
import { IconSearch, IconTrendingUp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

function SearchInput() {
    
    const [searchText, setSearchText] = useState<string>("");
    const [opened, setOpened] = useState<boolean>(false);

    return (
        <Menu shadow="md" width="450px" opened={opened} onChange={setOpened}
            trigger="click-hover"
            loop={false}
            withinPortal={false}
            trapFocus={false}
            menuItemTabIndex={0}
        >
            <Menu.Target>
                <TextInput
                    leftSection={<IconSearch size={14} />}
                    placeholder="Search markets"
                    value={searchText}
                    w={450}
                    onChange={(event) => {
                        setOpened(true);
                        setSearchText(event.currentTarget.value);
                    }}
                />
            </Menu.Target>
            <Menu.Dropdown mt={-10}>
                <Box p={15}>
                    {
                        searchText === "" ? <InitialSearcResult /> : <SearchedList data={[]}/>
                    }
                </Box>
            </Menu.Dropdown>
        </Menu>
    )
}

interface SearchedListProps {
    data: string[]
}

const SearchedList:FC<SearchedListProps> = ({ data }) => {
    const [status, setStatus] = useState<'active' | 'ended'>('active');
    
    return <Box>
        <Group gap={0}>
            <Button variant={ status === "active" ? "light" : "transparent" }
                onClick={() => {
                    setStatus("active");
                }}
            >
                <Text size="12px">Active</Text>
            </Button>
            <Button variant={ status === "ended" ? "light" : "transparent" }
                onClick={() => {
                    setStatus("ended");
                }}
            >
                <Text size="12px">Ended</Text>
            </Button>
        </Group>
        <Box>
            {
                data.length === 0 ? <div className="text-center"><Text size="12px">No results found</Text></div> : <></>
            }
        </Box>
    </Box>
}

const InitialSearcResult = () => {
    const router = useRouter();

    return <Box>
        <Text size="12px">
            BROWSE
        </Text>
        <Group gap={8} mt={15}>
            {
                MARKET_CATEGORIES.map((item, index) =>
                    <Button variant="light" p={7}
                        onClick={() => router.push(item.key)}
                        key={`search-button-${index}`}
                    >
                        <IconTrendingUp color="white" size={16} />
                        <Text size="12px" ml={3}>{item.name}</Text>
                    </Button>
                )
            }
        </Group>
        <Text size="12px" mt={30}>
            TOPICS
        </Text>
        <Grid mt={15}>
            <Grid.Col span={{ sm: 12, md: 6 }}>
                <Flex w={'100%'} p={8} align="center" gap={10}
                    className="border border-[#1F242F] rounded-md hover:bg-[#242f4c] cursor-pointer"
                >
                    <Image src="/img/btc_large.png" radius={5} w={30} h={30} />
                    <Text size="12px">Middle East</Text>
                </Flex>
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
                <Flex w={'100%'} p={8} align="center" gap={10}
                    className="border border-[#1F242F] rounded-md hover:bg-[#242f4c] cursor-pointer"
                >
                    <Image src="/img/btc_large.png" radius={5} w={30} h={30} />
                    <Text size="12px">Middle East</Text>
                </Flex>
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
                <Flex w={'100%'} p={8} align="center" gap={10}
                    className="border border-[#1F242F] rounded-md hover:bg-[#242f4c] cursor-pointer"
                >
                    <Image src="/img/btc_large.png" radius={5} w={30} h={30} />
                    <Text size="12px">Middle East</Text>
                </Flex>
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
                <Flex w={'100%'} p={8} align="center" gap={10}
                    className="border border-[#1F242F] rounded-md hover:bg-[#242f4c] cursor-pointer"
                >
                    <Image src="/img/btc_large.png" radius={5} w={30} h={30} />
                    <Text size="12px">Middle East</Text>
                </Flex>
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
                <Flex w={'100%'} p={8} align="center" gap={10}
                    className="border border-[#1F242F] rounded-md hover:bg-[#242f4c] cursor-pointer"
                >
                    <Image src="/img/btc_large.png" radius={5} w={30} h={30} />
                    <Text size="12px">Middle East</Text>
                </Flex>
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6 }}>
                <Flex w={'100%'} p={8} align="center" gap={10}
                    className="border border-[#1F242F] rounded-md hover:bg-[#242f4c] cursor-pointer"
                >
                    <Image src="/img/btc_large.png" radius={5} w={30} h={30} />
                    <Text size="12px">Middle East</Text>
                </Flex>
            </Grid.Col>
        </Grid>
    </Box>
}
export default SearchInput;