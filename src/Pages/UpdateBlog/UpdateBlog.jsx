import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Container, Divider, Image, Button, Center, Text } from "@chakra-ui/react";
import { Input, FormLabel, Textarea } from "@chakra-ui/react";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton
  } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import firebase from 'firebase/compat/app';
import { db, storage } from "../../firebase";

const UpdateBlog = () => {

    const toast = useToast();
    const { id } = useParams();
    const history = useHistory();

    const [data, setData] = useState();
    const [thumbnail, setThumbnail] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const titleRef = useRef();
    const bodyRef = useRef();
    const linkRef = useRef();
    const authorRef = useRef();

    const [pending, setPending] = useState("Update Blog");
    const [saveError, setSaveError] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ! To get data from DB
    useEffect(() => {
        db.collection("blogs")
        .doc(id)
        .get()
        .then((snapshot) => {
            console.log(snapshot.data());
            setData(snapshot.data());
            setImgUrl(snapshot.data().imgUrl)
        })
        .catch((err) => {
            console.log(err);
            setError("Failed to fetch data.");
        })
    },[id])

    // ! Function to save data to DB
    function handleSubmit(e){
        e.preventDefault();
        setPending("Updating...");

        db.collection("blogs")
        .doc(id)
        .update({
            title: titleRef.current.value,
            body: bodyRef.current.value,
            link: linkRef.current.value,
            author: authorRef.current.value,
            imgUrl: imgUrl,
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
            setSaveError("Failed to update !");
        })
    }

    // ! To give confirmation
    function giveConfirmnation(){
        toast({
            title: "Blog updated successfully !.",
            status: "success",
            duration: 6000,
            isClosable: true,
          })
        history.push("/");
    }

    // ! Function to upload thumbnail to storage
    function handleUpload(e){
        e.preventDefault();
        console.log(thumbnail[0]);

        let imageName = Date.now();
        const uploadTask = storage.ref(`blogs/${imageName}`).put(thumbnail[0])
        uploadTask.on("state_changed",
        (snapshot) => {
            setLoading(true);
            console.log(snapshot);
        },
        (err) => {
            console.log("Error " + err);
            console.log("Failed to upload");
            setLoading(false);
            setError("Failed to Upload Image.");
        },
        () => {
            storage.ref().child("blogs/"+imageName)
            .getDownloadURL()
            .then(url => {
                console.log("Url is " + url);
                setImgUrl(url);
                setLoading(false);
                console.log(imgUrl);
            })
        }
        )
    }

    return (
        <Box pb="20">
            <Container maxW="container.lg">

                <Text mt="10" mb="2" fontWeight="400" fontSize="3xl">
                    Update Blog
                </Text>
                <Divider mb="10" />

                { data &&
                <Box>
                <form onSubmit={ handleSubmit }>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Blog Title</FormLabel>
                    <Input ref={ titleRef } defaultValue={ data.title } 
                    variant='filled' size='lg'
                    placeholder="Write Title here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Blog Body</FormLabel>
                    <Textarea ref={ bodyRef } defaultValue={ data.body } 
                    variant='filled' size='lg' rows="10"
                    placeholder="Write description here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Blog Link</FormLabel>
                    <Input ref={ linkRef } defaultValue={ data.link } 
                    variant='filled' size='lg'
                    placeholder="Paste medium link here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Author Name</FormLabel>
                    <Input ref={ authorRef } defaultValue={ data.author } 
                    variant='filled' size='lg'
                    placeholder="Name of author" />
                    </Box>

                    <Box>
                    <FormLabel>Blog Thumbnail</FormLabel>
                    <Input onChange={ (e) => setThumbnail(e.target.files) } 
                    variant='filled' size='lg'
                    pt="1" pl="1" type="file"/>
                    </Box>

                    <Button 
                    onClick={ handleUpload } 
                    w="10rem" mt="5" 
                    colorScheme="orange">
                        Upload
                    </Button>

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
                    <Text ml="4"> Uploading image...</Text>
                    </Center>
                    }

                    { imgUrl &&
                    <Box boxShadow="outline">
                    <Image mt="8" w="100%" h="auto" src={ imgUrl } />
                    </Box>
                    }

                    <Center>
                    <Button type="submit" w="10rem" mt="8" colorScheme="orange">{ pending }</Button>
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
 
export default UpdateBlog;