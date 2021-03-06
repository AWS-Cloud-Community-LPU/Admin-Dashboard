import { useState} from "react";
import { useHistory } from "react-router-dom";
import { Box, Container, Text, Button, Divider} from "@chakra-ui/react";
import { Input, FormLabel, Textarea } from "@chakra-ui/react";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton
  } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import firebase from 'firebase/compat/app';
import { db } from "../../firebase";


const CreateBlog = () => {

    const toast = useToast();
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [embedLink, setEmbedLink] = useState("");
    const [link, setLink] = useState("");
    const [date, setDate] = useState("");

    const [pending, setPending] = useState("Save Event");
    const [saveError, setSaveError] = useState("");

    // ! Function to save data to DB
    function handleSubmit(e){
        e.preventDefault();
        setPending("Saving...")

        db.collection("events").add({
            title: title,
            body: body,
            embedLink: embedLink,
            link: link,
            date: date,
            time: firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then((result) => {
            console.log(result);
            console.log("Saved");
            giveConfirmnation();
            setPending("Saved successfully !");
        })
        .catch((err) => {
            console.log("Error " + err);
            setSaveError("Failed to save !")
        })
    }

    // ! To give confirmation
    function giveConfirmnation(){
        toast({
            title: "Event added successfully !.",
            status: "success",
            duration: 6000,
            isClosable: true,
          })
        history.push("/events");
    }

    return (
        <Box pb="20">
            <Container maxW="container.lg">

                <Text mt="10" mb="2" fontWeight="400" fontSize="3xl">
                    Add New Event
                </Text>
                <Divider mb="10" />

                <Box>
                <form onSubmit={ handleSubmit }>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Event Title</FormLabel>
                    <Input onChange={ (e) => setTitle(e.target.value) } 
                    variant='filled' size='lg'
                    placeholder="Write Title here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Event Body</FormLabel>
                    <Textarea onChange={ (e) => setBody(e.target.value) } 
                    variant='filled' size='lg'
                    placeholder="Write description here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Video Embed Link</FormLabel>
                    <Input onChange={ (e) => setEmbedLink(e.target.value) } 
                    variant='filled' size='lg'
                    placeholder="Paste link to embed video" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Event Link</FormLabel>
                    <Input onChange={ (e) => setLink(e.target.value) } 
                    variant='filled' size='lg'
                    placeholder="Paste event link here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Event Date</FormLabel>
                    <Input type="date" onChange={ (e) => setDate(e.target.value) }
                    variant='filled' size='lg'/>
                    </Box>

                    <Button type="submit" w="10rem" mt="8" colorScheme="orange">{ pending }</Button>

                    { saveError &&
                    <Alert mt="6" status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>{ saveError }</AlertTitle>
                    <AlertDescription>Please try again.</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                    </Alert>
                    }

                </form>
                </Box>

            </Container>
        </Box>
    );
}
 
export default CreateBlog;