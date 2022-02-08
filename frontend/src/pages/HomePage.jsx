import React from 'react';
import {Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import LogIn from "../components/authentication/LogIn";
import SignUp from "../components/authentication/SignUp";

const HomePage = () => {
    return (
        <Container maxw={'xl'} centerContent>
            <Box d={'flex'}
                 justifyContent={'center'}
                 p={3}
                 bg={'white'}
                 w={'100%'}
                 m={"40px 0 15px 0"}
                 borderRadius={"lg"}
                 borderWidth={'1px'}

            >
                <Text fontSize={'4x1'} fontFamily={'Work Sans'}>Chat app LabTest</Text>
            </Box>
            <Box bg={'white'} w={'100%'} p={4} borderRadius={"lg"} borderWidth={'1px'}>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList marginBottom={'1em'}>
                        <Tab width={'50%'}>Log IN</Tab>
                        <Tab width={'50%'}>Sign UP</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <LogIn/>
                        </TabPanel>
                        <TabPanel>
                            <SignUp/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default HomePage;
