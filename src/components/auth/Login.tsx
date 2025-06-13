
import { Button, Divider, Flex, Input, Text, useMantineColorScheme } from "@mantine/core";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
// import { FC } from "react";

// interface Props {
//     data?: string
// }

const Login = () => {
    const { colorScheme } = useMantineColorScheme();

    return <Flex direction="column" gap="20px" 
        bg={colorScheme === "dark" ? "#262833" : "white"}
        p={20}
    >
        <Text className="text-center" size="20px" fw={500}> Welcome to Suimarket </Text>
        <Button color="blue">
            <Flex
                gap={10}
                justify="center"
                align="center"
            >
                <IconBrandGoogleFilled />
                <Text>Continue with Google</Text>
            </Flex>
        </Button>
        <Divider my="xs" label="OR" labelPosition="center" />
        <form>
            <Flex align="center" justify="center">
                <Input placeholder="Enter Email" size="md"/>
                <Button color="dark" size="md">Continue</Button>
            </Flex>
        </form>
    </Flex>
}

export default Login;