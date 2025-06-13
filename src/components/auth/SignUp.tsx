
import { Button, Divider, Flex, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
// import { FC } from "react";

// interface Props {

// }

const SignUp = () => {
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
                <TextInput placeholder="Enter Email" size="md"/>
                <Button color="rgba(38, 133, 241, 1)" size="md">Continue</Button>
            </Flex>
        </form>
    </Flex>
}

export default SignUp;