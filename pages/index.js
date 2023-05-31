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


export default function Home() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenMessageSelect, onOpen: onOpenMessageSelect, onClose: onCloseMessageSelect } = useDisclosure()
  const { isOpen: isOpenMessageSelect2, onOpen: onOpenMessageSelect2, onClose: onCloseMessageSelect2 } = useDisclosure()

  const [group, setGroup] = useState([])

  const [editIndex, setEditIndex] = useState()
  const [editText, setEditText] = useState('')

  useEffect(() => {

    console.log(group, 'group')

  }, [group])

  const handleEditMessage = (index, item) => {
    setEditIndex(index)
    setEditText(item)
  }
  const handleNewData = (e, index2, item2) => {
    if (e.key === 'Enter') {
      let text = []
        group.forEach((item , index)=>{
          if(index === index2){
            console.log(index , index2)
            text.push(item2)
          }else {
            console.log(index , index2)
            text.push(item)
          }
        })
        setGroup(text)
        setEditIndex(null)
    }
  }

  return (
    <>

      <Nav>
        <VStack justifyContent={'center'} mt={'30px'} alignItems={'center'}>
          <HStack alignItems={'end'} width={'100%'} ml={6}>
            <Button onClick={onOpen} backgroundColor={'#4662b2'} color={'white'} rightIcon={<IoAdd fontSize='25px' />} _hover={{ backgroundColor: '#556eb8' }}>
              <Text fontSize='xs'>ایجاد گروه پیامکی</Text>
            </Button>
            <Button onClick={onOpenMessageSelect2} backgroundColor={'#4662b2'} color={'white'} rightIcon={<IoAdd fontSize='25px' />} fontSize='xs' _hover={{ backgroundColor: '#556eb8' }}>اضافه کردن پیامک</Button>
          </HStack>
          <Card>
            <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
              <Text>گروه پیامکی</Text>
            </CardHeader>
            <CardBody>
              <TableContainer >
                <Table variant='simple' >
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th fontSize='xs'>نام گروه پیامکی</Th>
                      <Th fontSize='xs'>ردیف</Th>
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
                          <Td textAlign={'right'}>{editIndex === index ? <Input onKeyDown={(e) => handleNewData(e, index , editText)} value={editText} onChange={(e) => setEditText(e.target.value)} /> : item}</Td>
                          <Td>{index + 1}</Td>
                        </Tr>
                      ))
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>

          <Modals setGroup={setGroup} group={group} onClose={onClose} isOpen={isOpen} onCloseMessageSelect={onCloseMessageSelect} isOpenMessageSelect={isOpenMessageSelect} onOpenMessageSelect={onOpenMessageSelect} onCloseMessageSelect2={onCloseMessageSelect2} isOpenMessageSelect2={isOpenMessageSelect2} />

        </VStack>
      </Nav>
    </>
  )
}
