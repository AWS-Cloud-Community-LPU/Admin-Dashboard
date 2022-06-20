import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Text, RadioGroup, Radio, Alert, Button } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react';
  import { useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { db } from "../../firebase";

const Questions = () => {

    const toast = useToast();

    // ! states
    const [data, setData] = useState();
    const [answer, setAnswer] = useState();
    const [value, setValue] = useState("");

    // ! useeffect
    useEffect(() => {
        db.collection("quiz")
        .get()
        .then((snapshot) => {
            // console.log(snapshot.docs[0].data());
            setData(snapshot);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    // ! Function to delete blog
    function handleDelete(id){
        db.collection("quiz")
        .doc(id)
        .delete()
        .then((result) => {
            console.log("Deleted");
            toast({
                title: 'Success',
                description: "Question deleted successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: 'Failure',
                description: "Failed to delete.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }

    return (
        <Container py="20" maxW="container.xl">

            {data &&
            <>
            {data.docs.map((result, idx) => (
            <Box boxShadow="md" mt="10" py="6" px="10" key={idx}>
                <Alert p="3" colorScheme="orange" variant='left-accent'>
                    <Text fontSize="xl">
                        {result.data().question}
                    </Text>
                </Alert>
                

                <Box my="10">
                    <Box>
                    <RadioGroup onChange={setValue} value={value}>

                    <Box _hover={{background: "orange.100"}} px="4" pb="4" borderRadius="8px">
                    <Radio mt="6" size='lg' value='1' colorScheme='orange'>
                    {result.data().options[0]}
                    </Radio>
                    </Box>

                    <Box _hover={{background: "orange.100"}} px="4" pb="4" borderRadius="8px">
                    <Radio mt="6" size='lg' value='2' colorScheme='orange'>
                    {result.data().options[1]}
                    </Radio>
                    </Box>

                    <Box _hover={{background: "orange.100"}} px="4" pb="4" borderRadius="8px">
                    <Radio mt="6" size='lg' value='3' colorScheme='orange'>
                    {result.data().options[2]}
                    </Radio>
                    </Box>

                    <Box _hover={{background: "orange.100"}} px="4" pb="4" borderRadius="8px">
                    <Radio mt="6" size='lg' value='4' colorScheme='orange'>
                    {result.data().options[3]}
                    </Radio>
                    </Box>

                    </RadioGroup>
                    </Box>
                </Box>

                <Menu mt="1">
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Settings
                    </MenuButton>
                    <MenuList>
                        <Link to={`/update/question/${result.id}`}>
                        <MenuItem>Edit Question</MenuItem>
                        </Link>
                    <MenuItem onClick={ () => handleDelete(result.id) }>Delete Question</MenuItem>
                    </MenuList>
                </Menu>

            </Box>
            ))}
            </>}
        </Container>
    );
}
 
export default Questions;