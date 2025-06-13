"use client"
import { MARKET_CATEGORIES } from "@/utils/consistant";
import { Badge, Box, Button, Container, Flex, Group, Image, Table, Text, TextInput } from "@mantine/core";
import { IconBookmark, IconChevronDown, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

function Rewards() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    return <Box>
        <Flex h={150}
            className="bg-gradient-to-r from-[#ba6bda] to-[#335dfe]"
            align="center"
            justify="space-between"
            mt={-10}
            w={"calc(100%+40px)"}
        >
            <Container size={1200}>
                <Text size="30px" fw="bold">
                    Daily Rewards
                </Text>                
            </Container>
        </Flex>
        <Container size={1200} pt={20}>
            <Flex direction="column" gap={20}>
                <Box>
                    <Button
                        variant={"all" === selectedCategory ? "light" : "transparent"}
                        onClick={() => setSelectedCategory("all")}
                    >
                        <Text size="12px">All</Text>
                    </Button>
                    {
                        MARKET_CATEGORIES.map((item, index) =>
                            <Button
                                variant={item.key === selectedCategory ? "light" : "transparent"}
                                key={`category-${index}`}
                                onClick={() => setSelectedCategory(item.key)}
                            >
                                <Text size="12px">{item.name}</Text>
                            </Button>
                        )
                    }
                </Box>
                <TextInput
                    leftSection={<IconSearch size={14} />}
                />
                <Box>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th w="30%">Market</Table.Th>
                                <Table.Th>Max Spread</Table.Th>
                                <Table.Th>Min Shares</Table.Th>
                                <Table.Th>Reward</Table.Th>
                                <Table.Th>Comp</Table.Th>
                                <Table.Th>Earning</Table.Th>
                                <Table.Th>Percent</Table.Th>
                                <Table.Th>Price</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {
                                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,].map((item, index) =>
                                    <Table.Tr key={`table-item-${index}`}>
                                        <Table.Td>
                                            <Flex gap={5} align="start">
                                                <Image src="/img/btc_large.png" radius={5} w={30} h={30} />
                                                <Text size="12px">
                                                    Will  the price of Ethereum be less than $2400 on June 3 at 5 PM ET?
                                                </Text>
                                            </Flex>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="12px">
                                                3$
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="12px">
                                                100
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="12px">
                                                <Badge color="blue" variant="light">$5</Badge>
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Group gap={1}>
                                                <Box h={18} w={6} bg="red" className="rounded-sm"></Box>
                                                <Box h={18} w={6} bg="red" className="rounded-sm"></Box>
                                                <Box h={18} w={6} bg="red" className="rounded-sm"></Box>
                                                <Box h={18} w={6} bg="red" className="rounded-sm"></Box>
                                                <Box h={18} w={6} bg="red" className="rounded-sm"></Box>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="12px">
                                                <Badge color="blue" variant="light">$0.00</Badge>
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="12px">
                                                -
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <div>
                                                <span style={{ padding: '3px', backgroundColor: "rgba(7, 77, 49, 0.3)", borderRadius: '3px' }}>
                                                    <span style={{ color: "#47CD89", fontSize: "10px" }}>Yes 1.5$</span>
                                                </span>
                                            </div>
                                            <div className="mt-[5px]">
                                                <span style={{ padding: '3px', backgroundColor: "rgba(217, 45, 32, 0.3)", borderRadius: '3px' }}>
                                                    <span style={{ color: "#F97066", fontSize: "10px" }}>Yes 1.5$</span>
                                                </span>
                                            </div>
                                        </Table.Td>
                                        <Table.Td>
                                            <Group gap={10}>
                                                <IconBookmark color="white" size={17} cursor="pointer"/>
                                                <IconChevronDown color="white" size={17} cursor="pointer"/>
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                )
                            }
                        </Table.Tbody>
                    </Table>
                </Box>
            </Flex>
        </Container>
    </Box>
}

export default Rewards;