import useIsMobile from "@/hooks/useIsMobile";
import { Box, Container, Flex, Text } from "@mantine/core";
import Link from "next/link";

const MyFooter = () => {
    
    const isMobile = useIsMobile();

    return <Box
        bg="#0c111d"
        h={300}
    >
        <Container size={1440}>
            <Flex direction="column" gap={32} align="center" justify="center" h={216}>
                <img src={'/img/logo.svg'} />
                <Flex align="center" gap={32}>
                    <Link href="/about"><Text size="16px" style={{ color: "#94969C" }}>About us</Text></Link>
                    <Link href="/guides"><Text size="16px" style={{ color: "#94969C" }}>Guides and Articles</Text></Link>
                    <Link href="/how"><Text size="16px" style={{ color: "#94969C" }}>How it works</Text></Link>
                </Flex>
                <Flex align="center" gap={20}>
                    <Link href="https://www.twitter.com"><img src="/img/twitter.svg" /></Link>
                    <Link href="https://www.linkedin.com"><img src="/img/linkedin.svg" /></Link>
                    <Link href="https://www.facebook.com"><img src="/img/facebook.svg" /></Link>
                    <Link href="https://www.discord.com"><img src="/img/discord.svg" /></Link>
                </Flex>
            </Flex>
            <Flex h={56} justify={isMobile ? "center" : "space-between"} gap={10} direction={ isMobile ? "column" : "row" } align={isMobile ? "center" : "end"} className="border-t border-[#1F242F]">
                <Text style={{ color: "#94969C" }} size="16px">@ 2025 Suimarket. All rights reserved.</Text>
                <Flex gap={16}>
                    <Text style={{ color: "#94969C" }} size="16px">Terms</Text>
                    <Text style={{ color: "#94969C" }} size="16px">Privacy</Text>
                    <Text style={{ color: "#94969C" }} size="16px">Cookies</Text>
                </Flex>
            </Flex>
        </Container>
    </Box>
}

export default MyFooter;