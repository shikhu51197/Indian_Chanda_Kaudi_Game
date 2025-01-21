import { useState } from "react";
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Box,
    Stack,
    Image,
    useToast
  } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";


interface Props {
  email: string;
  password: string;
  name: string;
  image: string;
}
const formData: Props = {
  email: "",
  password: "",
  name:"",
  image:"",
};

  export default function Signup() {

    const [Form, setForm] = useState<Props>(formData);
    const navigate = useNavigate();
     
  
    //Login Success toast
     const toast = useToast({
      title: `Signup Successful`,
       status: "success",
       isClosable: true,
       position: "top",
     });
  
   

  
   
let arr: Props[] = JSON.parse(localStorage.getItem("User") as string) || [];

const handleSubmit = (): void => {
  let name: string = Form.name;
  let email: string = Form.email;
  let image: string = Form.image;
  let password: string = Form.password;

  const payload: Props = {
    name: name,
    email: email,
    image: image,
    password: password,
  }

  console.log(payload);

  arr.push(payload);
  localStorage.setItem("User", JSON.stringify(arr));
  if(payload?.name && payload?.email && payload?.password){
    toast()
    navigate("/login")
   }
}
    

    return (
      <>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Sign Up to your account</Heading>
            <FormControl id="name">
              <FormLabel>Full Name</FormLabel>
              <Input type="text" name="name"
              value={Form.name}
              onChange={(e) =>
                setForm({ ...Form, [e.target.name]: e.target.value })
              }/>
            </FormControl>
            <FormControl id="image">
              <FormLabel>Image Url</FormLabel>
              <Input type="Url" name="image"
              value={Form.image}
              onChange={(e) =>
                setForm({ ...Form, [e.target.name]: e.target.value })
              }/>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email"
              value={Form.email}
              onChange={(e) =>
                setForm({ ...Form, [e.target.name]: e.target.value })
              }/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password"
              value={Form.password}
              onChange={(e) =>
                setForm({ ...Form, [e.target.name]: e.target.value })
              }/>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Box onClick={() => navigate("/login")} color={'red.500'}>Already Have an account?</Box>
              </Stack>
            
              <Button w="full" colorScheme={'red'} variant={'solid'}  onClick={handleSubmit}
           >
                Submit 
              </Button>
            
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          />
        </Flex>
      </Stack>
      </>
    );
  }