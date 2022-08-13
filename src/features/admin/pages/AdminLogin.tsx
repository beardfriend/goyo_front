import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack
} from '@chakra-ui/react';
import { setFontsize } from '@Features/common/slices/CommonSlice';
import { useState } from 'react';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

function AdminLogin() {
  const dispatch = useDispatch();
  dispatch(setFontsize('20px'));
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        flexDir='column'
        mb='2'
        justifyContent='center'
        alignItems='center'
      >
        <Avatar bg='teal.500' />
        <Heading color='teal.400'>Admin Page</Heading>
        <Box width='700px'>
          <form>
            <Stack
              spacing={4}
              p='1rem'
              backgroundColor='whiteAlpha.900'
              boxShadow='md'
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaUserAlt color='gray.300' />}
                  />
                  <Input type='email' placeholder='email address' />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    children={<CFaLock color='gray.300' />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                colorScheme='teal'
                width='full'
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default AdminLogin;
