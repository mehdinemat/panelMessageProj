import React from 'react'
import { Flex, Heading , Icon , Text } from '@chakra-ui/react'
const NavHoverBox = ({icon , title , description}) => {
  return (
    <Flex
    h={200}
    w={200}
    flexDir='column'
    alignItems={'center'}
    justify={'center'}
    backgroundColor='#82AAAD'
    borderRadius='10px'
    color='#fff'
    textAlign='center'
>


<Icon as={icon} fontSize='3xl' mb={4}/>
<Heading size={'md'} fontWeight='normal' >{title}</Heading>
<Text>{description}</Text>
</Flex>
  )
}

export default NavHoverBox
