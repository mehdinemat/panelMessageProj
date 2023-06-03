import React, { useEffect, useState } from 'react'
import Nav from '../nav'
import { SiAddthis } from "react-icons/si";
import { FaEllipsisV } from "react-icons/fa";

import { Card, CardHeader, CardFooter, Button , CardBody, Text, HStack, VStack, IconButton, Input, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { IoAdd } from 'react-icons/io5'

import Modals from '@/components/modals/Modals';

const attacked = () => {

  const [selectMessage, setSelectMessage] = useState('')
  const [listAttacked, setListAttacked] = useState([])

  const { isOpen: isOpenAddGroupName , onOpen: onOpenAddGroupName , onClose: onCloseAddGroupName } = useDisclosure()
  const { isOpen: isOpenWorkGrouopAttacked , onOpen: onOpenWorkGrouopAttacked , onClose: onCloseWorkGrouopAttacked } = useDisclosure()

  const handleSetSelectMessage = () => {

  }
  useEffect(() => {

    const fetch = async () => {
      const res = await axios.get('http://localhost:5000/v1/attacked')
      setListAttacked(res.data.attacked)
      console.log(res.data.attacked)
    }
    fetch()

  }, [])

  return (
    <>
      <Nav>
        <VStack justifyContent={'center'} mt={'30px'} alignItems={'center'}>
          <HStack alignItems={'end'} width={'100%'} ml={20}>
            <Button onClick={onOpenWorkGrouopAttacked}  backgroundColor={'#4662b2'} color={'white'} rightIcon={<IoAdd fontSize='25px' />} fontSize='xs' _hover={{ backgroundColor: '#556eb8' }}>ایجاد گروه عملیات شده</Button>
          </HStack>
          <Card width={'calc(100% - 80px)'}>
            <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
              <Text>گروه عملیات شده</Text>
            </CardHeader>
            <CardBody>
              <TableContainer sx={{ direction: 'rtl' }}>
                <Table variant='simple' size='lg' >
                  <Thead>
                    <Tr>
                      <Th fontSize='xs' boxSize={2}>ردیف</Th>
                      <Th fontSize='xs' width={'100%'}>نام گروه عملیات شده</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      listAttacked.map((item, index) => (
                        <Tr>
                          <Td>{index + 1}</Td>
                          <Td>{item.name}</Td>
                          <Td><Menu >
                            <MenuButton as={IconButton} color='gray.600' variant='soft' icon={<FaEllipsisV />}  >
                              Actions
                            </MenuButton>
                            <MenuList>
                              <MenuItem onClick={() => handleEditMessage(index, item)} fontSize='xs'>ویرایش</MenuItem>
                            </MenuList>
                          </Menu></Td>
                        </Tr>
                      ))
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
          <Modals isOpenWorkGrouopAttacked={isOpenWorkGrouopAttacked} onCloseWorkGrouopAttacked={onCloseWorkGrouopAttacked}/>
        </VStack>
      </Nav>
    </>
  )
}

export default attacked
