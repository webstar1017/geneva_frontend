import {Box, Flex, Table, Text, UnstyledButton} from "@mantine/core";
import React, {useState} from "react";

function OrderBook() {
    const [selectedTradeType, setSelectedTradeType] = useState<string>("yes");
    return <Box
        className="border border-[#1F242F] rounded-[5px] bg-gradient-to-r from-[#080c16] via-[#0d1323] to-[#080c16] w-full">
        <div
            className="bg-gradient-to-r from-[#080c16] via-[#284f8a] to-[#080c16] m-auto h-[1px]">
        </div>
        <Box
        >
            <Box p={25}>
                <Text size="25px">Order Book</Text>
                <Flex gap={20} mt={20}>
                    <UnstyledButton
                        onClick={() => {
                            setSelectedTradeType("yes")
                        }}
                    >
                        <Text
                            style={{color: selectedTradeType == "yes" ? "white" : "gray"}}
                        >Trade Yes</Text>
                    </UnstyledButton>
                    <UnstyledButton
                        onClick={() => {
                            setSelectedTradeType("no")
                        }}
                    >
                        <Text
                            style={{color: selectedTradeType == "no" ? "white" : "gray"}}
                        >Trade No</Text>
                    </UnstyledButton>
                </Flex>
            </Box>
            <Table borderColor="#1F242F" style={{borderTop: "1px solid #1F242F"}}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w="40%"><Text style={{color: "gray"}} size="12px">TRADE YES</Text></Table.Th>
                        <Table.Th w="20%"><Text style={{color: "gray"}} size="12px">PRICE</Text></Table.Th>
                        <Table.Th w="20%"><Text style={{color: "gray"}} size="12px">SHARES</Text></Table.Th>
                        <Table.Th w="20%"><Text style={{color: "gray"}} size="12px">TOTAL</Text></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr style={{borderBottom: 'none'}}>
                        <Table.Td>

                        </Table.Td>
                        <Table.Td>
                            <Text style={{color: "#F97066"}} size="13px">$0.9</Text>
                        </Table.Td>
                        <Table.Td>
                            <Text size="13px">78,123.45</Text>
                        </Table.Td>
                        <Table.Td>
                            <Text size="13px">78,123.45</Text>
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>

                        </Table.Td>
                        <Table.Td>
                            <Text style={{color: "#F97066"}} size="13px">$0.9</Text>
                        </Table.Td>
                        <Table.Td>
                            <Text size="13px">78,123.45</Text>
                        </Table.Td>
                        <Table.Td>
                            <Text size="13px">78,123.45</Text>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
            <Table borderColor="#1F242F" style={{borderTop: "1px solid #1F242F"}}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w="40%"><Text style={{color: "gray"}} size="12px">Last: 0.7$</Text></Table.Th>
                        <Table.Th w="20%"><Text style={{color: "gray"}} size="12px">Spread: 0.2$</Text></Table.Th>
                        <Table.Th w="20%"></Table.Th>
                        <Table.Th w="20%"></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr style={{borderBottom: 'none'}}>
                        <Table.Td style={{padding: 0}}>
                            <Box
                                style={{
                                    width: '70%',
                                    background: "rgba(7, 77, 49, 0.3)",
                                    height: "30px",
                                }}
                            >

                            </Box>
                        </Table.Td>
                        <Table.Td>
                            <Text style={{color: "#47CD89"}} size="13px">$0.9</Text>
                        </Table.Td>
                        <Table.Td>
                            78,123.45
                        </Table.Td>
                        <Table.Td>
                            $1,234.07
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr style={{borderBottom: 'none'}}>
                        <Table.Td p={0}>
                            <Box
                                style={{
                                    width: '20%',
                                    background: "rgba(7, 77, 49, 0.3)",
                                    height: "30px",
                                    marginTop: '-2px'
                                }}
                            >

                            </Box>
                        </Table.Td>
                        <Table.Td>
                            <Text style={{color: "#47CD89"}} size="13px">$0.9</Text>
                        </Table.Td>
                        <Table.Td>
                            <Text size="13px">78,123.45</Text>
                        </Table.Td>
                        <Table.Td>
                            <Text size="13px">78,123.45</Text>
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr style={{borderBottom: 'none'}}>
                        <Table.Td p={0}>
                            <Box
                                style={{
                                    width: '40%',
                                    background: "rgba(7, 77, 49, 0.3)",
                                    height: "30px",
                                    marginTop: '-0px'
                                }}
                            >

                            </Box>
                        </Table.Td>
                        <Table.Td>
                            <Text style={{color: "#47CD89"}} size="13px">$0.9</Text>
                        </Table.Td>
                        <Table.Td>
                            <Text size="13px">78,123.45</Text>
                        </Table.Td>
                        <Table.Td>
                            <Text size="13px">78,123.45</Text>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Box>
    </Box>
}

export default OrderBook;