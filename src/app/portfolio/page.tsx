"use client"

import useIsMobile from "@/hooks/useIsMobile";
import { Box, Text } from "@mantine/core";

function Portfolio() {
    
    const isMobile = useIsMobile();
    
    return <Box pt={30}>
        <Text size={isMobile ? "25px" : "35px"} fw={500}>
            Your Portfolio
        </Text>
    </Box>
}

export default Portfolio;