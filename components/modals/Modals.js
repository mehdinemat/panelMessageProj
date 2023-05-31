import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Flex, Input, Button, Center, Card, CardBody, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text, IconButton, Icon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText, Select, Checkbox, CheckboxGroup, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  HStack,
  VStack,
  CardHeader,
} from '@chakra-ui/react'

import { SiAddthis } from "react-icons/si";

import { useDisclosure } from '@chakra-ui/react';

import _ from 'lodash'

import { FaEllipsisV } from "react-icons/fa";

import { IoAdd } from 'react-icons/io5'


const Modals = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenAttacked, onOpen: onOpenAttacked, onClose: onCloseAttacked } = useDisclosure()
  const { isOpen: isOpenGroupAttacked, onOpen: onOpenGroupAttacked, onClose: onCloseGroupAttacked } = useDisclosure()
  const { isOpen: isOpenListAttacked, onOpen: onOpenListAttacked, onClose: onCloseListAttacked } = useDisclosure()
  const { isOpen: isOpenWorkGrouopAttacked, onOpen: onOpenWorkGrouopAttacked, onClose: onCloseWorkGrouopAttacked } = useDisclosure()
  const { isOpen: isOpenAddGroupAttacked, onOpen: onOpenAddGroupAttacked, onClose: onCloseAddGroupAttacked } = useDisclosure()
  const { isOpen: isOpenGroupAttacking, onOpen: onOpenGroupAttacking, onClose: onCloseGroupAttacking } = useDisclosure()
  const { isOpen: isOpenAddGroupAttacking, onOpen: onOpenAddGroupAttacking, onClose: onCloseAddGroupAttacking } = useDisclosure()
  const { isOpen: isOpenNumber, onOpen: onOpenNumber, onClose: onCloseNumber } = useDisclosure()
  const { isOpen: isOpenAddNumber, onOpen: onOpenAddNumber, onClose: onCloseAddNumber } = useDisclosure()

  const [newGroup, setNewGroup] = useState('')

  const [messageChecked, setMessageChecked] = useState({})

  const [selectMessage, setSelectMessage] = useState('')
  const [dataSelectMessage, setDataSelectMessage] = useState([])

  // new Modals 
  const [dataAttacked, setDataAttacked] = useState([])

  const handleSetGroup = () => {
    props.setGroup([...props.group, newGroup])
    setNewGroup('')
  }

  useEffect(() => {

    if (!isOpen) {
      setNewGroup('')
    }

  }, [props.isOpen])

  useEffect(() => {
    console.log(selectMessage)
  }, [selectMessage])

  const handleSetSelectMessage = () => {
    setDataSelectMessage([...dataSelectMessage, selectMessage])
    setSelectMessage('')
  }



  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'column'}>
              <Flex justifyContent={'space-between'} >
                <Input mr={'5'} size={'md'} onChange={(v) => setNewGroup(v.target.value)} value={newGroup} />
                <label fontSize='xs'>نام گروه پیامکی</label>
              </Flex>
              <Flex justifyContent={'space-between'} my={'30px'}>
                <Button onClick={handleSetGroup} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ثبت</Button>
                <Button onClick={props.onOpenMessageSelect} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>انتخاب پیامک ها</Button>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onOpenGroupAttacking} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={props.onCloseMessageSelect} size={'full'} isOpen={props.isOpenMessageSelect}  >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ><Center ></Center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={'center'} alignItems={'center'} height={'container.md'} flexDirection={'column'}>
              <Card>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>انتخاب پیامک ها</Text>
                </CardHeader>
                <CardBody>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th><Text fontSize='xs'>ردیف</Text></Th>
                          <Th fontSize='xs'>پیامک</Th>
                          <Th fontSize='xs'>انتخاب</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          Array(4).fill().map((item, index) => (
                            <Tr>
                              <Td>{index + 1}</Td>
                              <Td fontSize='xs'>خالی</Td>
                              <Td><Checkbox onChange={e => setMessageChecked({ ...messageChecked, [index]: e.target.checked })}></Checkbox></Td>
                            </Tr>
                          ))
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Button mt={'2'} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ثبت</Button>
                </CardBody>
              </Card>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.onCloseMessageSelect} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>بستن</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal onClose={props.onCloseMessageSelect2} size={'full'} isOpen={props.isOpenMessageSelect2}  >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack justifyContent={'center'} alignItems={'center'} mt={'50px'} >
              <Card>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>انتخاب پیامک ها</Text>
                </CardHeader>
                <CardBody>
                  <HStack>
                    <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={handleSetSelectMessage} />
                    <Input w={'container.sm'} value={selectMessage} onChange={(e) => setSelectMessage(e.target.value)} />
                  </HStack>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th><Text fontSize='xs'>ردیف</Text></Th>
                          <Th fontSize='xs'>پیامک</Th>
                          <Th fontSize='xs'>مناسب جهت</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          dataSelectMessage?.map((item, index) => (
                            <Tr>
                              <Td>{index + 1}</Td>
                              <Td>{item}</Td>
                              <Td>
                                <FormControl onClick={onOpen}>
                                  <Select >
                                  </Select>
                                </FormControl>
                              </Td>
                            </Tr>
                          ))
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Button mt={'2'} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ثبت</Button>
                </CardBody>
              </Card>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.onCloseMessageSelect2} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>بستن</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'column'}>
              <Flex justifyContent={'space-between'} >
                <Input mr={'5'} size={'md'} />
                <label fontSize='xs'>پیامک مناسب</label>
              </Flex>
              <Flex justifyContent={'space-between'} my={'30px'}>
                <Button fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ثبت</Button>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {/* new Modals for attacked  */}

      <Modal onClose={onCloseAttacked} size={'full'} isOpen={isOpenAttacked}  >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={'center'} alignItems={'center'} height={'container.md'} flexDirection={'column'}>
              <Flex float={'left'} width={'max'}>
                <Button mb={'5'} onClick={onOpenGroupAttacked} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ایجاد گروه عملیات شده</Button>
              </Flex>
              <Card>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>گروه عملیات شده</Text>
                </CardHeader>
                <CardBody>
                  <Flex>
                    <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={handleSetSelectMessage} />
                    <Input w={'container.sm'} value={selectMessage} onChange={(e) => setSelectMessage(e.target.value)} />
                  </Flex>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th><Text fontSize='xs'>ردیف</Text></Th>
                          <Th fontSize='xs'>نام گروه عملیات شده</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          Array(4).fill().map((item, index) => (
                            <Tr>
                              <Td>{index + 1}</Td>
                              <Td>{item}</Td>
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
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseAttacked} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>بستن</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenGroupAttacked} onClose={onCloseGroupAttacked} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'column'}>
              <Flex justifyContent={'space-between'} >
                <Input mr={'5'} size={'md'} onChange={(v) => setNewGroup(v.target.value)} value={newGroup} />
                <label fontSize='xs'>نام گروه عملیات شده</label>
              </Flex>
              <Flex justifyContent={'space-between'} my={'30px'}>
                <Button onClick={handleSetGroup} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ثبت</Button>
                <Button onClick={handleSetGroup} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>اسامی گروه عملیات شده</Button>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal onClose={onCloseListAttacked} size={'full'} isOpen={isOpenListAttacked}  >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={'center'} alignItems={'center'} height={'container.md'} flexDirection={'column'}>
              <Card>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>اسامی گروه عملیات شده</Text>
                </CardHeader>
                <CardBody>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th><Text fontSize='xs'>ردیف</Text></Th>
                          <Th fontSize='xs'>نام و نام خانوادگی</Th>
                          <Th fontSize='xs'>انتخاب</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          Array(4).fill().map((item, index) => (
                            <Tr>
                              <Td>{index + 1}</Td>
                              <Td fontSize='xs'>خالی</Td>
                              <Td><Checkbox onChange={e => setMessageChecked({ ...messageChecked, [index]: e.target.checked })}></Checkbox></Td>
                            </Tr>
                          ))
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Button mt={'2'} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ثبت</Button>
                </CardBody>
              </Card>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseListAttacked} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>بستن</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal onClose={onCloseWorkGrouopAttacked} size={'full'} isOpen={isOpenWorkGrouopAttacked}  >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={'center'} alignItems={'center'} height={'container.md'} flexDirection={'column'}>
              <Flex float={'left'} width={'max'}>
                <Button mb={'5'} onClick={onOpenAddGroupAttacked} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ایجاد گروه عملیات شده</Button>
              </Flex>
              <Card>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>لیست گروه کاری عملیات شده</Text>
                </CardHeader>
                <CardBody>
                  <Flex>
                    <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={handleSetSelectMessage} />
                    <Input w={'container.sm'} value={selectMessage} onChange={(e) => setSelectMessage(e.target.value)} />
                  </Flex>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th><Text fontSize='xs'>ردیف</Text></Th>
                          <Th fontSize='xs'>نام و نام خانوادگی</Th>
                          <Th fontSize='xs'>نام گروه کاری عملیات شده</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          dataSelectMessage?.map((item, index) => (
                            <Tr>
                              <Td>{index + 1}</Td>
                              <Td>{item}</Td>
                              <Td>
                                <FormControl onClick={onOpen}>
                                  <Select >
                                  </Select>
                                </FormControl>
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
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseWorkGrouopAttacked} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>بستن</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal isOpen={isOpenAddGroupAttacked} onClose={onCloseAddGroupAttacked} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'column'}>
              <Flex justifyContent={'space-between'} >
                <Input mr={'5'} size={'md'} onChange={(v) => setNewGroup(v.target.value)} value={newGroup} />
                <label >نام گروه عملیات شده</label>
              </Flex>
              <Flex justifyContent={'space-between'} my={'30px'}>
                <Button onClick={handleSetGroup} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ثبت</Button>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {/* new Modals for attacking  */}


      <Modal onClose={onCloseGroupAttacking} size={'full'} isOpen={isOpenGroupAttacking}  >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack justifyContent={'center'} alignItems={'center'} >
              <HStack textAlign={'end'} width={'100%'}>
                <Button mb={'5'} onClick={onOpenAddGroupAttacking} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} rightIcon={<IoAdd fontSize='25px' />} fontSize={'sm'}>ایجاد گروه عملیات کننده</Button>
              </HStack>
              <Card>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>گروه عملیات کننده</Text>
                </CardHeader>
                <CardBody>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th><Text>ردیف</Text></Th>
                          <Th>نام گروه کاری عملیات کننده</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          Array(4).fill().map((item, index) => (
                            <Tr>
                              <Td>{index + 1}</Td>
                              <Td>{item}</Td>
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
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseGroupAttacking} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>بستن</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal isOpen={isOpenAddGroupAttacking} onClose={onCloseAddGroupAttacking} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'column'}>
              <Flex justifyContent={'space-between'} >
                <Input mr={'5'} size={'md'} onChange={(v) => setNewGroup(v.target.value)} value={newGroup} />
                <label style={{fontSize:'12px'}}>نام گروه عملیات کننده</label>
              </Flex>
              <Flex justifyContent={'space-between'} my={'30px'}>
                <Button onClick={handleSetGroup} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} fontSize={'sm'}>ثبت</Button>
                <Button onClick={onOpenNumber} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} fontSize={'sm'}>شماره سیم کارت گروه عملیات کننده</Button>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal onClose={onCloseNumber} size={'full'} isOpen={isOpenNumber}  >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ><Center>لیست شماره سیم کارت ها</Center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack justifyContent={'center'} >
              <HStack float={'left'} width={'max'}>
                <Button mb={'5'} onClick={onOpenAddNumber} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>اضافه کردن سیم کارت</Button>
              </HStack>
              <Card>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>لیست شماره سیم کارت ها</Text>
                </CardHeader>
                <CardBody>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th><Text>ردیف</Text></Th>
                          <Th>شماره سیم کارت</Th>
                          <Th>انتخاب</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          Array(4).fill().map((item, index) => (
                            <Tr>
                              <Td>{index + 1}</Td>
                              <Td>{item}</Td>
                              <Td>
                                <Checkbox ></Checkbox>
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
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseNumber} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>بستن</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



      <Modal onClose={onCloseAddNumber} size={'full'} isOpen={isOpenAddNumber}  >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack justifyContent={'center'}>
              <Card>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>گروه پیامکی</Text>
                </CardHeader>
                <CardBody>
                  <HStack justifyContent={'space-between'} mb={5}>
                    <Input mr={'5'} size={'md'} onChange={(v) => setNewGroup(v.target.value)} value={newGroup} />
                    <label style={{ width: '65%', textAlign: 'right' }}>شماره</label>
                  </HStack>
                  <HStack justifyContent={'space-between'} mb={5}>
                    <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={handleSetSelectMessage} />
                    <FormControl onClick={onOpen}>
                      <Select >
                      </Select>
                    </FormControl>
                    <label style={{ width: '100%', textAlign: 'right' }}>نام اپراتور</label>
                  </HStack>
                  <HStack justifyContent={'space-between'} mb={5}>
                    <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={handleSetSelectMessage} />
                    <FormControl onClick={onOpen}>
                      <Select >
                      </Select>
                    </FormControl>
                    <label style={{ width: '100%', textAlign: 'right' }}>مالکیت</label>
                  </HStack >
                  <HStack justifyContent={'space-between'} mb={5}>
                    <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={handleSetSelectMessage} />
                    <FormControl onClick={onOpen}>
                      <Select >
                      </Select>
                    </FormControl>
                    <label style={{ width: '100%', textAlign: 'right' }}>محل فعالیت</label>
                  </HStack>
                </CardBody>
              </Card>
              <Card>
              <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>گروه پیامکی</Text>
                </CardHeader>
                <CardBody>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th><Text>ردیف</Text></Th>
                          <Th>شماره سیم کارت</Th>
                          <Th>انتخاب</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          Array(4).fill().map((item, index) => (
                            <Tr>
                              <Td>{index + 1}</Td>
                              <Td>{item}</Td>
                              <Td>
                                <Checkbox ></Checkbox>
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
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseAddNumber} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>بستن</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>






    </>
  )
}

export default Modals
