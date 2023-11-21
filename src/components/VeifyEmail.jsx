import React, { useContext } from "react";
import { Box, Flex, Spacer, Heading, useToast, Button, Center } from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function VeifyEmail() {
  const AuthCtx = useContext(AuthContext);
  const toast = useToast();
  const verifyEmailHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          requestType: "VERIFY_EMAIL",
          idToken: AuthCtx.idToken,
        }
      );
      if (response.status == 200) {
        toast({
          status: "success",
          title: "Verification email sent",
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
    <Box pt={"1rem"}>
      <Center>
        <Heading as={"h2"} size={"sm"}>
          You haven't verified your email.{" "}
          <Button onClick={verifyEmailHandler} size={"sm"}>
            Send Link
          </Button>
        </Heading>
      </Center>
    </Box>
  );
}
