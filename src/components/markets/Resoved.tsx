import { Box, Flex, Table, Text } from "@mantine/core";
import Badge from "@/components/Badge";
import useIsMobile from "@/hooks/useIsMobile";
import { useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";

function Resolved() {
    const TABLE_TAGS = [
        { name: "Unsolved", key: "unsolved" },
        { name: "Resolved", key: "resolved" }
    ];
    const [selectedTableTag, setSelectedTableTag] = useState<string>(TABLE_TAGS[0].key);
    const isMobile = useIsMobile();

    return <Box>
        <Box
            style={{ border: '1px solid #333741' }}
        >
            <Flex
                direction={isMobile ? "column" : "row"}
            >
                {
                    TABLE_TAGS.map((item, index) =>
                        <Box key={`table-tag-${index}`} p={0} w={isMobile ? "100%" : "50%"}>
                            <Flex
                                h={44} w="100%" justify="center" align="center"
                                bg={selectedTableTag === item.key ? "rgba(46, 144, 250, 0.4)" : "transparent"}
                                style={{
                                    borderBottom: `2px solid ${selectedTableTag === item.key ? "rgba(46, 144, 250, 1)" : "#333741"}`
                                }}
                                className="cursor-pointer"
                                onClick={() => setSelectedTableTag(item.key)}
                            >
                                <Text
                                    style={{
                                        color: selectedTableTag === item.key ? "white" : "#94969C",
                                    }}
                                >{item.name}</Text>
                            </Flex>
                        </Box>
                    )
                }
            </Flex>
            <Table.ScrollContainer minWidth={500} maxHeight={400}>
                <Table verticalSpacing="md"
                    h={300}
                >
                    <Table.Thead>
                        <Table.Tr bg="#1F242F">
                            <Table.Th><Text size="12px" style={{ color: "#94969C" }}>Outcome</Text></Table.Th>
                            <Table.Th><Text size="12px" style={{ color: "#94969C" }}>Change</Text></Table.Th>
                            <Table.Th><Text size="12px" style={{ color: "#94969C" }}>Actions</Text></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                <Flex gap={10} align="center">
                                    <img src="/img/avatar.svg" width={40} height={30} />
                                    <Box>
                                        <Text style={{ color: "#F5F5F6" }} size="14px">Oklahoma City Thunder</Text>
                                        <Text style={{ color: "#94969C" }} size="12px" mt={10}>$9,125,244 Vol.</Text>
                                    </Box>
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={20}>
                                    <Text style={{ color: "#94969C" }} size="14px">78%</Text>
                                    <Badge
                                        content={<Flex gap={3} align="center">
                                            <IconArrowUp color="#17B26A" size={17} />
                                            <Text style={{ color: "#75E0A7" }} size="12px">2%</Text>
                                        </Flex>}
                                        type="success"
                                    />
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={12}>
                                    <Text style={{ color: "#47CD89" }}>Buy Yes $67</Text>
                                    <Text style={{ color: "#F97066" }}>Buy No $67</Text>
                                </Flex>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Flex gap={10} align="center">
                                    <img src="/img/avatar.svg" width={40} height={30} />
                                    <Box>
                                        <Text style={{ color: "#F5F5F6" }} size="14px">Oklahoma City Thunder</Text>
                                        <Text style={{ color: "#94969C" }} size="12px" mt={10}>$9,125,244 Vol.</Text>
                                    </Box>
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={20}>
                                    <Text style={{ color: "#94969C" }} size="14px">78%</Text>
                                    <Badge
                                        content={<Flex gap={3} align="center">
                                            <IconArrowUp color="#17B26A" size={17} />
                                            <Text style={{ color: "#75E0A7" }} size="12px">2%</Text>
                                        </Flex>}
                                        type="success"
                                    />
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={12}>
                                    <Text style={{ color: "#47CD89" }}>Buy Yes $67</Text>
                                    <Text style={{ color: "#F97066" }}>Buy No $67</Text>
                                </Flex>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Flex gap={10} align="center">
                                    <img src="/img/avatar.svg" width={40} height={30} />
                                    <Box>
                                        <Text style={{ color: "#F5F5F6" }} size="14px">Oklahoma City Thunder</Text>
                                        <Text style={{ color: "#94969C" }} size="12px" mt={10}>$9,125,244 Vol.</Text>
                                    </Box>
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={20}>
                                    <Text style={{ color: "#94969C" }} size="14px">78%</Text>
                                    <Badge
                                        content={<Flex gap={3} align="center">
                                            <IconArrowUp color="#17B26A" size={17} />
                                            <Text style={{ color: "#75E0A7" }} size="12px">2%</Text>
                                        </Flex>}
                                        type="success"
                                    />
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={12}>
                                    <Text style={{ color: "#47CD89" }}>Buy Yes $67</Text>
                                    <Text style={{ color: "#F97066" }}>Buy No $67</Text>
                                </Flex>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Flex gap={10} align="center">
                                    <img src="/img/avatar.svg" width={40} height={30} />
                                    <Box>
                                        <Text style={{ color: "#F5F5F6" }} size="14px">Oklahoma City Thunder</Text>
                                        <Text style={{ color: "#94969C" }} size="12px" mt={10}>$9,125,244 Vol.</Text>
                                    </Box>
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={20}>
                                    <Text style={{ color: "#94969C" }} size="14px">78%</Text>
                                    <Badge
                                        content={<Flex gap={3} align="center">
                                            <IconArrowUp color="#17B26A" size={17} />
                                            <Text style={{ color: "#75E0A7" }} size="12px">2%</Text>
                                        </Flex>}
                                        type="success"
                                    />
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={12}>
                                    <Text style={{ color: "#47CD89" }}>Buy Yes $67</Text>
                                    <Text style={{ color: "#F97066" }}>Buy No $67</Text>
                                </Flex>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Flex gap={10} align="center">
                                    <img src="/img/avatar.svg" width={40} height={30} />
                                    <Box>
                                        <Text style={{ color: "#F5F5F6" }} size="14px">Oklahoma City Thunder</Text>
                                        <Text style={{ color: "#94969C" }} size="12px" mt={10}>$9,125,244 Vol.</Text>
                                    </Box>
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={20}>
                                    <Text style={{ color: "#94969C" }} size="14px">78%</Text>
                                    <Badge
                                        content={<Flex gap={3} align="center">
                                            <IconArrowUp color="#17B26A" size={17} />
                                            <Text style={{ color: "#75E0A7" }} size="12px">2%</Text>
                                        </Flex>}
                                        type="success"
                                    />
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={12}>
                                    <Text style={{ color: "#47CD89" }}>Buy Yes $67</Text>
                                    <Text style={{ color: "#F97066" }}>Buy No $67</Text>
                                </Flex>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Flex gap={10} align="center">
                                    <img src="/img/avatar.svg" width={40} height={30} />
                                    <Box>
                                        <Text style={{ color: "#F5F5F6" }} size="14px">Oklahoma City Thunder</Text>
                                        <Text style={{ color: "#94969C" }} size="12px" mt={10}>$9,125,244 Vol.</Text>
                                    </Box>
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={20}>
                                    <Text style={{ color: "#94969C" }} size="14px">78%</Text>
                                    <Badge
                                        content={<Flex gap={3} align="center">
                                            <IconArrowUp color="#17B26A" size={17} />
                                            <Text style={{ color: "#75E0A7" }} size="12px">2%</Text>
                                        </Flex>}
                                        type="success"
                                    />
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={12}>
                                    <Text style={{ color: "#47CD89" }}>Buy Yes $67</Text>
                                    <Text style={{ color: "#F97066" }}>Buy No $67</Text>
                                </Flex>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Flex gap={10} align="center">
                                    <img src="/img/avatar.svg" width={40} height={30} />
                                    <Box>
                                        <Text style={{ color: "#F5F5F6" }} size="14px">Oklahoma City Thunder</Text>
                                        <Text style={{ color: "#94969C" }} size="12px" mt={10}>$9,125,244 Vol.</Text>
                                    </Box>
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={20}>
                                    <Text style={{ color: "#94969C" }} size="14px">78%</Text>
                                    <Badge
                                        content={<Flex gap={3} align="center">
                                            <IconArrowUp color="#17B26A" size={17} />
                                            <Text style={{ color: "#75E0A7" }} size="12px">2%</Text>
                                        </Flex>}
                                        type="success"
                                    />
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={12}>
                                    <Text style={{ color: "#47CD89" }}>Buy Yes $67</Text>
                                    <Text style={{ color: "#F97066" }}>Buy No $67</Text>
                                </Flex>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Flex gap={10} align="center">
                                    <img src="/img/avatar.svg" width={40} height={30} />
                                    <Box>
                                        <Text style={{ color: "#F5F5F6" }} size="14px">Oklahoma City Thunder</Text>
                                        <Text style={{ color: "#94969C" }} size="12px" mt={10}>$9,125,244 Vol.</Text>
                                    </Box>
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={20}>
                                    <Text style={{ color: "#94969C" }} size="14px">78%</Text>
                                    <Badge
                                        content={<Flex gap={3} align="center">
                                            <IconArrowUp color="#17B26A" size={17} />
                                            <Text style={{ color: "#75E0A7" }} size="12px">2%</Text>
                                        </Flex>}
                                        type="success"
                                    />
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Flex align="center" gap={12}>
                                    <Text style={{ color: "#47CD89" }}>Buy Yes $67</Text>
                                    <Text style={{ color: "#F97066" }}>Buy No $67</Text>
                                </Flex>
                            </Table.Td>
                        </Table.Tr>
                        {/* <Table.Tr >
                                                <Table.Td colSpan={4} rowSpan={7} p={0}>
                                                    <Box className="bg-gradient-to-r from-[#080c16] via-[#0d1323] to-[#080c16] w-full h-[400px]">
                                                        <div className="bg-gradient-to-r from-[#080c16] via-[#284f8a] to-[#080c16] m-auto h-[1px]">
                                                        </div>
                                                        <Flex align="center" justify="center" gap={10} h={400} direction="column">
                                                            <Box
                                                                p={12}
                                                                className="border border-[#333741] rounded-[10]"
                                                            >
                                                                <IconSearch size={24} />
                                                            </Box>

                                                            <Text style={{ color: "#F5F5F6" }}>No acitvity found</Text>
                                                            <Text style={{ color: "#94969C" }} size="14px">
                                                                {`Looks like it's empty. Your data will appear here when available.`}
                                                            </Text>
                                                        </Flex>
                                                    </Box>
                                                </Table.Td>
                                            </Table.Tr> */}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Box>
    </Box>
}

export default Resolved;