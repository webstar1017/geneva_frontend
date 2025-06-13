"use client"

import MarketDetailSkeleton from "@/components/skeletons/MarketDetailSkeleton";
import {useMarketData} from "@/hooks/useMarketData copy";
// import { useSuiWallet } from "@/hooks/useSuiWallet";
import {Box, Flex, Grid, Text} from "@mantine/core";
import {useParams} from "next/navigation";
import React from "react";
// import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'
import Image from "next/image";
import {IconClock, IconTrophy} from "@tabler/icons-react";
// import { formatAddress } from "@/utils/global";
import Trade from "@/components/markets/Trade";
import OrderBook from "@/components/markets/OrderBook";

function Details() {
    // const TRADES = [
    //     { name: "Yes", key: "yes" },
    //     { name: "Yes", key: "no" },
    // ]

    const params = useParams();
    const marketId = params.marketId as string;
    const {marketData, isLoading} = useMarketData(marketId);
    // const { connected, account, executeTransaction } = useSuiWallet();
    // const [isResolving, setIsResolving] = useState(false);
    // const [position, setPosition] = useState<boolean>(false);
    // const [suiValue, setSuiValue] = useState<number | string>('');

    // const [selectedTrade, setSelectedTrade] = useState<string>(TRADES[0].key);

    return <Box>
        {
            isLoading ? <MarketDetailSkeleton/> :
                <Box>
                    <Flex gap={20}>
                        <Image src="/img/btc_large.png" alt="" width={89} height={88}/>
                        <Flex direction="column" gap={15}>
                            <Text size="24px">
                                {marketData?.title}
                            </Text>
                            <Flex gap={10}>
                                <Flex gap={5} align="center">
                                    <IconTrophy size={16} color="#CECFD2"/>
                                    <Text size="14px" style={{color: "#CECFD2"}}>
                                        {marketData?.volume}
                                    </Text>
                                </Flex>
                                <Flex align="center">
                                    <IconClock size={16} color="#CECFD2"/>
                                    <Text style={{color: "#CECFD2"}}>
                                        {marketData?.endDate}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Grid mt={20}>
                        <Grid.Col span={{sm: 12, md: 8}}>
                            <Flex direction="column" gap="32px">
                                <OrderBook/>
                                <Box
                                    className="border-2 border-dashed border-[#1F242F] rounded-[15px] bg-gradient-to-r from-[#080c16] via-[#0d1323] to-[#080c16] w-full"
                                >
                                    <div
                                        className="bg-gradient-to-r from-[#080c16] via-[#284f8a] to-[#080c16] m-auto h-[1px]">
                                    </div>
                                    <Box p={16}>
                                        <Text size="24px">Rules</Text>
                                        <Flex gap={8} direction="column" mt={20}>
                                            <Text style={{color: "#94969C", lineHeight: '20px'}} size="14px">
                                                {marketData?.rule}
                                            </Text>
                                        </Flex>
                                    </Box>
                                </Box>
                            </Flex>
                        </Grid.Col>
                        <Grid.Col span={{sm: 12, md: 4}}>
                            <Trade/>
                        </Grid.Col>
                    </Grid>
                </Box>
        }
    </Box>
}

export default Details;