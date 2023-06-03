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
  CardHeader, CardFooter
} from '@chakra-ui/react'

import { SiAddthis } from "react-icons/si";

import { useDisclosure } from '@chakra-ui/react';

import _ from 'lodash'

import { FaEllipsisV } from "react-icons/fa";

import { IoAdd } from 'react-icons/io5'

import axios from 'axios';

import ResponsivePagination from 'react-responsive-pagination'


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
  const { isOpen: isOpenOwner, onOpen: onOpenOwner, onClose: onCloseOwner } = useDisclosure()
  const { isOpen: isOpenLocation, onOpen: onOpenLocation, onClose: onCloseLocation } = useDisclosure()
  const { isOpen: isOpenOperator, onOpen: onOpenOperator, onClose: onCloseOperator } = useDisclosure()

  const [newGroup, setNewGroup] = useState('')
  const [selectMessage, setSelectMessage] = useState('')

  const [messageChecked, setMessageChecked] = useState([])


  const [dataSelectMessage, setDataSelectMessage] = useState([])

  const [allMessage, setAllMessages] = useState([])

  const [dataOfSimNumber, setDataOfSimNumber] = useState([])


  //add simNumber Section
  const [opOwnLocName, setOpOwnLocName] = useState('')
  const [operatorName , setOperatorName] = useState('')
  const [locationName , setLocationName] = useState('')
  const [ownerName , setOwnerName] = useState('')
  const [number , setNumber] = useState('')
  const [locationList , setLocationList] = useState([])
  const [ownerShipList , setOwnerShipList] = useState([])
  const [operatorNameList , setOperatorNameList] = useState([])
  const [simNumberChecked , setSimNumberChecked] = useState([])
  // new Modals 

  useEffect(()=>{
    console.log(simNumberChecked)
  },[simNumberChecked])

  const [isLoading, setIsLoading] = useState(false)

  const [dataAttacked, setDataAttacked] = useState([])
  const [nameOfAttackingGroup, setNameOfAttackingGroup] = useState('')

  const [proper, setProper] = useState('')
  const [properSelectBox, setProperSelectBox] = useState([])

  const [currentpage, setCurrentPage] = useState(1)
  const [messageCurrentPage, setMessageCurrentPage] = useState(1)

  const handleSetGroup = async () => {
    if (!messageChecked.length > 0 || !newGroup.length > 0) {
      return null
    }
    setNewGroup('')
    const res = await axios.post('http://localhost:5000/v1/messagegroup', { name: newGroup, messages: messageChecked })
    props.setGroup([res.data.messageGroup, ...props.group])
    props.onClose(false)
  }

  const handleSetAttackingGroup = async () => {

    if (!nameOfAttackingGroup.length > 0  , !simNumberChecked.length > 0) {
      return null
    }
    const res = await axios.post('http://localhost:5000/v1/attacking', { name: nameOfAttackingGroup })
    setNameOfAttackingGroup('')
    props.setListAttacking([res.data.attacking, ...props.listAttacking])
    props.onCloseAddGroupAttacking(false)

  }

  useEffect(() => {

    if (!isOpen) {
      setNewGroup('')
    }

  }, [props.isOpen])

  // useEffect(() => {
  //   console.log('text' , props.newMessage)
  // }, [props.newMessage])

  const handleSetSelectMessage = () => {
    setDataSelectMessage([...dataSelectMessage, props.newMessage])
    setSelectMessage('')
  }
  const handleAcceptNewMessage = async () => {

    const res = await axios.post('http://localhost:5000/v1/addmessage', { content: props.newMessage })
    setAllMessages([...allMessage, ...res.data.messArray])
    props.setNewMessage('')

  }

  const handleSendMessage = async () => {
    setIsLoading(true)
    const res = await axios.patch('http://localhost:5000/v1/message', { allMessage })
    setIsLoading(false)
    setDataSelectMessage([])
    props.onCloseMessageSelect2(false)
  }

  useEffect(() => {
    const fetch = async () => {
      if (props.isOpenMessageSelect) {
        const res = await axios.get(`http://localhost:5000/v1/message?page=${currentpage}`)
        setAllMessages(res.data.messages)
      } if (props.isOpenMessageSelect2) {
        const res = await axios.get('http://localhost:5000/v1/proper')
        const res2 = await axios.get(`http://localhost:5000/v1/message?page=${currentpage}`)
        setProperSelectBox(res.data.proper)
        setAllMessages(res2.data.messages)
      } if (isOpenNumber) {
        const res = await axios.get(`http://localhost:5000/v1/simnumber?page=${currentpage}`)
        setDataOfSimNumber(res.data.simNumber)
      }if(isOpenAddNumber){
        const resLocation = await axios.get(`http://localhost:5000/v1/location`)
        const resOwnerShip = await axios.get(`http://localhost:5000/v1/ownership`)
        const resOperatorName = await axios.get(`http://localhost:5000/v1/operatorname`)
        setOwnerShipList(resOwnerShip.data.ownerShip)
        setLocationList(resLocation.data.location)
        setOperatorNameList(resOperatorName.data.operatorName)


      }
    }
    fetch()

  }, [props.isOpenMessageSelect, props.isOpenMessageSelect2, currentpage, messageCurrentPage, isOpenNumber , isOpenAddNumber])




  const handleAddMessage = () => {
    props.onCloseMessageSelect(false)
  }

  const handleProper = async () => {

    const res = await axios.post('http://localhost:5000/v1/proper', { proper })
    setProperSelectBox([...properSelectBox, res.data.resProper])
    setProper('')
    onClose(false)

  }

  const handleCurrentPage = (e) => {

    setCurrentPage(e)

  }
  const handleMessageCurrentPage = (e) => {
    setMessageCurrentPage(e)
  }

  const handleAddSimNumber = async() => {

    const res = await axios.post(`http://localhost:5000/v1/simnumber` , {operatorname:operatorName , ownership:ownerName ,loc:locationName , number})
  }

  const handleInfoAddSim = async () => {
    let searchKey = ''
    if (isOpenLocation) {
      searchKey = 'location'
    } if (isOpenOwner) {
      searchKey = 'ownership'
    } if (isOpenOperator) {
      searchKey = 'operatorname'
    }
    const res = await axios.post(`http://localhost:5000/v1/${searchKey}`, { name: opOwnLocName })
    setOpOwnLocName('')
    searchKey === 'location' ? setLocationList([res.data.location , ...locationList]) : searchKey === 'operatorname' ? setOperatorNameList([ res.data.operatorName , ...operatorNameList ]) : setOwnerShipList([res.data.ownerShip , ...ownerShipList])
  }

  useEffect(()=>{

    setOpOwnLocName('')

  },[isOpenOwner , isOpenLocation , isOpenOperator])

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size={'xl'}>
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(5px)'
        />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack direction={'column'}>
              <HStack justifyContent={'space-between'} mb={'30px'}>
                <Input mr={'5'} size={'md'} onChange={(v) => setNewGroup(v.target.value)} value={newGroup} />
                <label fontSize='xs' style={{ width: '150px', textAlign: 'right' }}>نام گروه پیامکی</label>
              </HStack>
              <HStack justifyContent={'space-between'} my={'30px'} w={'80%'}>
                <Button onClick={handleSetGroup} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ثبت</Button>
                <Button onClick={props.onOpenMessageSelect} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>انتخاب پیامک ها</Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onOpenGroupAttacking} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={props.onCloseMessageSelect} size={'full'} isOpen={props.isOpenMessageSelect}  >
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(5px)'
        />
        <ModalContent>
          <ModalHeader ><Center ></Center></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack justifyContent={'center'} >
              <Card width={'calc(100% - 80px)'}>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>انتخاب پیامک ها</Text>
                </CardHeader>
                <CardBody>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th fontSize='xs' boxSize={2}>ردیف</Th>
                          <Th fontSize='xs' w={'100%'}>پیامک</Th>
                          <Th fontSize='xs'>انتخاب</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          allMessage.map((item, index) => (
                            <Tr>
                              <Td>{((messageCurrentPage - 1) * 6) + index + 1}</Td>
                              <Td fontSize='xs'>{item?.content}</Td>
                              <Td><Checkbox isChecked={messageChecked.includes(item?._id)} onChange={(e) => {
                                if (e.target.checked) {
                                  setMessageChecked([
                                    ...messageChecked, item?._id
                                  ])
                                } else {
                                  setMessageChecked(
                                    messageChecked.filter((v) => item?._id !== v)
                                  )
                                }
                              }}></Checkbox></Td>
                            </Tr>
                          ))
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                </CardBody>
                <CardFooter>
                  <HStack justifyContent={'space-between'} w={'100%'}>
                    <ResponsivePagination
                      current={messageCurrentPage}
                      total={100}
                      onPageChange={handleMessageCurrentPage}
                      maxWidth={'100px'}
                    />
                    <Button mt={'2'} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} onClick={() => handleAddMessage()} >ثبت</Button>
                  </HStack>
                </CardFooter>
              </Card>
            </HStack>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal onClose={props.onCloseMessageSelect2} size={'full'} isOpen={props.isOpenMessageSelect2}  >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack justifyContent={'center'} mt={'50px'} >
              <Card width={'calc(100% - 80px)'}>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>انتخاب پیامک ها</Text>
                </CardHeader>
                <CardBody>
                  <HStack justifyContent={'right'}>
                    <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={handleAcceptNewMessage} />
                    <Input w={'container.sm'} value={props.newMessage} onChange={(e) => props.setNewMessage([e.target.value])} />
                  </HStack>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th><Text fontSize='xs' boxSize={2}>ردیف</Text></Th>
                          <Th fontSize='xs'>پیامک</Th>
                          <Th fontSize='xs'>مناسب جهت</Th>
                          <Th fontSize='xs'></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          allMessage?.map((item, index) => (
                            <Tr>
                              <Td>{((currentpage - 1) * 6) + index + 1}</Td>
                              <Td>{item.content}</Td>
                              <Td>
                                <Select onChange={(e) => {
                                  setAllMessages(allMessage.map((v) => (
                                    item._id === v._id ? { ...v, content: v.content, proper: e.target.value } : v
                                  )))
                                }}>
                                  {
                                    properSelectBox.map((item2, index) => (
                                      <option selected={item2._id === item.proper} value={item2._id}>{item2.proper}</option>
                                    ))
                                  }
                                </Select>
                              </Td>
                              <Td>
                                <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={onOpen} />
                              </Td>
                            </Tr>
                          ))
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                </CardBody>
                <CardFooter>
                  <HStack justifyContent={'space-between'} w={'100%'}>
                    <ResponsivePagination
                      current={currentpage}
                      total={100}
                      onPageChange={handleCurrentPage}
                      maxWidth={'100px'}
                    />
                    <Button isLoading={isLoading} mt={'2'} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} onClick={() => handleSendMessage()}>ثبت</Button>
                  </HStack>
                </CardFooter>
              </Card>
            </VStack>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(5px)'
        />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack direction={'column'}>
              <HStack justifyContent={'space-between'} >
                <Input mr={'5'} size={'md'} value={proper} onChange={(e) => setProper(e.target.value)} />
                <label fontSize='xs' style={{ width: '150px', textAlign: 'right ' }} >پیامک مناسب</label>
              </HStack>
              <HStack justifyContent={'space-between'} my={'30px'} w='100%'>
                <Button fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} onClick={() => handleProper()} >ثبت</Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {/* new Modals for attacked  */}

      <Modal isOpen={isOpenGroupAttacked} onClose={onCloseGroupAttacked} size={'xl'}>
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(5px)'
        />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack direction={'column'}>
              <HStack justifyContent={'space-between'} >
                <Input mr={'5'} size={'md'} onChange={(v) => setNewGroup(v.target.value)} value={newGroup} />
                <label fontSize='xs'>نام گروه عملیات شده</label>
              </HStack>
              <HStack justifyContent={'space-between'} my={'30px'}>
                <Button onClick={handleSetGroup} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ثبت</Button>
                <Button onClick={handleSetGroup} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>اسامی گروه عملیات شده</Button>
              </HStack>
            </VStack>
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
            <HStack justifyContent={'center'}>
              <Card width={'calc(100% - 80px)'}>
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
            </HStack>
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
            <VStack justifyContent={'center'}>
              <HStack float={'left'} width={'max'}>
                <Button mb={'5'} onClick={onOpenAddGroupAttacked} fontSize='xs' backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ایجاد گروه عملیات شده</Button>
              </HStack>
              <Card width={'calc(100% - 80px)'}>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>لیست گروه کاری عملیات شده</Text>
                </CardHeader>
                <CardBody>
                  <HStack justifyContent={'right'}>
                    <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={handleSetSelectMessage} />
                    <Input w={'container.sm'} value={selectMessage} onChange={(e) => setSelectMessage(e.target.value)} />
                  </HStack>
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
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseWorkGrouopAttacked} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>بستن</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal isOpen={isOpenAddGroupAttacked} onClose={onCloseAddGroupAttacked} size={'xl'}>
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(5px)'
        />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack direction={'column'}>
              <HStack justifyContent={'space-between'} >
                <Input mr={'5'} size={'md'} onChange={(v) => setNewGroup(v.target.value)} value={newGroup} />
                <label >نام گروه عملیات شده</label>
              </HStack>
              <HStack justifyContent={'space-between'} my={'30px'}>
                <Button onClick={handleSetGroup} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>ثبت</Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {/* new Modals for attacking  */}



      <Modal isOpen={props.isOpenAddGroupAttacking} onClose={props.onCloseAddGroupAttacking} size={'xl'}>
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(5px)'
        />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack direction={'column'}>
              <HStack justifyContent={'space-between'} mb={6}>
                <Input mr={'5'} size={'md'} onChange={(v) => setNameOfAttackingGroup(v.target.value)} value={nameOfAttackingGroup} />
                <label style={{ fontSize: '12px', width: '180px', textAlign: 'right' }}>نام گروه عملیات کننده</label>
              </HStack>
              <HStack justifyContent={'space-between'} my={'30px'} w={'85%'}>
                <Button onClick={handleSetAttackingGroup} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} fontSize={'sm'}>ثبت</Button>
                <Button onClick={onOpenNumber} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} fontSize={'sm'}>شماره سیم کارت گروه عملیات کننده</Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={onCloseNumber} size={'full'} isOpen={isOpenNumber}  >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack justifyContent={'center'} >
              <HStack float={'left'} width={'max'} w={'94%'}>
                <Button mb={'5'} onClick={onOpenAddNumber} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} rightIcon={<IoAdd fontSize='25px' />}>اضافه کردن سیم کارت</Button>
              </HStack>
              <Card width={'calc(100% - 80px)'}>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>لیست شماره سیم کارت ها</Text>
                </CardHeader>
                <CardBody>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th fontSize={'xs'} boxSize={2}>ردیف</Th>
                          <Th fontSize={'xs'} w={'100%'}>شماره سیم کارت</Th>
                          <Th fontSize={'xs'}>انتخاب</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          dataOfSimNumber.map((item, index) => (
                            <Tr>
                              <Td>{index + 1}</Td>
                              <Td>{item.number}</Td>
                              <Td>
                                <Checkbox onChange={(e)=>{
                                  if(e.target.checked){
                                      setSimNumberChecked([...simNumberChecked , item._id])
                                  }else {
                                      setSimNumberChecked(simNumberChecked.filter((v)=>v !== item._id))
                                  }
                                }}></Checkbox>
                              </Td>
                            </Tr>
                          ))
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Button mt={'2'} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} onClick={()=>onCloseNumber(false)}>ثبت</Button>
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
            <HStack justifyContent={'center'} >
              <Card width={'calc(100% - 80px)'}>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>گروه پیامکی</Text>
                </CardHeader>
                <CardBody>
                  <HStack justifyContent={'space-between'} mb={5}>
                    <Input mr={'5'} size={'md'} onChange={(v) => setNumber(v.target.value)} value={number} />
                    <label style={{ width: '100px', textAlign: 'right' }}>شماره</label>
                  </HStack>
                  <HStack justifyContent={'space-between'} mb={5}>
                    <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={onOpenOperator} />
                    <Select onChange={(e)=>setOperatorName(e.target.value)}>
                      {
                        operatorNameList.map((item , index)=>(
                          <option  value={item?._id}>{item?.name}</option>
                        ))
                      }
                    </Select>
                    <label style={{ width: 'calc(100px + 35px)', textAlign: 'right' }}>نام اپراتور</label>
                  </HStack>
                  <HStack justifyContent={'space-between'} mb={5}>
                    <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={onOpenOwner} />
                    <Select onChange={(e)=>setOwnerName(e.target.value)} >
                    {
                        ownerShipList.map((item , index)=>(
                          <option  value={item?._id}>{item?.name}</option>
                        ))
                      }
                    </Select>
                    <label style={{ width: 'calc(100px + 35px)', textAlign: 'right' }}>مالکیت</label>
                  </HStack >
                  <HStack justifyContent={'space-between'} mb={5}>
                    <IconButton icon={<SiAddthis />} color='gray.600' variant='soft' onClick={onOpenLocation} />
                    <Select onClick={(e)=>setLocationName(e.target.value)} >
                    {
                        locationList.map((item , index)=>(
                          <option  value={item?._id}>{item?.name}</option>
                        ))
                      }
                    </Select>
                    <label style={{ width: 'calc(100px + 35px)', textAlign: 'right' }}>محل فعالیت</label>
                  </HStack>
                  <Button mt={'2'} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} onClick={handleAddSimNumber}>ثبت</Button>
                </CardBody>
              </Card>
              <Card width={'calc(100% - 80px)'}>
                <CardHeader backgroundColor={'#4662b2'} color={'white'} textAlign={'center'} borderRadius={'5px'}>
                  <Text>گروه پیامکی</Text>
                </CardHeader>
                <CardBody>
                  <TableContainer sx={{ direction: 'rtl' }}>
                    <Table variant='simple' size='lg' >
                      <Thead>
                        <Tr>
                          <Th fontSize={'xs'} boxSize={2}>ردیف</Th>
                          <Th fontSize={'xs'} w={'100%'}>شماره سیم کارت</Th>
                          <Th fontSize={'xs'}>انتخاب</Th>
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
                  <Button mt={'2'} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} onClick={handleAddSimNumber}>ثبت</Button>
                </CardBody>
              </Card>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseAddNumber} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }}>بستن</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal isOpen={isOpenOperator} onClose={onCloseOperator} size={'xl'}>
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(5px)'
        />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack direction={'column'}>
              <HStack justifyContent={'space-between'} mb={6}>
                <Input mr={'5'} size={'md'} onChange={(v) => setOpOwnLocName(v.target.value)} value={opOwnLocName} />
                <label style={{ fontSize: '12px', width: '180px', textAlign: 'right' }}>اضافه کردن اپراتور</label>
              </HStack>
              <HStack justifyContent={'space-between'} my={'30px'} w={'85%'}>
                <Button onClick={handleInfoAddSim} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} fontSize={'sm'}>ثبت</Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenLocation} onClose={onCloseLocation} size={'xl'}>
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(5px)'
        />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack direction={'column'}>
              <HStack justifyContent={'space-between'} mb={6}>
                <Input mr={'5'} size={'md'} onChange={(v) => setOpOwnLocName(v.target.value)} value={opOwnLocName} />
                <label style={{ fontSize: '12px', width: '180px', textAlign: 'right' }}>اضافه کردن مکان</label>
              </HStack>
              <HStack justifyContent={'space-between'} my={'30px'} w={'85%'}>
                <Button onClick={handleInfoAddSim} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} fontSize={'sm'}>ثبت</Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenOwner} onClose={onCloseOwner} size={'xl'}>
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(5px)'
        />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack direction={'column'}>
              <HStack justifyContent={'space-between'} mb={6}>
                <Input mr={'5'} size={'md'} onChange={(v) => setOpOwnLocName(v.target.value)} value={opOwnLocName} />
                <label style={{ fontSize: '12px', width: '180px', textAlign: 'right' }}>اضافه کردن مالکیت</label>
              </HStack>
              <HStack justifyContent={'space-between'} my={'30px'} w={'85%'}>
                <Button onClick={handleInfoAddSim} backgroundColor={'#4662b2'} color={'white'} _hover={{ backgroundColor: '#556eb8' }} fontSize={'sm'}>ثبت</Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>



    </>
  )
}

export default Modals
