import {Box, Button, Flex, Image, Text, Textarea, TextInput} from "@mantine/core";
import {Dropzone, IMAGE_MIME_TYPE, FileWithPath} from '@mantine/dropzone';
import {IconPhoto} from "@tabler/icons-react";
import {useState} from "react";

function Profile() {
    const [files, setFiles] = useState<FileWithPath[]>([]);

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} w={70} h={70} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)}
                      radius="100%"/>;
    });

    return <Flex direction="column" gap={20}>
        <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
            <Flex gap={15} align="center">
                {
                    files.length === 0 ?
                        <Box w={70} h={70} className="rounded-[100%]" bg={"orange"}>

                        </Box> :
                        previews
                }
                <Button color="gray" className="cursor-pointer" size="xs" radius="10%">
                    <Flex align="center" gap={5}>
                        <IconPhoto size={12}/>
                        <Text size="12px">Upload</Text>
                    </Flex>
                </Button>
            </Flex>
        </Dropzone>
        <TextInput
            label="Username"
        />
        <Textarea
            label="Bio"
        />
        <Button w={200}>
            Save changes
        </Button>
    </Flex>
}

export default Profile;
