import { Box, Container, 
    Grid, GridItem, 
    Heading, Text, 
    Image, Button, 
    Menu, MenuButton, 
    MenuList, MenuItem } from "@chakra-ui/react";
import Sidenav from "../../Components/Sidenav/Sidenav";
import { ChevronDownIcon } from '@chakra-ui/icons';

const Events = () => {
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

                <Button px="5" mt="3" mr="4" ml="auto" colorScheme="whatsapp">New Event</Button>

                </Box>

                <Box boxShadow="2xl" 
                borderRadius="lg" bg="#ffffff" my="6" 
                mx={["0","6"]} display="flex" 
                flexWrap={["wrap", "wrap", "nowrap"]} 
                p="2">      

                    <Box w={["100%", "100%", "40%"]}>

                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/3ajPXlZJszM" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; 
                    clipboard-write; encrypted-media; 
                    gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>

                    {/* <Image boxSize="100%" src="https://awscloudcommunitylpu.netlify.app/images/blog/EC2.jfif" alt="Dan Abramov" /> */}
                    
                    </Box>

                    <Box w={["100%", "100%", "60%"]} mx="3" pb="4" px={["auto", "auto", "6"]}>
                        <Heading mt="4" fontSize="3xl">Serverless in Full Stack Development</Heading>
                        <Text my="2" color="orange.400">Date</Text>
                        <Text fontSize="sm" my="4">
                        AWS Cloud Community of LPU in collaboration with AWS User Group Jaipur - 
                        Rajasthan is hosting a webinar on “Serverless in Full Stack Development.
                        Our guest speaker for this session is Suman Debnath, Sr developer advocate, 
                        Amazon Web Services (AWS).
                        </Text>

                        <Button mr="2" w="7rem" colorScheme="orange">
                            View
                        </Button>

                        <Menu mt="1">
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                Settings
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Set as Featured</MenuItem>
                                <MenuItem>Edit Blog</MenuItem>
                                <MenuItem>Delete Blog</MenuItem>
                             </MenuList>
                        </Menu>
                    </Box>

                </Box>

            </GridItem>
            </Grid>
            </Container>

        </Box>
    );
}
 
export default Events;