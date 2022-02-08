import React, {useState} from 'react';
import {FormControl, FormLabel, Input, VStack} from "@chakra-ui/react";

const SignUp = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [pic, setPic] = useState()
    return (
        <VStack spacing={'5px'}>
            <FormControl id={'first-name'} color={'black'} isRequired>
                <FormLabel>Name</FormLabel>
                <Input _placeholder={'enter Name'} onChange={(e) => e.target.value}></Input>
            </FormControl>
        </VStack>
    );
};

export default SignUp;
