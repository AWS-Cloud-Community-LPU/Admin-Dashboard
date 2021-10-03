import { Box, Container, 
    Grid, GridItem, 
    Heading, Text, 
    Button, Image, 
    Menu, MenuButton, 
    MenuList, MenuItem } from "@chakra-ui/react";
import Sidenav from "../../Components/Sidenav/Sidenav";
import { ChevronDownIcon } from '@chakra-ui/icons';

const Home = () => {
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
            boxShadow="2xl"
            borderRadius="lg" textAlign="left" 
            display={["none", "none", "block"]} 
            rowSpan={2} colSpan={1}>
                <Sidenav/>
            </GridItem>

            <GridItem colSpan={[5,5,4]}>

                <Box mb="10" display="flex">
                <Heading color="#ff9900" fontSize="3xl" ml="6" mt="4">All Blogs</Heading>
                <Button px="5" mt="3" mr="4" ml="auto" colorScheme="whatsapp">New Blog</Button>
                </Box>

                <Box boxShadow="2xl" 
                borderRadius="lg" bg="#ffffff" 
                my="6" mx={["0","6"]} display="flex" 
                flexWrap={["wrap", "wrap", "nowrap"]} 
                p="2"> 

                    <Box w={["100%", "100%", "40%"]}>   
                    <Image boxSize="100%" src="https://awscloudcommunitylpu.netlify.app/images/blog/EC2.jfif" alt="Dan Abramov" />
                    </Box>

                    <Box w={["100%", "100%", "60%"]} mx="3" pb="4" px={["auto", "auto", "6"]}>
                        <Heading mt="4" fontSize="3xl">AWS Certification</Heading>
                        <Text my="2" color="orange.400">Posted by</Text>
                        <Text fontSize="sm" my="4">
                        With the emergence of Cloud Technologies in the market, 
                        the most important step for learners is to get a 
                        clarification on the right way to begin their career. 
                        Amazon Web Services, being a leader in the globe in 
                        terms of providing cloud base solutions provides a 
                        clear description of skill validation through certifications 
                        (starting from Foundation level to Professional level).
                        </Text>

                        <Button mr="2" w="7rem" colorScheme="orange">
                            Read more
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
 
export default Home;