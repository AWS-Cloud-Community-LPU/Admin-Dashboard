import "./Sidenav.css";
import React, { useState, useEffect } from "react";
import { Box, Text, Button, Center } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Sidenav = () => {

    // const { logout } = useAuth();
    const history = useHistory();
    const [error, setError] = useState("");

    const [home, setHome] = useState("");
    const [createBlog, setCreateBlog] = useState("");
    const [events, setEvents] = useState("");
    const [createEvent, setCreateEvent] = useState("");
    const [quiz, setQuiz] = useState("");
    const [createQuiz, setCreateQuiz] = useState("");
    const [members, setMembers] = useState("");
    const [addMember, setAddMember] = useState("");

    useEffect(() => {
        console.log(window.location.pathname);
        switch(window.location.pathname){

            case "/" :
                setHome("home");
            break;

            case "/create/blog" :
                setCreateBlog("create-blog");
            break;

            case "/events" :
                setEvents("events");
            break;

            case "/create/event" :
                setCreateEvent("create-event");
            break;

            case "/create/quiz" :
                setCreateQuiz("create-quiz");
            break;

            case "/quiz/questions" :
                setCreateQuiz("quiz");
            break;

            case "/members" :
                setMembers("members");
            break;

            case "/add/members" :
                setAddMember("add-member");
            break;

            default: setHome("home");
        }
    },[]);

    function switchIndicator(){ 
        setTimeout(
            function(){
                window.location.reload();
            },10);
    }

    // ! Function for logout
    async function handleLogout() {
        setError("");
    
        try {
        //   await logout();
          history.push("/login");
        } catch {
          setError("Failed to log out");
        }
    }

    return (
        <Box>

            <Link onClick={switchIndicator} to="/">
            <Text className={home} cursor="pointer" borderRadius="md" 
            mx="2" pl="16" py="3" _hover={{ bg: "orange.200" }} 
            fontSize="lg" mt="10">Blogs</Text>
            </Link>

            <Link onClick={switchIndicator} to="/create/blog">
            <Text className={createBlog} cursor="pointer" borderRadius="md" 
            mx="2" pl="16" py="3" _hover={{ bg: "orange.200" }} 
            fontSize="lg" mt="2">New Blog</Text>
            </Link>

            <Link onClick={switchIndicator} to="/events">
            <Text className={events} cursor="pointer" borderRadius="md"
             mx="2" pl="16" py="3" _hover={{ bg: "orange.200" }} 
             fontSize="lg" mt="2">Events</Text>
            </Link>

            <Link onClick={switchIndicator} to="/create/event">
            <Text className={createEvent} cursor="pointer" borderRadius="md"
             mx="2" pl="16" py="3" _hover={{ bg: "orange.200" }} 
             fontSize="lg" mt="2">New Events</Text>
            </Link>

            <Link onClick={switchIndicator} to="/quiz/questions">
            <Text className={quiz} cursor="pointer" borderRadius="md"
             mx="2" pl="16" py="3" _hover={{ bg: "orange.200" }} 
             fontSize="lg" mt="2">Quiz</Text>
            </Link>

            <Link onClick={switchIndicator} to="/create/quiz">
            <Text className={createQuiz} cursor="pointer" borderRadius="md"
             mx="2" pl="16" py="3" _hover={{ bg: "orange.200" }} 
             fontSize="lg" mt="2">Create Quiz</Text>
            </Link>

            <Link onClick={switchIndicator} to="/members">
            <Text className={members} cursor="pointer" borderRadius="md" 
            mx="2" pl="16" py="3" _hover={{ bg: "orange.200" }} 
            fontSize="lg" mt="2">Members</Text>
            </Link>

            <Link onClick={switchIndicator} to="/add/members">
            <Text className={addMember} cursor="pointer" borderRadius="md" 
            mx="2" pl="16" py="3" _hover={{ bg: "orange.200" }} 
            fontSize="lg" mt="2">Add Members</Text>
            </Link>

            <Center>
            <Button onClick={ handleLogout } mt="3" w="80%" mx="auto" colorScheme="red">Logout</Button>
            </Center>

        </Box>
    );
}
 
export default Sidenav;