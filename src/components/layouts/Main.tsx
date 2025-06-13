"use client"

import {Box, Container, Flex} from "@mantine/core";
import {FC, ReactNode, useEffect, useState} from "react";
import MyFooter from "./Footer";
import {useParams} from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";

interface Props {
    children: ReactNode,
}

const Main: FC<Props> = ({children}) => {

    const params = useParams();
    const [path, setPath] = useState<string>("");
    const isMobile = useIsMobile();
    useEffect(() => {
        setPath(window.location.pathname);
    }, [params])

    return <Box>
        <Container size={path.indexOf("rewards") > -1 ? "100%" : 1440}
                   mt={path.indexOf("rewards") > -1 ? '0px' : '30px'}>
            <Flex
                justify='center'
                direction={'column'}
                p={isMobile ? 15 : 0}
            >
                <Box mb={30}>
                    {children}
                </Box>
            </Flex>
        </Container>
        {
            path.indexOf("comming-soon") == -1 && <MyFooter/>
        }
    </Box>
}

export default Main;