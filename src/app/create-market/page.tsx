"use client";

import useIsMobile from "@/hooks/useIsMobile";
import {
    Box,
    Button,
    Flex,
    Select,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {DateInput} from "@mantine/dates";
import dayjs from "dayjs";
import {CONTRACT_CONFIG, MARKET_CATEGORIES} from "@/utils/consistant";
import {useState} from "react";
import {useSuiWallet} from "@/hooks/useSuiWallet";
import {notifications} from "@mantine/notifications";
import classes from "./Demo.module.css";
import {Transaction} from "@mysten/sui/transactions";
import {
    useCurrentAccount,
    useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import {v4 as uuidv4} from "uuid";

function CreateMarket() {
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {connected} = useSuiWallet();
    const currentAccount = useCurrentAccount();
    const {mutate: signAndExecuteTransaction} = useSignAndExecuteTransaction();
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            question: "",
            description: "",
            category: MARKET_CATEGORIES[0].key,
            rules: "",
            end_date: dayjs().format("YYYY-MM-DD"),
        },
        validate: {
            question: (value: string) =>
                value.length < 10 ? "Question must have at least 10 letters" : null,
            description: (value: string) =>
                value.length < 10 ? "Description must have at least 10 letters" : null,
            rules: (value: string) =>
                value.length < 10 ? "Description must have at least 10 letters." : null,
        },
    });

    async function handleSubmit() {
        const values = form.getValues();
        if (!connected) {
            notifications.show({
                title: "Warning",
                message: "Please connect your wallet first",
                color: "yellow",
                classNames: classes,
            });
            return false;
        }
        try {
            setIsLoading(true);

            const tx = new Transaction();
            tx.setSender(currentAccount!.address);

            const endTimestamp = new Date(values.end_date).getTime();

            tx.moveCall({
                target: `${CONTRACT_CONFIG.PACKAGE_ID}::${CONTRACT_CONFIG.MARKET_MODULE}::${CONTRACT_CONFIG.MARKET_CREATE_FUNCTION}`,
                arguments: [
                    tx.pure.string(uuidv4()),
                    tx.pure.string(values.question),
                    tx.pure.string(values.description),
                    tx.pure.string(values.category),
                    tx.pure.string(values.rules),
                    tx.pure.u64(endTimestamp), // resolution_date
                    tx.object(CONTRACT_CONFIG.DEEPBOOK_REGISTRY_ID),
                    tx.object(CONTRACT_CONFIG.TESTNET_CLOCK_ID),
                ],
            });
            tx.setGasBudget(1000000000);
            signAndExecuteTransaction(
                {
                    transaction: tx,
                },
                {
                    onSuccess: (result) => {
                        console.log("Transaction success", result);
                        form.reset();
                        notifications.show({
                            title: "Success",
                            message: "Created a market successfully.",
                            color: "blue",
                            classNames: classes,
                        });
                    },
                    onError: (err) => {
                        console.error("Transaction error", err);
                    },
                }
            );
        } catch (error) {
            console.error("Market creation failed:", error);
            if (error instanceof Error) {
                console.error("Error details:", {
                    message: error.message,
                    stack: error.stack,
                    name: error.name,
                });
            }
            notifications.show({
                title: "Error",
                message: `Failed to create market: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`,
                color: "yellow",
                classNames: classes,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Box>
            <Box style={{width: isMobile ? "100%" : "750px", margin: "auto"}}>
                <Text
                    size={isMobile ? "25px" : "35px"}
                    fw={500}
                    className="text-center"
                >
                    Create a Market
                </Text>
                <form
                    onSubmit={form.onSubmit(() => {
                        handleSubmit();
                    })}
                >
                    <Flex gap="20px" direction="column" mt={30}>
                        <TextInput
                            label="Question"
                            placeholder="Will BTC exceed $100k by end of 2025?"
                            key={form.key("question")}
                            {...form.getInputProps("question")}
                        />
                        <Textarea
                            label="Description"
                            placeholder="Provide detailed resolution criteria..."
                            key={form.key("description")}
                            {...form.getInputProps("description")}
                        />
                        <DateInput
                            clearable
                            label="End Date"
                            placeholder="Enter Date"
                            w={"100%"}
                            key={form.key("end_date")}
                            {...form.getInputProps("end_date")}
                        />
                        <Box>
                            <Text size="14px" style={{color: ""}}>
                                Categories
                            </Text>
                            <Flex mt={10} gap={10}>
                                <Select
                                    data={MARKET_CATEGORIES
                                        .filter((item) => item.key != "all")
                                        .map((item) => {
                                            return {value: item.key, label: item.name};
                                        })}
                                    searchable
                                    key={form.key("category")}
                                    {...form.getInputProps("category")}
                                />
                            </Flex>
                        </Box>
                        <Textarea
                            label="Rules"
                            placeholder="Please input rules."
                            mb="md"
                            key={form.key("rules")}
                            {...form.getInputProps("rules")}
                        />
                        <Button
                            color="rgba(38, 133, 241, 1)"
                            size="md"
                            type="submit"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            Create Market
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Box>
    );
}

export default CreateMarket;
