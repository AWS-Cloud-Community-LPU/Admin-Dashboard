import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Container, Heading, Image, Button, Center } from "@chakra-ui/react";
import { Input, FormLabel } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import firebase from 'firebase/compat/app';
import { db, storage } from "../../firebase";

const UpdateMember = () => {

    const {id} = useParams();
    const toast = useToast();
    const history = useHistory();

    const nameRef = useRef();
    const domainRef = useRef();
    const birthDateRef = useRef();
    const linkedinRef = useRef();
    const twitterRef = useRef();
    const facebookRef = useRef();
    const instagramRef = useRef();

    const [data, setData] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [domain, setDomain] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [twitter, setTwitter] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");

    const [pending, setPending] = useState("Upload");
    const [spinner, setSpinner] = useState(false);
    const [loading, setLoading] = useState("Save");
    const [error, setError] = useState("");

    // ! To get data from DB
    useEffect(() => {
        db.collection("members")
        .doc(id)
        .get()
        .then((snapshot) => {
            console.log(snapshot.data());
            setData(snapshot.data());
            setProfilePic(snapshot.data().profile_pic);
        })
        .catch((err) => {
            console.log(err);
            setError("Failed to fetch data.");
        })
    },[id])

        // ! Function to save data to DB
        function handleSubmit(e){
            e.preventDefault();
            setLoading("Updating...");
    
            db.collection("members")
            .doc(id)
            .update({
                name: nameRef.current.value,
                profile_pic: profilePic,
                domain: domainRef.current.value,
                birthday: birthDateRef.current.value,
                linkedin_link: linkedinRef.current.value,
                twitter_link: twitterRef.current.value,
                facebook_link: facebookRef.current.value,
                instagram_link: instagramRef.current.value,
                time: firebase.firestore.Timestamp.fromDate(new Date())
            })
            .then((result) => {
                console.log(result);
                console.log("Saved");
                giveConfirmnation();
                setLoading("Updated Successfully !");
            })
            .catch((err) => {
                console.log("Error " + err);
                setLoading("Failed to update");
            })
        }

         // ! To give confirmation
        function giveConfirmnation(){
            toast({
                title: "Member updated successfully !",
                status: "success",
                duration: 6000,
                isClosable: true,
            })
            history.push("/members");
        }

        // ! Function to upload profile pic
        function handleUpload(e){
            e.preventDefault();
            console.log(picture[0]);
            setPending("Uploading...");
            setSpinner(true);

            let imageName = Date.now();
            const uploadTask = storage.ref(`members/${imageName}`).put(picture[0])
            uploadTask.on("state_changed",
            (snapshot) => {
                console.log(snapshot);
            },
            (err) => {
                console.log("Error " + err);
                console.log("Failed to upload");
                setPending("Failed");
                setSpinner(false);
            },
            () => {
                storage.ref().child("members/"+imageName)
                .getDownloadURL()
                .then(url => {
                    console.log("Url is " + url);
                    setProfilePic(url);
                    console.log(profilePic);
                    setPending("Uploaded");
                    setSpinner(false);
                })
            }
            )
        }

    return (
        <Box pb="20">
            <Container maxW="container.xl">

                <Heading mt="8" mb="10">Add New Member</Heading>

                { data &&
                <Box>
                <form onSubmit={ handleSubmit }>

                    <Center>
                    <Image mt="5" 
                    borderRadius="full"
                    boxSize="200px"
                    src={ profilePic }
                    fallbackSrc="https://via.placeholder.com/220" />
                    </Center>

                    <Center mt="6">
                    <Input onChange={ (e) => setPicture(e.target.files) } pt="1" pl="1" type="file"/>
                    </Center>

                    <Center>
                    <Button onClick={ handleUpload } w="100%" mt="5" colorScheme="orange">
                        { pending &&
                        <>
                        { pending }
                        </>
                        }
                        { spinner &&
                        <Spinner ml="4" />
                        }
                    </Button>
                    </Center>

                    <Box mt="8" mb={["8", "10"]}>
                    <FormLabel>Name</FormLabel>
                    <Input ref={ nameRef } defaultValue={ data.name } placeholder="Enter name" />
                    </Box>

                    <Box justifyContent="space-evenly" display="flex" flexWrap="wrap">
                    <Box mt="5" w={["100%", "45%"]}>
                    <FormLabel>Select Domain</FormLabel>
                    <Select ref={ domainRef } defaultValue={ data.domain } placeholder="Select option">
                    <option value="Anchor">Anchoring</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Content">Content Development</option>
                    <option value="Graphics">Graphics</option>
                    <option value="Technical">Technical</option>
                    <option value="Marketing">Marketing</option>
                    </Select>
                    </Box>
                    <Box mt="5" w={["100%", "45%"]}>
                    <FormLabel>Date of Borth</FormLabel>
                    <Input type="date" ref={ birthDateRef } defaultValue={ data.birthday }/>
                    </Box>
                    </Box>

                    <Box justifyContent="space-evenly" display="flex" flexWrap="wrap">
                    <Box mt="5" w={["100%", "45%"]}>
                    <FormLabel>Linkedin Link</FormLabel>
                    <Input ref={ linkedinRef } defaultValue={ data.linkedin_link } placeholder="Enter link" />
                    </Box>
                    <Box mt="5" w={["100%", "45%"]}>
                    <FormLabel>Twitter Link</FormLabel>
                    <Input ref={ twitterRef } defaultValue={ data.twitter_link } placeholder="Enter link" />
                    </Box>
                    </Box>

                    <Box justifyContent="space-evenly" display="flex" flexWrap="wrap" mb="10">
                    <Box mt="5" w={["100%", "45%"]}>
                    <FormLabel>Instagram</FormLabel>
                    <Input ref={ instagramRef } defaultValue={ data.instagram_link } placeholder="Enter link" />
                    </Box>
                    <Box mt="5" w={["100%", "45%"]}>
                    <FormLabel>Facebook</FormLabel>
                    <Input ref={ facebookRef } defaultValue={ data.facebook_link } placeholder="Enter link" />
                    </Box>
                    </Box>

                    <Center>
                    <Button type="submit" w="100%" mt="3" colorScheme="orange">
                        { loading && 
                        <>
                        { loading }
                        </>
                        }
                    </Button>
                    </Center>

                </form>
                </Box>}

            </Container>
        </Box>
    );
}
 
export default UpdateMember;