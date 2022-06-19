import { useState} from "react";
import { useHistory } from "react-router-dom";
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


const CreateBlog = () => {

    const toast = useToast();
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [link, setLink] = useState("");
    const [author, setAuthor] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const [pending, setPending] = useState("Save Blog");
    const [saveError, setSaveError] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ! Function to save data to DB
    function handleSubmit(e){
        e.preventDefault();
        setPending("Saving...")

        db.collection("blogs").add({
            title: title,
            body: body,
            link: link,
            author: author,
            imgUrl: imgUrl,
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
            setSaveError("Failed to save !");
        })
    }

    // ! To give confirmation
    function giveConfirmnation(){
        toast({
            title: "Blog added successfully !",
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
                    Add New Blog
                </Text>
                <Divider mb="10" />

                <Box>
                <form onSubmit={ handleSubmit }>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Blog Title</FormLabel>
                    <Input onChange={ (e) => setTitle(e.target.value) } 
                    variant='filled' size='lg'
                    placeholder="Write Title here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Blog Body</FormLabel>
                    <Textarea onChange={ (e) => setBody(e.target.value) } 
                    variant='filled' size='lg'
                    placeholder="Write description here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Blog Link</FormLabel>
                    <Input onChange={ (e) => setLink(e.target.value) } 
                    variant='filled' size='lg'
                    placeholder="Paste medium link here" />
                    </Box>

                    <Box mb={["8", "10"]}>
                    <FormLabel>Author Name</FormLabel>
                    <Input onChange={ (e) => setAuthor(e.target.value) } 
                    variant='filled' size='lg'
                    placeholder="Name of author" />
                    </Box>

                    <Box>
                    <FormLabel>Blog Thumbnail</FormLabel>
                    <Input onChange={ (e) => setThumbnail(e.target.files) } 
                    variant='filled' size='lg'
                    pt="1" pl="1" type="file"/>
                    </Box>

                    <Box display="flex" flexWrap="wrap-reverse" justifyContent="space-evenly">
                        <Box w={["100%", "50%", "60%"]}>
                            <Button
                            onClick={ handleUpload } 
                            w="10rem" mt="24" 
                            colorScheme="orange">
                                Upload
                            </Button>

                            <Button display="block" type="submit" 
                            w="10rem" mt="3" colorScheme="orange">
                                { pending }
                            </Button>
                        </Box>

                        <Box w={["100%", "50%", "40%"]}>
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
                            <Image mt="8" w="100%" h="auto" src={imgUrl} />
                            </Box>
                            }
                        </Box>
                    </Box>

                    { error &&
                    <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>{ error }</AlertTitle>
                    <AlertDescription>Please try again.</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                    </Alert>
                    }

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