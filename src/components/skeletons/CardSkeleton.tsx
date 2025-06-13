import useIsMobile from "@/hooks/useIsMobile";
import { Grid, Skeleton } from "@mantine/core";

function CardSkeleton() {

    const isMobile = useIsMobile();
    const count = isMobile ? 1 : 4;
    const skeletons = Array.from({ length: count });

    return <Grid
    >
        {
            skeletons.map((_, index) =>
                <Grid.Col span={{ base: 12, md: 3, lg: 3 }} key={`marketcard-${index}`}>
                    <Skeleton height={200} radius="md" />
                </Grid.Col>
            )
        }
    </Grid>
}

export default CardSkeleton;