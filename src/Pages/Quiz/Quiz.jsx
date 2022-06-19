import { useState } from 'react';
import { Box, Container, Text, Textarea, Input, Divider, Button, Center } from '@chakra-ui/react';

const Quiz = () => {

    // ! States
    const [question, setQuestion] = useState("");
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const [optionThree, setOptionThree] = useState("");

    // ! Handle submit function
    function handleSubmit(e) {
        e.preventDefault();
        console.log(question);
        console.log(optionOne);
        console.log(optionTwo);
        console.log(optionThree);
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
                <Input mt="3" variant='filled' placeholder='Option 1' size='lg' onChange={(e) => setQuestion(e.target.value)} />
                <Input mt="3" variant='filled' placeholder='Option 2' size='lg' onChange={(e) => setOptionOne(e.target.value)} />
                <Input mt="3" variant='filled' placeholder='Option 3' size='lg' onChange={(e) => setOptionTwo(e.target.value)} />
                <Input mt="3" variant='filled' placeholder='Option 4' size='lg' onChange={(e) => setOptionThree(e.target.value)} />
                
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