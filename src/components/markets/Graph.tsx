import { Box, Flex, Group, Menu, Radio, Text } from "@mantine/core";
import { IconChevronUp, IconFilter, IconChevronDown, IconDots, IconLink, IconBookmark, IconFileCode2, IconCode, IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

function Graph() {
    const FILTER_OPTIONS = [
        { name: "All", key: "all" },
        { name: "1 Month", key: "1_month" },
        { name: "1 Week", key: "1_week" },
        { name: "1 Day", key: "1_day" },
        { name: "6 Hours", key: "6_hours" },
        { name: "1 Hour", key: "1_hour" },
    ];

    const [selectedTime, setSelectedTime] = useState<string>(FILTER_OPTIONS[0].key);
    const [openedFilter, setOpenedFilter] = useState<boolean>(false);
    const [openedMenu, setOpenedMenu] = useState<boolean>(false);
    const HIGHCHART_OPTIONS = {
        chart: {
            type: 'spline',
            height: 250,
            scrollablePlotArea: {
                minWidth: 600,
                scrollPositionX: 1
            },
            backgroundColor: "transparent"
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: `
                
            `,
            align: 'right'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify',
                style: {
                    color: 'rgba(148, 150, 156, 1)'
                }
            },
            tickLength: 0
        },
        yAxis: {
            title: {
                text: ''
            },
            minorGridLineWidth: 0,
            gridLineWidth: 1,
            gridLineColor: 'rgba(148, 150, 156, 1)',
            alternateGridColor: null,
            labels: {
                style: {
                    color: 'rgba(148, 150, 156, 1)'
                }
            },
            tickLength: 0
        },
        tooltip: {
            valueSuffix: ' m/s'
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 3600000, // one hour
                pointStart: '2014-02-29'
            }
        },
        series: [{
            name: 'Hestavollane',
            data: [
                12.9, 13.8, 10.2, 8.4, 10.0, 9.2, 10.0,
                12.2, 13.2, 12.7, 12.5, 11.4, 10.4,
                7.9, 8.0, 11.4, 11.5, 12.0, 12.0,
                10.4, 11.2, 11.5, 12.2, 11.5, 8.3
            ]

        }, {
            name: 'Vik',
            data: [
                null, 1.3, 1.1, 0.8, 1.8, 1.7, 0.8,
                0.8, 1.0, 1.0, 1.0, 0.8, 1.4,
                1.3, 2.9, 6.1, 6.4, 6.6, 6.4,
                6.3, 5.4, 3.9, 3.0, 1.7, 1.4
            ]
        }],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    };

    return <Box className="border border-[#1F242F] rounded-[15px] bg-gradient-to-r from-[#080c16] via-[#0d1323] to-[#080c16] w-full h-[345px]">
        <div className="bg-gradient-to-r from-[#080c16] via-[#284f8a] to-[#080c16] m-auto h-[1px]">
        </div>
        <Box
            p={14}
        >
            <Flex justify="space-between" align="center">
                <Menu width={200} position="bottom-start"
                    opened={openedFilter} onChange={setOpenedFilter}
                >
                    <Menu.Target>
                        <Flex
                            justify="space-between"
                            className="
                                            border-1 border-blue-500 rounded-md
                                            transition duration-300
                                            hover:ring-2 hover:ring-blue-400 hover:ring-opacity-20
                                            hover:outline-none    
                                            cursor-pointer
                                        "
                            p={12}
                            align="center"
                            w={150}
                        >
                            <Flex
                                gap={8}
                                align="center"
                            >
                                <IconFilter size={18} color="#94969C" />
                                <Text size="16px">
                                    Filters
                                </Text>
                            </Flex>
                            {
                                openedFilter ? <IconChevronUp color="#94969C" /> : <IconChevronDown color="#94969C" />
                            }
                        </Flex>
                    </Menu.Target>
                    <Menu.Dropdown
                    >
                        {
                            FILTER_OPTIONS.map((item, index) =>

                                <Menu.Item w={200} key={`{filter-${index}`}
                                    onClick={() => setSelectedTime(item.key)}
                                >
                                    <Group>
                                        <Radio defaultChecked={selectedTime === item.key ? true : false} />
                                        {item.name}
                                    </Group>
                                </Menu.Item>
                            )
                        }
                    </Menu.Dropdown>
                </Menu>
                <Menu width={220} position="bottom-end"
                    opened={openedMenu} onChange={setOpenedMenu}
                >
                    <Menu.Target>
                        <IconDots color="rgba(148, 150, 156, 1)" cursor="pointer" />
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item>
                            <Flex gap={5} align="center">
                                <IconLink style={{ color: "rgba(206, 207, 210, 1)" }} size={14} />
                                <Text size="14px" style={{ color: "rgba(206, 207, 210, 1)" }}>Copy Link</Text>
                            </Flex>
                        </Menu.Item>
                        <Menu.Item>
                            <Flex gap={5} align="center">
                                <IconBookmark style={{ color: "rgba(206, 207, 210, 1)" }} size={14} />
                                <Text size="14px" style={{ color: "rgba(206, 207, 210, 1)" }}>Save</Text>
                            </Flex>
                        </Menu.Item>
                        <Menu.Divider></Menu.Divider>
                        <Menu.Item>
                            <Flex gap={5} align="center">
                                <IconFileCode2 style={{ color: "rgba(206, 207, 210, 1)" }} size={14} />
                                <Text size="14px" style={{ color: "rgba(206, 207, 210, 1)" }}>Save</Text>
                            </Flex>
                        </Menu.Item>
                        <Menu.Item>
                            <Flex gap={5} align="center">
                                <IconCode style={{ color: "rgba(206, 207, 210, 1)" }} size={14} />
                                <Text size="14px" style={{ color: "rgba(206, 207, 210, 1)" }}>Save</Text>
                            </Flex>
                        </Menu.Item>
                        <Menu.Item>
                            <Flex gap={5} align="center">
                                <IconSettings style={{ color: "rgba(206, 207, 210, 1)" }} size={14} />
                                <Text size="14px" style={{ color: "rgba(206, 207, 210, 1)" }}>Settings</Text>
                            </Flex>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Flex>
        </Box>
        <Box>
            <HighchartsReact
                highcharts={Highcharts}
                options={HIGHCHART_OPTIONS}
                containerProps={{ style: { height: "100%" } }}
            />
        </Box>
    </Box>
}

export default Graph;