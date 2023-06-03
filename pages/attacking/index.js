import React, { useState, useEffect } from 'react'
import Nav from '../nav'
import { Card, CardFooter, CardBody, CardHeader, Text, Table, TableContainer, Thead, Th, Tr, Tbody, Td, Menu, MenuButton, MenuList, IconButton, MenuItem, Button, VStack, HStack, onOpen } from '@chakra-ui/react'
import { FaEllipsisV } from "react-icons/fa";
import axios from 'axios';
import { useDisclosure } from '@chakra-ui/react';

import { IoAdd } from 'react-icons/io5'

import Modals from '@/components/modals/Modals';


const index = () => {

  const [listAttacking, setListAttacking] = useState([])

  const { isOpen: isOpenAddGroupAttacking, onOpen: onOpenAddGroupAttacking , onClose: onCloseAddGroupAttacking } = useDisclosure()


  useEffect(() => {

    const fetch = async () => {
      const res = await axios.get('http://localhost:5000/v1/attacking')
      setListAttacking(res.data.attacking)
      console.log(res.data.attacking)
    }
    fetch()

  }, [])

  return (
    <>
      <Nav>
        <VStack justifyContent={'center'} mt={'30px'} alignItems={'center'}>
          <HStack alignItems={'end'} width={'100%'} ml={20}>
            <Button onClick={onOpenAddGroupAttacking} backgroundColor={'#4662b2'} color={'white'} rightIcon={<IoAdd fontSize='25px' />} _hover={{ backgroundColor: '#556eb8' }}>
              <Text fontSize='xs'>ایجاد گروه عملیات کننده</Text>
            </Button>
          </HStack>
          <Card width={'calc(100% - 80px)'}>
            <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
              <Text>گروه عملیات کننده</Text>
            </CardHeader>
            <CardBody>
              <TableContainer sx={{ direction: 'rtl' }}>
                <Table variant='simple' size='lg' >
                  <Thead>
                    <Tr>
                      <Th boxSize={2}><Text>ردیف</Text></Th>
                      <Th width={'100%'}>نام گروه کاری عملیات کننده</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      listAttacking.map((item, index) => (
                        <Tr>
                          <Td>{index + 1}</Td>
                          <Td>{item?.name}</Td>
                          <Td>
                            <Menu >
                              <MenuButton as={IconButton} color='gray.600' variant='soft' icon={<FaEllipsisV />}  >
                                Actions
                              </MenuButton>
                              <MenuList>
                                <MenuItem onClick={() => handleEditMessage(index, item)}>ویرایش</MenuItem>
                              </MenuList>
                            </Menu>
                          </Td>
                        </Tr>
                      ))
                    }
                  </Tbody>
                </Table>
              </TableContainer>
              <Button mt={'2'} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ثبت</Button>
            </CardBody>
          </Card>

          <Modals isOpenAddGroupAttacking={isOpenAddGroupAttacking} onCloseAddGroupAttacking={onCloseAddGroupAttacking} setListAttacking={setListAttacking} listAttacking={listAttacking}/>

        </VStack>
      </Nav>
    </>
  )
}

export default index
