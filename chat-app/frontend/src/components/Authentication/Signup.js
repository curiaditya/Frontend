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
  FormHelperText,
} from '@chakra-ui/react';
import ColoredLine from '../ColoredLine';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
    console.log(name, email, password, image);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user',
        {
          name,
          email,
          password,
          image,
        },
        config
      );
      await console.log(data);
      toast({
        title: 'Registration Successful',
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
        description: error.response.data.errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  const postDetails = (image) => {
    setLoading(true);
    if (!image) {
      toast({
        title: 'Invalid image upload',
        description: 'Please select a valid image.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    console.log(image);
    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'chat-app');
      formData.append('cloud_name', 'dn9xw2ij2');
      fetch('https://api.cloudinary.com/v1_1/dn9xw2ij2/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: 'Invalid image upload 1',
        description: 'Please select a valid image.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      e.target.setCustomValidity(
        'Password must be at least 8 characters long.'
      );
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <>
      <ColoredLine />

      <form onSubmit={submitHandler}>
        <Stack spacing="4" my="20px">
          <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              border="1px"
              borderColor="gray.400"
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>

          <FormControl id="email-signup" isRequired>
            <FormLabel>Your Email</FormLabel>
            <Input
              border="1px"
              borderColor="gray.400"
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>

          <FormControl id="password-signup" isRequired>
            <FormLabel>Password</FormLabel>

            <InputGroup>
              <Input
                border="1px"
                borderColor="gray.400"
                pr="4.5rem"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                onChange={handlePasswordChange}
                pattern="^.{8,}$"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText>
              Password must be at least 8 characters long.
            </FormHelperText>
          </FormControl>

          <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>

            <InputGroup>
              <Input
                border="1px"
                borderColor="gray.400"
                pr="4.5rem"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Enter password again"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl id="image">
            <FormLabel>Upload Your Picture</FormLabel>
            <Input
              type="file"
              accept="image/*"
              p={1}
              onChange={(e) => {
                postDetails(e.target.files[0]);
              }}
            />
          </FormControl>

          <Button
            type="submit"
            bg="#FED7D7"
            _hover={{ bg: 'red', color: 'white' }}
            color="#9B2C2C"
            // onClick={submitHandler}
            isLoading={loading}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Signup;
