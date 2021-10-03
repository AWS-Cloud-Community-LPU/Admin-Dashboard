import { Container, Box, Image, IconButton, Center } from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import AWSImage from "../../Assets/Navbar/aws.png";
import Sidenav from "../Sidenav/Sidenav";

const Navbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
        <Container display="flex" maxW="container.3xl">
            <Link to="/">
            <Image
                mt="1"
                boxSize="70px"
                objectFit="cover"
                src={ AWSImage }
                alt="aws.png"
            /> 
            </Link>
            
            <Box ml="auto" mt="3" display={["block", "block", "none"]}>
            <IconButton onClick={onOpen} aria-label="Search database" icon={<HamburgerIcon w={6} h={6} />} />
            </Box>

            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />

                <DrawerBody>
                    <Center>
                    <Image
                    mt="10"
                    boxSize="100px"
                    objectFit="cover"
                    src={ AWSImage }
                    alt="aws.png"
                    /> 
                    </Center>

                    <Sidenav/>

                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>


            </Container>
        </Box>
    );
}
 
export default Navbar;