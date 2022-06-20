import { useState } from 'react';
import { Box, Container, Text, Textarea, Input, Divider, Button, Center, Stack } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import firebase from 'firebase/compat/app';
import { db, storage } from "../../firebase";

const Quiz = () => {

    const toast = useToast();

    // ! States
    const [question, setQuestion] = useState("");
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const [optionThree, setOptionThree] = useState("");
    const [optionFour, setOptionFour] = useState("");
    const [answer, setAnswer] = useState();
    const [value, setValue] = useState('1');

    // ! Handle submit function
    function handleSubmit(e) {
        e.preventDefault();

        db.collection("quiz").add({
            question: question,
            options: [optionOne, optionTwo, optionThree, optionFour],
            answer: answer,
            time: firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then((result) => {
            toast({
                title: 'Success',
                description: "Question was added successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        })
        .catch((err) => {
            toast({
                title: 'Failure',
                description: "Failed to add question.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }

    return (
        <Box mb="24">
            <Container maxW="container.xl">
                <Text mt="10" mb="2" fontWeight="400" fontSize="3xl">
                    Create Quiz
                </Text>
                <Divider mb="10" />

                <form onSubmit={handleSubmit}>
                <Text fontSize="lg" mb="2">Write goes here</Text>
                <Textarea variant='filled' rows="4" onChange={(e) => setQuestion(e.target.value)}
                placeholder='Write down question here.' />

                <Text mt="12" fontSize="lg" mb="2">Provide options for the above question here</Text>
                <Input mt="3" variant='filled' placeholder='Option 1' size='lg' onChange={(e) => setOptionOne(e.target.value)} />
                <Input mt="3" variant='filled' placeholder='Option 2' size='lg' onChange={(e) => setOptionTwo(e.target.value)} />
                <Input mt="3" variant='filled' placeholder='Option 3' size='lg' onChange={(e) => setOptionThree(e.target.value)} />
                <Input mt="3" variant='filled' placeholder='Option 4' size='lg' onChange={(e) => setOptionFour(e.target.value)} />

                <Text mt="12" fontSize="lg" mb="2">Provide answer to above question</Text>
                <RadioGroup>
                <Stack direction='row' onChange={(e) => setAnswer(e.target.value)} value={value}>
                    <Radio value='1'>Option 1</Radio>
                    <Radio value='2'>Option 2</Radio>
                    <Radio value='3'>Option 3</Radio>
                    <Radio value='4'>Option 4</Radio>
                </Stack>
                </RadioGroup>

                <Center>
                    <Button type="submit" mt="10" w="9rem" colorScheme='orange' size='lg'>
                        Submit Quiz
                    </Button>
                </Center>
                </form>
            </Container>
        </Box>
    );
}
 
export default Quiz;