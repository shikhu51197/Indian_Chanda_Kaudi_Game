import { useState } from "react";
import {
  Text,
  Box,
  Input,
  Checkbox,
  Flex,
  Link,
  Image,
  useToast,
  Button,
} from "@chakra-ui/react";
import "../styles/Login.css";
import admin from "../Images/photo.avif";
import { useNavigate } from "react-router-dom";

interface Props {
  email: string;
  password: string;
}

const formData: Props = {
  email: "",
  password: "",
};

const Login = () => {
  // State maintained for Input tags
  const [Form, setForm] = useState<Props>(formData);
  const navigate = useNavigate();

  //Login Success toast
  const toast = useToast({
    title: `Login Successful`,
    status: "success",
    isClosable: true,
    position: "top",
  });

  //Partially filled form
  const partial = useToast({
    title: `User not Exists`,
    status: "warning",
    isClosable: true,
    position: "top",
  });

  //Error Loggin In
  const Error = useToast({
    title: `Error! Wrong Email or Password`,
    status: "error",
    isClosable: true,
    position: "top",
  });

  let data: Props[] = JSON.parse(localStorage.getItem("User") || "[]");

  const handleSubmit = (): void => {
    console.log(Form.email, Form.password);
    let b = false;

    for (let i = 0; i < data.length; i++) {
      if (data[i].email === Form.email) {
        if (data[i].password === Form.password) {
          b = true;
          localStorage.setItem("userloggedin", JSON.stringify(data[i]));
          if (Form.email && Form.password) {
            toast();
            navigate("/");
          }

          return;
        } else {
          Error();
          return;
        }
      }
    }

    if (b === false) {
      partial();
    }
  };

  return (
    <>
      <Flex align="center" justifyContent={"center"}>
        <Flex
          w="fit-content"
          flexDirection={["column", "column", "row", "row"]}
          gap={["10px", "10px", "100px", "200px"]}
          p="10"
        >
          <Box>
            <Image
              src={admin}
              w="100%"
              h={["300px", "300px", "80%", "100%"]}
              alt="game"
              borderRadius={20}
            />
          </Box>
          <Box className="formbox">
            <Text fontSize={"2xl"} fontWeight={"bold"} marginBottom={"15px"}>
              LOG INTO YOUR ACCOUNT
            </Text>
            <form>
              <Text className="Tags">
                Email Address <span style={{ color: "red" }}>*</span>
              </Text>
              <Input
                placeholder="Enter Email address here"
                className="ipbox"
                type={"email"}
                name="email"
                value={Form.email}
                onChange={(e) =>
                  setForm({ ...Form, [e.target.name]: e.target.value })
                }
              />
              <Text className="Tags">
                Password <span style={{ color: "red" }}>*</span>
              </Text>
              <Input
                placeholder="Enter Password here"
                className="ipbox"
                type={"password"}
                name="password"
                value={Form.password}
                onChange={(e) =>
                  setForm({ ...Form, [e.target.name]: e.target.value })
                }
              />
              <Flex className="forgot">
                <Checkbox defaultChecked colorScheme={"red"}>
                  Remember Me
                </Checkbox>
                <Link color="red.600">Forgot Password ?</Link>
              </Flex>
              <Button bg="red.600" className="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </form>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
