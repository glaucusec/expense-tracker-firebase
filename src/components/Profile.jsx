import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const toast = useToast();
  const nameRef = useRef();
  const profileURL = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          idToken: auth.idToken,
          displayName: nameRef.current.value,
          photoUrl: profileURL.current.value,
        },
        {
          "Content-Type": "application/json",
        }
      );
      if (response.status == 200) {
        toast({
          status: "success",
          title: "Details updated!",
        });
      }
    } catch (error) {
      console.log(error);
      if (error) {
        toast({
          status: "error",
          title: error.response.data.error.message,
        });
      }
    }
  };

  useEffect(() => {
    async function prefillUserData() {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
          {
            idToken: auth.idToken,
          }
        );
        if (response.status == 200) {
          const userData = response.data.users[0];
          setName(userData.displayName);
          setProfileURL(userData.photoUrl);
        }
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    }
    prefillUserData();
  }, []);
  return (
    <Box p={4} alignItems={"center"}>
      <Heading size={"md"}>Contact Details</Heading>
      <Flex pb={"1rem"}>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input type="email" ref={nameRef} />
        </FormControl>
        <FormControl>
          <FormLabel>Profile Photo URL</FormLabel>
          <Input type="email" ref={profileURL} />
        </FormControl>
      </Flex>
      <Button onClick={submitHandler}>Update</Button>
    </Box>
  );
}
