import React from 'react'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Box, Icon, Flex, Menu, MenuButton, Text, MenuList, HStack , VStack
} from '@chakra-ui/react'

import { FiHome, FiCalendar, FiUser, FiDollarSign, FiBriefcase, FiSettings } from 'react-icons/fi'
import NavHoverBox from './NavHoverBox'
import { FaBeer } from 'react-icons/fa';
import { IoNotificationsOutline , IoMenuOutline } from 'react-icons/io5'

import Link from 'next/link';

const navItem = ({ navSize , title , icon ,description}) => {
  return (
    <>
    <Link href={'/'} style={{width:'100%'}}>
      <HStack mt={6} pr={6} h={'50px'} w={'100%'} _hover={{background:'#eee'}} cursor={'pointer'}>
      <Box as="span" flex='1' textAlign='right' fontSize='.8125rem' fontWeight={'500'} color={'#4a5568'} mr={8} justifyContent={'right'}>
       صفحه اصلی
       </Box >
     <FaBeer fontSize={'20px'}/>
      </HStack>
      </Link>
      <Link href={'/attacking'} style={{width:'100%'}}>
      <HStack  pr={6} h={'50px'} w={'100%'} _hover={{background:'#eee'}} cursor={'pointer'}>
      <Box as="span" flex='1' textAlign='right' fontSize='.8125rem' fontWeight={'500'} color={'#4a5568'} mr={8} justifyContent={'right'}>
         گروه های عملیات کننده
       </Box >
     <FaBeer fontSize={'20px'}/>
      </HStack></Link>
      <Link href={'/attacked'} style={{width:'100%'}}>
      <HStack  pr={6} h={'50px'} w={'100%'} _hover={{background:'#eee'}} cursor={'pointer'}>
      <Box as="span" flex='1' textAlign='right' fontSize='.8125rem' fontWeight={'500'} color={'#4a5568'} mr={8} justifyContent={'right'}>
         گروه های عملیات شده
       </Box >
     <FaBeer fontSize={'20px'}/>
      </HStack></Link>
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
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion></>
  )
}

export default navItem
