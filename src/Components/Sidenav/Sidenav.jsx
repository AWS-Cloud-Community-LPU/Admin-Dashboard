import "./Sidenav.css";
import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

const Sidenav = () => {

    const [home, setHome] = useState("");
    const [createBlog, setCreateBlog] = useState("");
    const [events, setEvents] = useState("");
    const [createEvent, setCreateEvent] = useState("");
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

    return (
        <Box>
            <Heading pl="16" mt="6" fontSize="xl">CATEGORIES</Heading>

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

        </Box>
    );
}
 
export default Sidenav;