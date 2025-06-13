"use client"

import CategoryCard from "@/components/CategoryCard";
import Popular from "@/components/home/Popular";
// import CategoryHeader from "@/components/layouts/CategoryHeader";
import useIsMobile from "@/hooks/useIsMobile";
import HomeContext from "@/state/index.context";
import { MARKET_CATEGORIES } from "@/utils/consistant";
import { Box, Button, Flex, Loader, Text, useMantineColorScheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

function Home() {

  const { colorScheme } = useMantineColorScheme();
  const isMobile = useIsMobile();
  const [isSkip] = useState(true);

  const responsiveCarousel = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const router = useRouter();
  const {
    state: {  },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  useEffect(() => {
    homeDispatch({
      "field": "selectedCategory",
      "value": MARKET_CATEGORIES[0].key
    })
    homeDispatch({
      "field": "selectedSubCategory",
      "value": "all"
    })
    router.push(`/markets/${MARKET_CATEGORIES[0].key}`);
  }, [])

  return isSkip ? <Flex justify="center" mt={40} mb={30}><Loader /></Flex> : <Box>
    <Flex
      direction='column'
      gap={80}
      mt={40}
    >
      <Box
        style={{ width: isMobile ? "100%" : "100%", margin: "auto" }}
      >
        <Text size={isMobile ? "35px" : "50px"} fw={500} className="text-center">Predict the Future on SUI</Text>
        <Text size={isMobile ? "20px" : "25px"} fw={400} mt={30} className="text-center" style={{ lineHeight: isMobile ? '30px' : "40px", letterSpacing: '1px' }}>
          Trade on the outcomes of real-world events with the power of SUI blockchain. Create markets, buy and sell shares, and earn rewards for accurate predictions.
        </Text>
        <Flex gap={20} justify="center" mt={30}>
          <Button
            size="lg"
            variant="gradient"
            onClick={() => {
              router.push("/markets");
            }}
            gradient={{ from: '#1570EF', to: 'cyan', deg: 90 }}
          >Explore Markets</Button>
          {/* <Button
            color="blue"
            variant="outline"
            size="lg"
            onClick={() => {
              router.push("/create-market");
            }}
          >
            Create a Market
          </Button> */}
        </Flex>
      </Box>
      <Popular />
      <Box>
        <Flex
          justify='space-between'
          align='center'
          pb={20}
          style={{ borderBottom: `1px solid ${colorScheme === "dark" ? "rgba(67, 80, 92, 1)" : "rgba(220, 231, 238, 0.72)"}` }}
        >
          <Text size="32px" fw={500}>
            Featured Categories
          </Text>
          <Flex
            gap={12}
            align='center'
          >
            <Text size="18px">View Markets</Text>
            <Flex
              w={26}
              h={26}
              style={{ borderRadius: '26px', cursor: 'pointer', border: '1px solid ' + colorScheme === "dark" ? "#43505C" : "#333333" }}
              bg={colorScheme === "dark" ? '#333333' : "white"}
              align="center"
              justify='center'
            >
              <IconPlus size={20} />
            </Flex>
          </Flex>
        </Flex>
        <Box
          mt={30}
        >
          <Carousel
            autoPlay={false}
            swipeable={true}
            draggable={true}
            infinite={true}
            partialVisible={false}
            dotListClass="custom-dot-list-style"
            responsive={responsiveCarousel}
          >
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </Carousel>
        </Box>
      </Box>
      <Box>
        <Flex
          justify='space-between'
          align='center'
          pb={20}
          style={{ borderBottom: `1px solid ${colorScheme === "dark" ? "rgba(67, 80, 92, 1)" : "rgba(220, 231, 238, 0.72)"}` }}
        >
          <Text size="32px" fw={500}>
            Recent
          </Text>
          <Flex
            gap={12}
            align='center'
          >
            <Text size="18px">View </Text>
            <Flex
              w={26}
              h={26}
              style={{ borderRadius: '26px', cursor: 'pointer', border: '1px solid ' + colorScheme === "dark" ? "#43505C" : "#333333" }}
              bg={colorScheme === "dark" ? '#333333' : "white"}
              align="center"
              justify='center'
            >
              <IconPlus size={20} />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  </Box>
}

export default Home;