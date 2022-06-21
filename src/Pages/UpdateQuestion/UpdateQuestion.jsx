import { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Box, Container, Text, Textarea, Input, Divider, Button, Center, Stack } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import firebase from 'firebase/compat/app';
import { db, storage } from "../../firebase";

const UpdateQuestion = () => {

    const toast = useToast();
    const { id } = useParams();
    const history = useHistory();

    // ! States
    const [data, setData] = useState("");
    const [qstnOptions, setQstnOptions] = useState("");
    const qstnRef = useRef();
    const optionOneRef = useRef();
    const optionTwoRef = useRef();
    const optionThreeRef = useRef();
    const optionFourRef = useRef();
    const answerRef = useRef();
    const [answer, setAnswer] = useState('');
    const [value, setValue] = useState('');

    // ! useEffect
    useEffect(() => {
        db.collection("quiz")
        .doc(id)
        .get()
        .then((snapshot) => {
            console.log(snapshot.data());
            setData(snapshot.data());
            setQstnOptions(snapshot.data().options);
        })
        .catch((err) => {
            console.log(err);
            // setError("Failed to fetch data.");
        })
    },[id])

    // ! Handle submit function
    function handleSubmit(e) {
        e.preventDefault();
        console.log(answer);

        db.collection("quiz")
        .doc(id)
        .update({
            question: qstnRef.current.value,
            options: [optionOneRef.current.value, optionTwoRef.current.value, optionThreeRef.current.value, optionFourRef.current.value],
            answer: answer,
            time: firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then((result) => {
            toast({
                title: 'Success',
                description: "Question was updated successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        })
        .catch((err) => {
            toast({
                title: 'Failure',
                description: "Failed to update question.",
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
                    Update Quiz Question
                </Text>
                <Divider mb="10" />

                <form onSubmit={handleSubmit}>
                <Text fontSize="lg" mb="2">Write goes here</Text>
                <Textarea variant='filled' rows="4" ref={qstnRef}
                defaultValue={data.question}
                placeholder='Write down question here.' />

                <Text mt="12" fontSize="lg" mb="2">Provide options for the above question here</Text>
                <Input defaultValue={qstnOptions[0]} mt="3" variant='filled' placeholder='Option 1' size='lg' ref={optionOneRef} />
                <Input defaultValue={qstnOptions[1]} mt="3" variant='filled' placeholder='Option 2' size='lg' ref={optionTwoRef} />
                <Input defaultValue={qstnOptions[2]} mt="3" variant='filled' placeholder='Option 3' size='lg' ref={optionThreeRef} />
                <Input defaultValue={qstnOptions[3]} mt="3" variant='filled' placeholder='Option 4' size='lg' ref={optionFourRef} />

                <Text mt="12" fontSize="lg" mb="2">Provide answer to above question</Text>
                <RadioGroup defaultValue={data.answer}>
                <Stack direction='row' onChange={(e) => setAnswer(e.target.value)}>
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
 
export default UpdateQuestion;