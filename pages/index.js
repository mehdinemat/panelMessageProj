import { useEffect, useState } from 'react';
import {
  Flex, HStack, Text, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,
  Card, CardHeader, CardBody, CardFooter, IconButton, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider, Button, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Center,
  VStack,
} from '@chakra-ui/react'

import Modals from '@/components/modals/Modals';

import { useDisclosure } from '@chakra-ui/react';

import { Inter } from 'next/font/google'
import { FaEllipsisV } from "react-icons/fa";
import { IoAdd } from 'react-icons/io5'
import { CiEdit } from 'react-icons/ci'
import Nav from './nav'

import Header from '@/components/Header';
import axios from 'axios';

import ResponsivePagination  from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css';

export default function Home() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenMessageSelect, onOpen: onOpenMessageSelect, onClose: onCloseMessageSelect } = useDisclosure()
  const { isOpen: isOpenMessageSelect2, onOpen: onOpenMessageSelect2, onClose: onCloseMessageSelect2 } = useDisclosure()

  const [group, setGroup] = useState([])

  const [editIndex, setEditIndex] = useState()
  const [editText, setEditText] = useState('')

  const [newMessage , setNewMessage] = useState([])

  const [currentPage , setCurrentPage] = useState(1)

  useEffect(() => {

    const fetch =async()=>{
      const res = await axios.get(`http://localhost:5000/v1/messagegroup?page=${currentPage}`)
      setGroup(res.data.messageGroup)
    }
    fetch()

  }, [currentPage])

  const handleEditMessage = (index, item) => {
    setEditIndex(index)
    setEditText(item.name)
  }
  const handleNewData =async (e, index2, item2 , data) => {
    if (e.key === 'Enter') {
      const res = await axios.patch(`http://localhost:5000/v1/messagegroup` , {...data , name:item2})
      let text = []
        group.forEach((item , index)=>{
          console.log(item)
          if(item._id === data._id){
            text.push({...data , name:item2})
          }else {
            text.push(item)
          }
        })
        setGroup(text)
        setEditIndex(null)
    }
  }
  const handleCurrentPage =(e)=>{
      setCurrentPage(e)
  }

  return (
    <>

      <Nav>
        <VStack justifyContent={'center'} mt={'30px'} alignItems={'center'}>
          <HStack alignItems={'end'} width={'100%'} ml={20}>
            <Button onClick={onOpen} backgroundColor={'#4662b2'} color={'white'} rightIcon={<IoAdd fontSize='25px' />} _hover={{ backgroundColor: '#556eb8' }}>
              <Text fontSize='xs'>ایجاد گروه پیامکی</Text>
            </Button>
            <Button onClick={onOpenMessageSelect2} backgroundColor={'#4662b2'} color={'white'} rightIcon={<IoAdd fontSize='25px' />} fontSize='xs' _hover={{ backgroundColor: '#556eb8' }}>اضافه کردن پیامک</Button>
          </HStack>
          <Card width={'calc(100% - 80px)'}>
            <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
              <Text>گروه پیامکی</Text>
            </CardHeader>
            <CardBody>
              <TableContainer >
                <Table variant='simple' >
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th fontSize='xs' boxSize={2} width={'473px'} textAlign={'right'}>نام گروه پیامکی</Th>
                      <Th fontSize='xs' boxSize={2}>ردیف</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      group?.map((item, index) => (
                        <Tr>
                          <Td><Menu >
                            <MenuButton as={IconButton} color='gray.600' variant='soft' icon={<FaEllipsisV />}  >
                              Actions
                            </MenuButton>
                            <MenuList >
                              <MenuItem onClick={() => handleEditMessage(index, item)} alignItems={'center'} justifyContent={'end'}>
                                <Text marginRight={5}>ویرایش</Text>
                                <CiEdit/>
                              </MenuItem>
                            </MenuList>
                          </Menu></Td>
                          <Td textAlign={'right'}>{editIndex === index ? <Input onKeyDown={(e) => handleNewData(e, index , editText , item)} value={editText} onChange={(e) => setEditText(e.target.value)} /> : item.name}</Td>
                          <Td textAlign={'right'}>{((currentPage - 1 )* 6 ) + index + 1}</Td>
                        </Tr>
                      ))
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
               <CardFooter>
               <ResponsivePagination
                  current={currentPage}
                  total={100}
                  onPageChange={handleCurrentPage}
                  maxWidth={'100px'}
                />
               </CardFooter>
          </Card>

          <Modals newMessage={newMessage} setNewMessage={setNewMessage} setGroup={setGroup} group={group} onClose={onClose} isOpen={isOpen} onCloseMessageSelect={onCloseMessageSelect} isOpenMessageSelect={isOpenMessageSelect} onOpenMessageSelect={onOpenMessageSelect} onCloseMessageSelect2={onCloseMessageSelect2} isOpenMessageSelect2={isOpenMessageSelect2} />

        </VStack>
      </Nav>
    </>
  )
}
