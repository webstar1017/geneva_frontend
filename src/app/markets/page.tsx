"use client"

import CategoryHeader from "@/components/layouts/CategoryHeader";
import MarketCard from "@/components/MarketCard";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { useMarkets } from "@/hooks/useMarketData copy";
import HomeContext from "@/state/index.context";
import MarketData from "@/types/MarketData";
import { Box, Grid, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import 'react-multi-carousel/lib/styles.css';

function Markets() {
    const { markets, isLoading } = useMarkets();
    const [filteredMarkets, setFilteredMarkets] = useState<MarketData[]>([]);

    const {
        state: { selectedCategory }
    } = useContext(HomeContext);

    useEffect(() => {
        if (markets) {
            // const filters = [];
            // for(let k = 0; k < 30; k++) 
            //     filters.push(
            //         {
            //             category: "crypto",
            //             creator
            //                 :
            //                 "0x5b43b6e6b5c9e6ca90e6b5960c6909360d1cb98a0c0d46db54825194870ddc78",
            //             description
            //                 :
            //                 "dfadf",
            //             endDate
            //                 :
            //                 "5/31/2025",
            //             id
            //                 :
            //                 "0xf6667f840a4ef5c2086065a624177ca5a629f3aa7983dfb1921516251dc2a45a",
            //             liquidity
            //                 :
            //                 "$0.00",
            //             noPrice
            //                 :
            //                 "0.50",
            //             outcome
            //                 :
            //                 "NO",
            //             resolved
            //                 :
            //                 false,
            //             title
            //                 :
            //                 "Test 1",
            //             volume
            //                 :
            //                 "$0.00",
            //             yesPrice
            //                 :
            //                 "0.50",
            //         }
            //     );
            // setFilteredMarkets(filters);
            if (selectedCategory == "all") {
                setFilteredMarkets(markets);
            } else {
                setFilteredMarkets(
                    markets.filter((market) =>
                        market.category.toLowerCase() === selectedCategory.toLowerCase()
                    )
                );
            }
        }
    }, [selectedCategory, markets])

    return <Box mt={50}>
        <Text
            size="36px"
            className="bold-text"
            fw={600}
        >
            Market
        </Text>
        <CategoryHeader />
        <Box mt={40}>
            {
                isLoading ? <CardSkeleton /> :
                    filteredMarkets.length === 0 ?
                        <Text className="text-center">No markets available yet. Be the first to create one!</Text> :
                        <Grid>
                            {
                                filteredMarkets.map((item: MarketData, index: number) =>
                                    <Grid.Col span={{ base: 12, md: 4, lg: 4 }} key={`marketcard-${index}`}>
                                        <MarketCard
                                            data={item}
                                        />
                                    </Grid.Col>
                                )
                            }
                        </Grid>
            }
        </Box>
    </Box>
}

export default Markets;