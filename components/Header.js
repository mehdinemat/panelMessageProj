import React from 'react'
import { Button, HStack, Icon, Text, background } from '@chakra-ui/react'
import { BsDoorOpen } from 'react-icons/bs'
import { FaBeer } from 'react-icons/fa';
import { IoNotificationsOutline , IoMenuOutline , IoSettingsOutline } from 'react-icons/io5'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider
} from '@chakra-ui/react'

import {CiUser} from 'react-icons/ci'
import { RiLockPasswordLine } from 'react-icons/ri'

const Header = ({ btnRef, onOpen  , setNavSize , navSize}) => {
  return (
    <div style={{ width: '100%', height: '48px', boxShadow: '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)' ,paddingRight:'20px'}}>
      <HStack justifyContent={'space-between'} alignItems={'center'} h={'100%'}>
        <HStack ml={8}><BsDoorOpen fontSize={'24px'} /><IoNotificationsOutline fontSize={'24px'} />
          <Menu >
            <MenuButton as={Button} background={'none'} _active={{background:'none'}} _hover={{background:'none'}} >
              تنظیمات
            </MenuButton>
            <MenuList>
              <MenuItem justifyContent={'end'}>ادمین</MenuItem>
              <MenuDivider />
              <MenuItem justifyContent={'end'}><Text mr={'10px'}>حساب کاربری</Text><CiUser fontSize={'25px'}/></MenuItem>
              <MenuItem justifyContent={'end'}><Text mr={'10px'}>تنظیمات</Text><IoSettingsOutline fontSize={'25px'}/></MenuItem>
              <MenuItem justifyContent={'end'}><Text mr={'10px'}>تغییر رمز عبور</Text><RiLockPasswordLine fontSize={'25px'}/></MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <HStack ><IoMenuOutline fontSize={'24px'} style={{cursor:'pointer'}} onClick={()=>{
                setNavSize(!navSize)
        }}/></HStack>
      </HStack>
    </div>
  )
}

export default Header
