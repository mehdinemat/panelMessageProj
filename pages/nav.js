import React , {useState , useRef} from 'react'
import {Avatar, Divider, Flex, Heading, IconButton, Text , Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,} from '@chakra-ui/react'
import {FiHome , FiCalendar , FiUser , FiDollarSign , FiBriefcase , FiSettings} from 'react-icons/fi'
import {BsJustify} from 'react-icons/bs'
import NavItem from '@/components/NavItem'
import Header from '@/components/Header'
import { useDisclosure } from '@chakra-ui/react'

const nav = ({children}) => {

  const [navSize , setNavSize] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <div>
      <Header btnRef={btnRef} setNavSize={setNavSize} navSize={navSize}/>
    <Flex
    float={'right'}
    pos="sticky"
    h='95vh'
    w={'256px' }
    flexDir='column'
    justifyContent='space-between'
    border={'1px'}
    borderColor={'#dfe1e5'}
    display={navSize ? 'flex' : 'none' }
    >
        <Flex
            flexDir="column"
            alignItems={'flex-end'}
            as='nav'
        >
            <NavItem navSize={navSize}/>
            {/* <NavItem navSize={navSize} title={'dashboard'} icon={FiHome} description/>
            <NavItem navSize={navSize} title={'Calendar'} icon={FiCalendar } description/>
            <NavItem navSize={navSize} title={'Client'} icon={ FiUser} description/>
            <NavItem navSize={navSize} title={'Reports'} icon={ FiDollarSign } description/>
            <NavItem navSize={navSize} title={'Stocks'} icon={FiBriefcase } description/>
            <NavItem navSize={navSize} title={'Settings'} icon={FiSettings} description/> */}
        </Flex>
        <Flex
            p="5%"
            flexDir='column'
            w='100%'
            alignItems={'center'}
            mb={4}
        >
            <Divider display={'flex'}/>
            <Flex mt={4} align="center" >
                <Flex flexDir='column' ml={4} display={navSize === 'small' ? 'none' : 'flex'}>
                    <Heading as={'h3'} size='sm'>باقر العلوم</Heading>
                    <Text>ادمین</Text>
                </Flex>
                <Avatar size={'sm'} ml={'10px'}/>
            </Flex>
        </Flex>

    </Flex>
    
      {children}
    </div>
  )
}

export default nav
