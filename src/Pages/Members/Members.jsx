import { Box, Container, 
    Grid, GridItem, 
    Heading, Text, 
    Tabs, TabList, 
    Tab, TabPanels, 
    TabPanel  } from "@chakra-ui/react";
import Sidenav from "../../Components/Sidenav/Sidenav";
import AllMembers from "../../Components/Members/All";
import Anchoring from "../../Components/Members/Anchors";
import WebDevelopers from "../../Components/Members/WebDev";
import ContentDevelopers from "../../Components/Members/ContentDev";
import Graphics from "../../Components/Members/Graphics";
import Technical from "../../Components/Members/Technical";
import Marketing from "../../Components/Members/Marketing";

const Members = () => {
    return (
        <Box mt="5">

            <Container maxW="container.xl">

            <Box mt="4" mb="10" display="flex">
            <Heading color="#ff9900" fontSize="3xl" ml="6" mt="4">Community Members</Heading>
            </Box>

            <Tabs ml={["0","0","10"]} mt="20" colorScheme="orange">
            <TabList>
                <Box display="flex" flexWrap="wrap">
                <Tab fontWeight="600">All Members</Tab>
                <Tab fontWeight="600">Anchoring</Tab>
                <Tab fontWeight="600">Web Developers</Tab>
                <Tab fontWeight="600">Content Developers</Tab>
                <Tab fontWeight="600">Graphics</Tab>
                <Tab fontWeight="600">Technical</Tab>
                <Tab fontWeight="600">Marketing</Tab>
                </Box>
            
            </TabList>
            <TabPanels>

            <TabPanel>
                <AllMembers/>
                </TabPanel>

                <TabPanel>
                <Anchoring/>
                </TabPanel>

                <TabPanel>
                <WebDevelopers/>
                </TabPanel>

                <TabPanel>
                <ContentDevelopers/>
                </TabPanel>

                <TabPanel>
                <Graphics/>
                </TabPanel>

                <TabPanel>
                <Technical/>
                </TabPanel>

                <TabPanel>
                <Marketing/>
                </TabPanel>

            </TabPanels>
            </Tabs>

            </Container>

        </Box>
    );
}
 
export default Members;