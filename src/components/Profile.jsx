import React, { useRef, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Profile() {
  const toast = useToast();
  const AuthCtx = useContext(AuthContext);
  const nameRef = useRef();
  const urlRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          idToken: AuthCtx.idToken,
          displayName: nameRef.current.value,
          photoUrl: urlRef.current.value,
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
      if (error) {
        toast({
          status: "error",
          title: error.response.data.error.message,
        });
      }
    }
  };
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
          <Input type="email" ref={urlRef} />
        </FormControl>
      </Flex>
      <Button onClick={submitHandler}>Update</Button>
    </Box>
  );
}
