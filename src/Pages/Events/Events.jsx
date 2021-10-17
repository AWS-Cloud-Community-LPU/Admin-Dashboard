import { useState, useEffect } from "react";
import { Box, Container, 
    Grid, GridItem, 
    Heading, Text, 
    Button, Menu, 
    MenuButton, Center, 
    MenuList, MenuItem } from "@chakra-ui/react";
import Sidenav from "../../Components/Sidenav/Sidenav";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton
  } from "@chakra-ui/react";
  import { Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { db } from "../../firebase";

const Events = () => {

    const toast = useToast();
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ! Using useEffect hook to fetch data on each reload
    useEffect(() => {
        setLoading(true);
        db.collection("events")
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

    // ! Function to deletea blog
    function handleDelete(id){
        db.collection("events")
        .doc(id)
        .delete()
        .then((result) => {
            console.log("Deleted");
            deleteCinfirmation();
        })
        .catch((err) => {
            console.log(err);
            setError("Failed to delete");
        })
    }

    // ! Function to give delete confirmation
    function deleteCinfirmation(){
        toast({
            title: "Event deleted successfully !.",
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
            <GridItem boxShadow="2xl"
             borderRadius="lg" textAlign="left" 
             display={["none", "none", "block"]} 
             rowSpan={2} colSpan={1} bg="#F6F6F6">
                <Sidenav/>
            </GridItem>
            <GridItem colSpan={[5,5,4]}>
                
                <Box mb="10" display="flex">
                <Heading color="#ff9900" fontSize="3xl" ml="6" mt="4">All Events</Heading>
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
                    <Text ml="4"> Fetching events...</Text>
                    </Center>
                }

                { data &&
                <>
                { data.docs.map( result => (
                <Box 
                key = { result.key }
                boxShadow="2xl" 
                borderRadius="lg" bg="#ffffff" my="6" 
                mx={["0","6"]} display="flex" 
                flexWrap={["wrap", "wrap", "nowrap"]} 
                p="2">      

                    <Box w={["100%", "100%", "40%"]}>

                    <iframe width="100%" height="100%" src={ result.data().embedLink } 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; 
                    clipboard-write; encrypted-media; 
                    gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>

                    {/* <Image boxSize="100%" src="https://awscloudcommunitylpu.netlify.app/images/blog/EC2.jfif" alt="Dan Abramov" /> */}
                    
                    </Box>

                    <Box w={["100%", "100%", "60%"]} mx="3" pb="4" px={["auto", "auto", "6"]}>
                        <Heading mt="4" fontSize="3xl">{ result.data().title }</Heading>
                        <Text my="2" color="orange.400">Date { result.data().date }</Text>
                        <Text fontSize="sm" my="4">
                        { result.data().body }
                        </Text>

                        <a href={ result.data().link } target="blank" rel="noopener">
                        <Button mr="2" w="7rem" colorScheme="orange">
                            View
                        </Button>
                        </a>

                        <Menu mt="1">
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Settings
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Set as Featured</MenuItem>
                                <MenuItem>Edit Event</MenuItem>
                                <MenuItem onClick={ () => handleDelete(result.id) }>Delete Event</MenuItem>
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
 
export default Events;