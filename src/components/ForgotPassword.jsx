import React, { useState } from "react";
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

const API_KEY = import.meta.env.VITE_API_KEY;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [email, setEmail] = useState("");

  const emailUpdateHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          requestType: "PASSWORD_RESET",
          email: email,
        },
        {
          "Content-Type": "application/json",
        }
      );
      if (response.status == 200) {
        setIsLoading(false);
        toast({
          status: "success",
          title: "Reset Link sent to mail!",
        });
      }
    } catch (error) {
      setIsLoading(false);
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
      <Heading size={"md"}>Forgot password!</Heading>

      <FormControl>
        <FormLabel>Enter the email</FormLabel>
        <Input type="email" value={email} onChange={emailUpdateHandler} />
      </FormControl>

      <Button isLoading={isLoading ? true : false} onClick={submitHandler}>Send reset link</Button>
    </Box>
  );
}
