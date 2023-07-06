import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  Stack,
  useToast,
} from '@chakra-ui/react';
import ColoredLine from '../ColoredLine';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleShowPassword = () => setShowPassword(!showPassword);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if ( !email || !password ) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user/login',
        {
          email,
          password,
        },
        config
      );
      await console.log(data);
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error Occured!',
        description: error.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <ColoredLine />

      <form onSubmit={submitHandler}>
        <Stack spacing="4" my="20px">
          <FormControl id="email-login" isRequired>
            <FormLabel>Your Email</FormLabel>
            <Input
              border="1px"
              borderColor="gray.400"
              type="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>

          <FormControl id="password-login" isRequired>
            <FormLabel>Password</FormLabel>

            <InputGroup>
              <Input
                border="1px"
                borderColor="gray.400"
                pr="4.5rem"
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            type="submit"
            bg="#FED7D7"
            _hover={{ bg: 'red', color: 'white' }}
            color="#9B2C2C"
            isLoading={loading}
          >
            Login
          </Button>
          <Button
            bg="cyan"
            _hover={{ bg: 'red', color: 'white' }}
            color="#9B2C2C"
            onClick={() =>{
              setEmail('guest@mail.com');
              setPassword('hope you like it');
            }}
          >
            Guest Credentials
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Login;
