"use client"

import {Badge, Box, Button, Flex, Grid, Text} from "@mantine/core";
import useIsMobile from "@/hooks/useIsMobile";
import CategoryCard from "@/components/CategoryCard";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import React from "react";
import {IconClock, IconFileCheck} from "@tabler/icons-react";
import Image from "next/image";
import {useRouter} from "next/navigation";

function CommingSoon() {
    const isMobile = useIsMobile();
    const router = useRouter();
    const responsiveCarousel = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 3000},
            items: 4
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 4
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };
    return <Box w="100%">
        <Flex
            direction="column"
            gap={100}
            w="100%"
        >
            <Flex
                bg={"rgba(31, 36, 47, 1)"}
                className="rounded-lg f-full"

            >
                <div className="bg-gradient-to-b from-[#080c16] via-[#284f8a] to-[#080c16] h-[300px] w-[1px]">
                </div>
                <Flex
                    align="center"
                    justify="space-around"
                    w={"100%"}
                    p={16}
                    direction={isMobile ? "column" : "row"}
                >
                    <img src="/img/3d_financial_tree.png" width={485} height={323}
                    />
                    <Flex
                        direction="column"
                        justify="center"
                        align="center"
                    >
                        <Text size="36px" style={{lineHeight: '43px'}}>Beging Your Crypto Journey</Text>
                        <Text size="16px" className="thin-text"
                              style={{color: "rgba(206, 207, 210, 1)", lineHeight: '20px'}} mt={15}>Join
                            thousands
                            of users earning real cash by completing
                            simple polls.</Text>
                        <Button color={"blue"} size="lg" w={300} mt={30}>Get Started</Button>
                    </Flex>
                </Flex>
            </Flex>
            <Box w="100%">
                <Flex justify="space-between">
                    <Text size="36px">Recent Categories</Text>
                    <Button
                        onClick={() => {
                            router.push("/markets");
                        }}
                    >View Markets</Button>
                </Flex>
                <Box mt={15}>
                    <Carousel
                        autoPlay={false}
                        swipeable={true}
                        draggable={true}
                        infinite={false}
                        partialVisible={false}
                        dotListClass="custom-dot-list-style"
                        responsive={responsiveCarousel}
                    >
                        <CategoryCard/>
                        <CategoryCard/>
                        <CategoryCard/>
                        <CategoryCard/>
                        <CategoryCard/>
                        <CategoryCard/>
                        <CategoryCard/>
                        <CategoryCard/>
                    </Carousel>
                </Box>
            </Box>
            <Box>
                <Flex justify="space-between">
                    <Text size="36px">Recent Activity</Text>
                    <Button>View Activity</Button>
                </Flex>
                <Grid>
                    <Grid.Col span={{md: 6, sm: 12}}>
                        <Box mt={25}
                             className="bg-gradient-to-r from-[#080c16] via-[#0d1323] to-[#080c16] border border-[#1F242F] rounded-[10px]">
                            <div className="bg-gradient-to-r from-[#080c16] via-[#284f8a] to-[#080c16] m-auto h-[1px]">
                            </div>
                            <Box p={16}>
                                <Flex direction="column" align="center" gap={15}>
                                    <IconFileCheck size="34px" color="rgba(117, 224, 167, 1)"/>
                                    <Text style={{color: "rgba(117, 224, 167, 1)"}} size="20px">Votes Posted</Text>
                                </Flex>
                                <Flex mt={20} direction="column" gap={20}>
                                    <Flex gap={15} className="border-b border-[#1F242F] pb-5"
                                          justify="space-between"
                                          align="center">
                                        <Flex gap={12}>
                                            <Image src="/img/btc_large.png" alt="" width={40} height={40}
                                                   className="rounded-[100%]"/>
                                            <Box>
                                                <Text size="14px">
                                                    Emily Paramer <span
                                                    style={{color: "rgba(117, 224, 167, 1)"}}>Voted</span> on
                                                </Text>
                                                <Text style={{color: "rgba(148, 150, 156, 1)"}} mt={2}>
                                                    Who will be the speaker of the house?
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Badge color={"rgba(148, 150, 156, 1)"} variant="outline">
                                            <Flex align="center" gap={3}>
                                                <IconClock color="rgba(148, 150, 156, 1)" size="12px"/>
                                                <Text size="12px" style={{color: "rgba(206, 207, 210, 1)"}}>2h
                                                    ago</Text>
                                            </Flex>
                                        </Badge>
                                    </Flex>
                                    <Flex gap={15} className="border-b border-[#1F242F] pb-5"
                                          justify="space-between"
                                          align="center">
                                        <Flex gap={12}>
                                            <Image src="/img/btc_large.png" alt="" width={40} height={40}
                                                   className="rounded-[100%]"/>
                                            <Box>
                                                <Text size="14px">
                                                    Emily Paramer <span
                                                    style={{color: "rgba(117, 224, 167, 1)"}}>Voted</span> on
                                                </Text>
                                                <Text style={{color: "rgba(148, 150, 156, 1)"}} mt={2}>
                                                    Who will be the speaker of the house?
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Badge color={"rgba(148, 150, 156, 1)"} variant="outline">
                                            <Flex align="center" gap={3}>
                                                <IconClock color="rgba(148, 150, 156, 1)" size="12px"/>
                                                <Text size="12px" style={{color: "rgba(206, 207, 210, 1)"}}>2h
                                                    ago</Text>
                                            </Flex>
                                        </Badge>
                                    </Flex>
                                    <Flex gap={15} className="border-b border-[#1F242F] pb-5"
                                          justify="space-between"
                                          align="center">
                                        <Flex gap={12}>
                                            <Image src="/img/btc_large.png" alt="" width={40} height={40}
                                                   className="rounded-[100%]"/>
                                            <Box>
                                                <Text size="14px">
                                                    Emily Paramer <span
                                                    style={{color: "rgba(117, 224, 167, 1)"}}>Voted</span> on
                                                </Text>
                                                <Text style={{color: "rgba(148, 150, 156, 1)"}} mt={2}>
                                                    Who will be the speaker of the house?
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Badge color={"rgba(148, 150, 156, 1)"} variant="outline">
                                            <Flex align="center" gap={3}>
                                                <IconClock color="rgba(148, 150, 156, 1)" size="12px"/>
                                                <Text size="12px" style={{color: "rgba(206, 207, 210, 1)"}}>2h
                                                    ago</Text>
                                            </Flex>
                                        </Badge>
                                    </Flex>
                                    <Flex gap={15} className="border-b border-[#1F242F] pb-5"
                                          justify="space-between"
                                          align="center">
                                        <Flex gap={12}>
                                            <Image src="/img/btc_large.png" alt="" width={40} height={40}
                                                   className="rounded-[100%]"/>
                                            <Box>
                                                <Text size="14px">
                                                    Emily Paramer <span
                                                    style={{color: "rgba(117, 224, 167, 1)"}}>Voted</span> on
                                                </Text>
                                                <Text style={{color: "rgba(148, 150, 156, 1)"}} mt={2}>
                                                    Who will be the speaker of the house?
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Badge color={"rgba(148, 150, 156, 1)"} variant="outline">
                                            <Flex align="center" gap={3}>
                                                <IconClock color="rgba(148, 150, 156, 1)" size="12px"/>
                                                <Text size="12px" style={{color: "rgba(206, 207, 210, 1)"}}>2h
                                                    ago</Text>
                                            </Flex>
                                        </Badge>
                                    </Flex>
                                </Flex>
                                <Box
                                    style={{position: "relative", bottom: 0, left: 0}}
                                >
                                    <Box
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "100%",
                                            height: '100px',
                                            background: "linear-gradient(to bottom, rgba(8, 12, 22, 0), rgba(8, 12, 22, 1))"
                                        }}
                                    >
                                        <Flex direction="column" justify="end" align="center" h="100%" pb={10}>
                                            <Button variant="outline">View more</Button>
                                        </Flex>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={{md: 6, sm: 12}}>
                        <Box mt={25}
                             className="bg-gradient-to-r from-[#080c16] via-[#0d1323] to-[#080c16] border border-[#1F242F] rounded-[10px]">
                            <div className="bg-gradient-to-r from-[#080c16] via-[#284f8a] to-[#080c16] m-auto h-[1px]">
                            </div>
                            <Box p={16}>
                                <Flex direction="column" align="center" gap={15}>
                                    <IconFileCheck size="34px" color="rgba(254, 200, 75, 1)"/>
                                    <Text style={{color: "rgba(254, 200, 75, 1)"}} size="20px">Markets Created</Text>
                                </Flex>
                                <Flex mt={20} direction="column" gap={20}>
                                    <Flex gap={15} className="border-b border-[#1F242F] pb-5"
                                          justify="space-between"
                                          align="center">
                                        <Flex gap={12}>
                                            <Image src="/img/btc_large.png" alt="" width={40} height={40}
                                                   className="rounded-[100%]"/>
                                            <Box>
                                                <Text size="14px">
                                                    Emily Paramer <span
                                                    style={{color: "rgba(254, 200, 75, 1)"}}>Voted</span> on
                                                </Text>
                                                <Text style={{color: "rgba(148, 150, 156, 1)"}} mt={2}>
                                                    Who will be the speaker of the house?
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Badge color={"rgba(148, 150, 156, 1)"} variant="outline">
                                            <Flex align="center" gap={3}>
                                                <IconClock color="rgba(148, 150, 156, 1)" size="12px"/>
                                                <Text size="12px" style={{color: "rgba(206, 207, 210, 1)"}}>2h
                                                    ago</Text>
                                            </Flex>
                                        </Badge>
                                    </Flex>
                                    <Flex gap={15} className="border-b border-[#1F242F] pb-5"
                                          justify="space-between"
                                          align="center">
                                        <Flex gap={12}>
                                            <Image src="/img/btc_large.png" alt="" width={40} height={40}
                                                   className="rounded-[100%]"/>
                                            <Box>
                                                <Text size="14px">
                                                    Emily Paramer <span
                                                    style={{color: "rgba(254, 200, 75, 1)"}}>Voted</span> on
                                                </Text>
                                                <Text style={{color: "rgba(148, 150, 156, 1)"}} mt={2}>
                                                    Who will be the speaker of the house?
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Badge color={"rgba(148, 150, 156, 1)"} variant="outline">
                                            <Flex align="center" gap={3}>
                                                <IconClock color="rgba(148, 150, 156, 1)" size="12px"/>
                                                <Text size="12px" style={{color: "rgba(206, 207, 210, 1)"}}>2h
                                                    ago</Text>
                                            </Flex>
                                        </Badge>
                                    </Flex>
                                    <Flex gap={15} className="border-b border-[#1F242F] pb-5"
                                          justify="space-between"
                                          align="center">
                                        <Flex gap={12}>
                                            <Image src="/img/btc_large.png" alt="" width={40} height={40}
                                                   className="rounded-[100%]"/>
                                            <Box>
                                                <Text size="14px">
                                                    Emily Paramer <span
                                                    style={{color: "rgba(254, 200, 75, 1)"}}>Voted</span> on
                                                </Text>
                                                <Text style={{color: "rgba(148, 150, 156, 1)"}} mt={2}>
                                                    Who will be the speaker of the house?
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Badge color={"rgba(148, 150, 156, 1)"} variant="outline">
                                            <Flex align="center" gap={3}>
                                                <IconClock color="rgba(148, 150, 156, 1)" size="12px"/>
                                                <Text size="12px" style={{color: "rgba(206, 207, 210, 1)"}}>2h
                                                    ago</Text>
                                            </Flex>
                                        </Badge>
                                    </Flex>
                                    <Flex gap={15} className="border-b border-[#1F242F] pb-5"
                                          justify="space-between"
                                          align="center">
                                        <Flex gap={12}>
                                            <Image src="/img/btc_large.png" alt="" width={40} height={40}
                                                   className="rounded-[100%]"/>
                                            <Box>
                                                <Text size="14px">
                                                    Emily Paramer <span
                                                    style={{color: "rgba(254, 200, 75, 1)"}}>Voted</span> on
                                                </Text>
                                                <Text style={{color: "rgba(148, 150, 156, 1)"}} mt={2}>
                                                    Who will be the speaker of the house?
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Badge color={"rgba(148, 150, 156, 1)"} variant="outline">
                                            <Flex align="center" gap={3}>
                                                <IconClock color="rgba(148, 150, 156, 1)" size="12px"/>
                                                <Text size="12px" style={{color: "rgba(206, 207, 210, 1)"}}>2h
                                                    ago</Text>
                                            </Flex>
                                        </Badge>
                                    </Flex>

                                </Flex>
                                <Box
                                    style={{position: "relative", bottom: 0, left: 0}}
                                >
                                    <Box
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "100%",
                                            height: '100px',
                                            background: "linear-gradient(to bottom, rgba(8, 12, 22, 0), rgba(8, 12, 22, 1))"
                                        }}
                                    >
                                        <Flex direction="column" justify="end" align="center" h="100%" pb={10}>
                                            <Button variant="outline">View more</Button>
                                        </Flex>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Box>
        </Flex>
    </Box>
}

export default CommingSoon;