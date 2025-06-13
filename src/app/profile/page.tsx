"use client"

// import MarketDetailSkeleton from "@/components/skeletons/MarketDetailSkeleton";
// import { useMarketData } from "@/hooks/useMarketData copy";
import { Box, Flex, Grid, Group, Table, Text } from "@mantine/core";
// import { useParams } from "next/navigation";
import React, { FC, useState } from "react";
import Image from "next/image";
import { IconActivity, IconChartBar, IconCircleCheck, IconMinus, IconSearch, IconTrendingUp } from "@tabler/icons-react";
import { formatAddress } from "@/utils/global";
import useIsMobile from "@/hooks/useIsMobile";

function Profile() {
    const TABLE_TAGS = [
        { name: "My details", key: "my_details" },
        { name: "Activity", key: "activity" }
    ];

    // const params = useParams();
    const [selectedTag, setSelectedTag] = useState<string>("my_details");
    const isMobile = useIsMobile();

    // const options = {
    //     title: {
    //         text: 'SuiMarket',
    //         align: 'right',
    //         style: {
    //             color: "#666666"
    //         }
    //     },
    //     chart: {
    //         backgroundColor: "transparent"
    //     },
    //     xAxis: {
    //         labels: { enabled: true },
    //         lineWidth: 0,
    //         tickLength: 0
    //     },
    //     legend: {
    //         enabled: false // ensure legend is visible
    //     },
    //     series: [{
    //         data: [1, 2, 3]
    //     }]
    // }

    return <Box mt={30}>
        {
            // isLoading ? <MarketDetailSkeleton /> :
                <Flex direction="column" gap="32px">
                    <Flex gap={20}>
                        <Image src="/img/btc_large.png" alt="" width={89} height={88} />
                        <Flex direction="column" justify="space-between">
                            <Group gap={6} align="center">
                                <Text size="24px">Emma Doe</Text>
                                <IconMinus color="#94969C" size="14px" />
                                <Text size="14px" style={{ color: "#94969C" }}>Joined My 2025</Text>
                            </Group>
                            <Box
                                p={10}
                                className="border border-[#333741] rounded-[30px] bg-[#161B26] w-[120]"
                            >
                                <Text size="14px">
                                    {formatAddress("0x0123230194019209102901")}
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                    <Grid>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 3 }}>
                            <CardItem
                                icon={{
                                    component: <IconActivity />,
                                    bg: "#BA24D54D"
                                }}
                                title="Positions value"
                                value="0.00"
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 2, lg: 3 }}>
                            <CardItem
                                icon={{
                                    component: <IconTrendingUp />,
                                    bg: "#FDB0224D"
                                }}
                                title="Profit/loss"
                                value="0.00"
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 3 }}>
                            <CardItem
                                icon={{
                                    component: <IconChartBar />,
                                    bg: "#47CD894D"
                                }}
                                title="Volume traded"
                                value="0.00"
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 3 }}>
                            <CardItem
                                icon={{
                                    component: <IconCircleCheck />,
                                    bg: "#22CCEE4D"
                                }}
                                title="Markets traded"
                                value="0.00"
                            />
                        </Grid.Col>
                    </Grid>
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
                                            bg={selectedTag === item.key ? "rgba(46, 144, 250, 0.4)" : "transparent"}
                                            style={{
                                                borderBottom: `2px solid ${selectedTag === item.key ? "rgba(46, 144, 250, 1)" : "#333741"}`
                                            }}
                                            className="cursor-pointer"
                                            onClick={() => setSelectedTag(item.key)}
                                        >
                                            <Text
                                                style={{
                                                    color: selectedTag === item.key ? "white" : "#94969C",
                                                }}
                                                className="bold-text"
                                            >{item.name}</Text>
                                        </Flex>
                                    </Box>
                                )
                            }
                        </Flex>
                        <Table verticalSpacing="md"
                        >
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th w="50%"><Text size="12px" style={{ color: "#94969C" }}>Market</Text></Table.Th>
                                    <Table.Th><Text size="12px" style={{ color: "#94969C" }}>AVG</Text></Table.Th>
                                    <Table.Th><Text size="12px" style={{ color: "#94969C" }}>Current</Text></Table.Th>
                                    <Table.Th><Text size="12px" style={{ color: "#94969C" }}>Value</Text></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr >
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
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Box>
                </Flex>
        }
    </Box>
}

interface CardItemType {
    icon: {
        component: React.ReactElement,
        bg: string
    },
    title: string,
    value: string
}

const CardItem: FC<CardItemType> = ({ icon, title, value }) => {
    return <Box className="border border-[#1F242F] rounded-[15px] bg-gradient-to-r from-[#080c16] via-[#0d1323] to-[#080c16] w-full">
        <div className="bg-gradient-to-r from-[#080c16] via-[#284f8a] to-[#080c16] m-auto h-[1px]">
        </div>
        <Box
            p={16}
        >
            <Flex direction="column" gap="16px">
                <Box
                    p={10}
                    bg={icon.bg}
                    w={45}
                    className="rounded-md"
                >
                    {icon.component}
                </Box>
                <Text style={{ color: "#94969C" }} size="14px">
                    {title}
                </Text>
                <Text size="24px" className="bold-text">
                    ${value}
                </Text>
            </Flex>
        </Box>

    </Box>
}

export default Profile;