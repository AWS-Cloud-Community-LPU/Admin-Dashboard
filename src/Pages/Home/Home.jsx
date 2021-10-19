import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Container, 
    Grid, GridItem, 
    Heading, Text, 
    Button, Image, 
    Menu, MenuButton, 
    MenuList, MenuItem, Center } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton
  } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Sidenav from "../../Components/Sidenav/Sidenav";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { db } from "../../firebase";

const Home = () => {

    const toast = useToast();
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ! Using useEffect hook to fetch data on each reload
    useEffect(() => {
        setLoading(true);
        db.collection("blogs")
        .get()
        .then((snapshot) => {
            console.log(snapshot);
            setData(snapshot);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
            setError("Failed to fetch data !");
        })
    },[])

    // ! Function to delete blog
    function handleDelete(id){
        db.collection("blogs")
        .doc(id)
        .delete()
        .then((result) => {
            console.log("Deleted");
            deleteConfirmation();
            // window.location.reload(); 
        })
        .catch((err) => {
            console.log(err);
            setError("Failed to delete");
        })
    }

    // ! Function to give delete confirmation
    function deleteConfirmation(){
        toast({
            title: "Blog deleted successfully !.",
            status: "success",
            duration: 6000,
            isClosable: true,
          })
          window.location.reload(); 
    }


    return (
        <Box mt="5">

            <Container maxW="container.3xl">
            <Grid
            h="600px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
            >
            <GridItem 
            height="40rem"
            boxShadow="2xl"
            borderRadius="lg" textAlign="left" 
            display={["none", "none", "block"]} 
            rowSpan={2} colSpan={1}>
                <Sidenav/>
            </GridItem>

            <GridItem colSpan={[5,5,4]}>

                <Box mb="10" display="flex">
                <Heading color="#ff9900" fontSize="3xl" ml="6" mt="4">All Blogs</Heading>
                </Box>

                { error &&
                    <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>{ error }</AlertTitle>
                    <AlertDescription>Please try again.</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                    </Alert>
                }

                { loading &&
                    <Center>
                    <Spinner
                    mt="10" mb="10"
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="orange.300"
                    size="xl"
                    />
                    <Text ml="4"> Fetching blogs...</Text>
                    </Center>
                }
                
                { data &&
                <>
                { data.docs.map( result => (

                <Box key={ result.id } boxShadow="2xl" 
                borderRadius="lg" bg="#ffffff" 
                my="6" mx={["0","6"]} display="flex" 
                flexWrap={["wrap", "wrap", "nowrap"]} 
                p="2"> 

                    <Box w={["100%", "100%", "40%"]}>   
                    <Image boxSize="100%" src={ result.data().imgUrl } alt="Dan Abramov" />
                    </Box>

                    <Box w={["100%", "100%", "60%"]} mx="3" pb="4" px={["auto", "auto", "6"]}>
                        <Heading mt="4" fontSize="3xl">{ result.data().title }</Heading>
                        <Text my="2" color="orange.400">Posted by - { result.data().author }</Text>
                        <Text fontSize="sm" my="4">
                        { result.data().body }
                        </Text>

                        <a href={ result.data().link } target="blank" rel="noopener">
                        <Button mr="2" w="7rem" colorScheme="orange">
                            Read more
                        </Button>
                        </a>

                        <Menu mt="1">
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Settings
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Set as Featured</MenuItem>
                                <MenuItem>Edit Blog</MenuItem>
                                <MenuItem onClick={ () => handleDelete(result.id) }>Delete Blog</MenuItem>
                            </MenuList>
                        </Menu>

                    </Box>
                </Box>

                ))}
                </>}

            </GridItem>

            </Grid>
            </Container>

        </Box>
    );
}
 
export default Home;