import React from 'react'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Box, Icon, Flex, Menu, MenuButton, Link, Text, MenuList, HStack , VStack
} from '@chakra-ui/react'

import { FiHome, FiCalendar, FiUser, FiDollarSign, FiBriefcase, FiSettings } from 'react-icons/fi'
import NavHoverBox from './NavHoverBox'
import { FaBeer } from 'react-icons/fa';
import { IoNotificationsOutline , IoMenuOutline } from 'react-icons/io5'


const navItem = ({ navSize , title , icon ,description}) => {
  return (
    <>
      <HStack mt={6} pr={6} h={'50px'} w={'100%'} _hover={{background:'#eee'}} cursor={'pointer'}>
      <Box as="span" flex='1' textAlign='right' fontSize='.8125rem' fontWeight={'500'} color={'#4a5568'} mr={8} justifyContent={'right'}>
         صفحه اصلی
       </Box >
     <FaBeer fontSize={'20px'}/>
      </HStack>
      <HStack  pr={6} h={'50px'} w={'100%'} _hover={{background:'#eee'}} cursor={'pointer'}>
      <Box as="span" flex='1' textAlign='right' fontSize='.8125rem' fontWeight={'500'} color={'#4a5568'} mr={8} justifyContent={'right'}>
         گروه های عملیات کننده
       </Box >
     <FaBeer fontSize={'20px'}/>
      </HStack>
      <HStack  pr={6} h={'50px'} w={'100%'} _hover={{background:'#eee'}} cursor={'pointer'}>
      <Box as="span" flex='1' textAlign='right' fontSize='.8125rem' fontWeight={'500'} color={'#4a5568'} mr={8} justifyContent={'right'}>
         گروه های عملیات شده
       </Box >
     <FaBeer fontSize={'20px'}/>
      </HStack>
      <Accordion allowToggle width={'100%'} mt={2}> 
      <AccordionItem border={'none'} >
      <AccordionButton  >
          <Box as="span" flex='1' textAlign='right' fontSize='.8125rem' fontWeight={'500'} color={'#4a5568'} mr={8} >
            عنوان 1
          </Box >
        <IoNotificationsOutline fontSize={'20px'}/>
          
        </AccordionButton>
        <AccordionPanel pb={4} textAlign={'right'} >
          <VStack alignItems={'end'} pr={3}>
          <Link fontSize='xs'>عملیات</Link>
          <Link fontSize='xs'>عملیات 2</Link>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border={'none'} >
      <AccordionButton  >
          <Box as="span" flex='1' textAlign='right' fontSize='.8125rem' fontWeight={'500'} color={'#4a5568'} mr={8} >
            عنوان 1
          </Box >
        <IoNotificationsOutline fontSize={'20px'}/>
          
        </AccordionButton>
        <AccordionPanel pb={4} textAlign={'right'} >
          <VStack alignItems={'end'} pr={3}>
          <Link fontSize='xs'>عملیات</Link>
          <Link fontSize='xs'>عملیات 2</Link>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion></>
  )
}

export default navItem
