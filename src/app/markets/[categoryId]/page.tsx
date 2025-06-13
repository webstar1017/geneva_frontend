"use client"

import CategoryHeader from "@/components/layouts/CategoryHeader";
import MarketCard from "@/components/MarketCard";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import {useMarkets} from "@/hooks/useMarketData copy";
import HomeContext from "@/state/index.context";
import MarketData from "@/types/MarketData";
// import { MARKET_CATEGORIES } from "@/utils/consistant";
import {Box, Grid, Text} from "@mantine/core";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import 'react-multi-carousel/lib/styles.css';

function Markets() {
    const {markets, isLoading} = useMarkets();
    const [filteredMarkets, setFilteredMarkets] = useState<MarketData[]>([]);
    const params = useParams();
    const categoryId = params.categoryId as string;
    const {
        state: {selectedCategory, selectedSubCategory},
        dispatch: homeDispatch
    } = useContext(HomeContext);

    useEffect(() => {
        homeDispatch({
            "field": "selectedCategory",
            "value": categoryId
        });
        if (selectedSubCategory !== "all") {
            homeDispatch({
                "field": "selectedSubCategory",
                "value": selectedSubCategory
            });
        }

        if (markets) {
            if (selectedSubCategory == "all") {
                setFilteredMarkets(markets);
            } else {
                setFilteredMarkets(
                    markets.filter((market) =>
                        market.category.toLowerCase() === selectedSubCategory.toLowerCase()
                    )
                );
            }
        }
    }, [selectedCategory, markets, selectedSubCategory])

    return <Box>
        <Text
            size="36px"
            className="bold-text"
            fw={600}
        >
            Market
        </Text>
        <CategoryHeader/>
        <Box mt={40}>
            {
                isLoading ? <CardSkeleton/> :
                    filteredMarkets.length === 0 ?
                        <Text className="text-center">No markets available yet. Be the first to create one!</Text> :
                        <Grid>
                            {
                                filteredMarkets.map((item: MarketData, index: number) =>
                                    <Grid.Col span={{base: 12, md: 4, lg: 4}} key={`marketcard-${index}`}>
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