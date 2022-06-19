import { useState, useEffect } from "react";
import { Box, SimpleGrid, Image, Center, Text, Button, Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
    Menu, MenuButton, 
    MenuList, MenuItem
  } from "@chakra-ui/react";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton
  } from "@chakra-ui/react";
  import { ChevronDownIcon } from '@chakra-ui/icons';
import { db } from "../../firebase";

const Technical = () => {
    const toast = useToast();
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // ! Using useEffect hook to fetch data on each reload
    useEffect(() => {
        setLoading(true);
        db.collection("members")
        .where("Domain","==","Technical")
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
        db.collection("members")
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
            title: "Deleted successfully !.",
            status: "success",
            duration: 6000,
            isClosable: true,
          })
          window.location.reload(); 
    }

    return (
        <Box>

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
                <Text ml="4"> Fetching data...</Text>
                </Center>
            }
                

            <Box mt="8" pb="8" display="flex" flexWrap="wrap">

                { data &&
                <>
                { data.docs.map(result => (
                <Box ml="4" w="16rem" mt="5" style={{boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"}} boxShadow="md" key={ result.id } 
                borderRadius="md"
                height="300px">  

                <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Actions
                </MenuButton>
                <MenuList>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem onClick={ () => handleDelete(result.id) }>Delete</MenuItem>
                </MenuList>
                </Menu>

                <Center>
                <Image
                mt="5"
                borderRadius="full"
                boxSize="150px"
                src={ result.data().profile_pic }
                alt="Segun Adebayo"
                />
                </Center>

                <Text textAlign="center" fontWeight="600" mt="3">
                    { result.data().name }
                </Text>

                <Box mx="6" mt="1" fontSize="xl" display="flex" justifyContent="space-evenly">
                <a href={ result.data().linkedin_link }>
                <i class="fab fa-linkedin"></i>
                </a>

                <a href={ result.data().twitter_link }>
                <i class="fab fa-twitter"></i>
                </a>
                
                <a href={ result.data().facebook_link }>
                <i class="fab fa-facebook"></i>
                </a>
                
                <a href={ result.data().instagram_link }>
                <i class="fab fa-instagram"></i>
                </a>
                </Box>

                </Box>
                ))}
                </>} 
            </Box>
        </Box>
    );
}
 
export default Technical;