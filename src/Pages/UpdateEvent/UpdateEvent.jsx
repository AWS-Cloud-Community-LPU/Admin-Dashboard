import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Container, Heading, Button, Center} from "@chakra-ui/react";
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

const UpdateEvent = () => {

    const {id} = useParams();
    const toast = useToast();
    const history = useHistory();

    const titleRef = useRef();
    const bodyRef = useRef();
    const embedLinkRef = useRef();
    const linkRef = useRef();
    const dateRef = useRef();

    const [data, setData] = useState("");
    const [pending, setPending] = useState("Save Event");
    const [saveError, setSaveError] = useState("");
    const [error, setError] = useState("");

    // ! To get data from DB
    useEffect(() => {
        db.collection("events")
        .doc(id)
        .get()
        .then((snapshot) => {
            console.log(snapshot.data());
            setData(snapshot.data());
        })
        .catch((err) => {
            console.log(err);
            setError("Failed to fetch data.");
        })
    },[id])

    // ! Function to save data to DB
    function handleSubmit(e){
        e.preventDefault();
        setPending("Saving...")

        db.collection("events")
        .doc(id)
        .update({
            title: titleRef.current.value,
            body: bodyRef.current.value,
            embedLink: embedLinkRef.current.value,
            link: linkRef.current.value,
            date: dateRef.current.value,
            time: firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then((result) => {
            console.log(result);
            console.log("Updated");
            giveConfirmnation();
            setPending("Updated successfully !");
        })
        .catch((err) => {
            console.log("Error " + err);
            setSaveError("Failed to save !")
        })
    }

    // ! To give confirmation
    function giveConfirmnation(){
        toast({
            title: "Event updated successfully !.",
            status: "success",
            duration: 6000,
            isClosable: true,
          })
        history.push("/events");
    }

    return (
        <Box pb="20">
            <Container maxW="container.xl">

                <Heading mt="10" mb="10">Update Event Here</Heading>

                { error &&
                <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Failed to fetch data!</AlertTitle>
                <AlertDescription>Please try again.</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
                }

                { data && 
                <Box>
                <form onSubmit={ handleSubmit }>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Event Title</FormLabel>
                    <Input ref={ titleRef } defaultValue={ data.title } placeholder="Write Title here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Event Body</FormLabel>
                    <Textarea ref={ bodyRef } defaultValue={ data.body } placeholder="Write description here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Video Embed Link</FormLabel>
                    <Input ref={ embedLinkRef } defaultValue={ data.embedLink } placeholder="Paste link to embed video" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Event Link</FormLabel>
                    <Input ref={ linkRef } defaultValue={ data.link } placeholder="Paste event link here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Event Date</FormLabel>
                    <Input type="date" ref={ dateRef } defaultValue={ data.date }/>
                    </Box>

                    <Center>
                    <Button type="submit" w="100%" mt="8" colorScheme="orange">{ pending }</Button>
                    </Center>

                    { saveError &&
                    <Alert mt="6" status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>{ saveError }</AlertTitle>
                    <AlertDescription>Please try again.</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                    </Alert>
                    }

                </form>
                </Box>}

            </Container>
        </Box>
    );
}
 
export default UpdateEvent;