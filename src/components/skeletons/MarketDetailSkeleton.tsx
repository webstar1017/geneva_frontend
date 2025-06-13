import { Box, Flex, Skeleton } from "@mantine/core";

function MarketDetailSkeleton() {
    return <Box >
        <Flex gap={20} justify="start" align={"start"}>
            <Skeleton height={50}  mb="xl" w={100}/>
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Flex>
        <Skeleton height={8} mt={6} width="20%" radius="xl" />
        <Skeleton height={8} mt={6} width="30%" radius="xl" />
        <Skeleton height={50}  mb="xl" mt={20}/>
    </Box>
}

export default MarketDetailSkeleton;