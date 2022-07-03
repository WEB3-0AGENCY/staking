import {
  Box,
  Center,
  Text,
  Stack,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import {useMoralis,useMoralisWeb3Api,useWeb3Contract} from 'react-moralis'

const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "previousAdmin",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "AdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "beacon",
        "type": "address"
      }
    ],
    "name": "BeaconUpgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "Upgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "tokenStaked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "tokenUnstaked",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "alreadyWithdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "erc20Contract",
    "outputs": [
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "initialTimestamp",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "_erc20_contract_address",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proxiableUUID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_paused",
        "type": "bool"
      }
    ],
    "name": "setPaused",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_timePeriodSeconds",
        "type": "uint256"
      }
    ],
    "name": "setTimestamp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "stakeTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "timePeriod",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "timestampSet",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20Upgradeable",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "unstakeTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      }
    ],
    "name": "upgradeTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "upgradeToAndCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]

export default function App() {
  const {Moralis,authenticate,isAuthenticated,isAuthenticating,isWeb3Enabled,isWeb3EnableLoading,user,logout,enableWeb3} = useMoralis()
  const Web3Api = useMoralisWeb3Api()
  const [trs,setTrs] = useState()
  const [amount,setAmount] = useState(0)
  const [params,setParams] = useState()
  const [totalStaked,setTotalStaked] = useState()
  
  const { runContractFunction, data, error,isLoading} = useWeb3Contract(params);
  const Stake = (amount)=>{
    setParams({
      abi: abi,
      contractAddress: "0xA519b71E531E3b9BdA27687d1fa0a79E5741e6D1",
      functionName: "stakeTokens",
      params:{
        token: "0xa1d331b5c70137facfe0148acbf90623ec8df9af",
        amount: Moralis.Units.Token(amount,18)
      }
    })
    runContractFunction()
  }
  const Unstake = (amount) => {
    if(amount <= totalStaked){
      setParams({
        abi: abi,
        contractAddress: "0xA519b71E531E3b9BdA27687d1fa0a79E5741e6D1",
        functionName: "unstakeTokens",
        params:{
          token: "0xa1d331b5c70137facfe0148acbf90623ec8df9af",
          amount: Moralis.Units.Token(amount,18)
        }
      })
      runContractFunction()
    }
  }
  const getTotalStake = (address)=>{
    setParams({
      abi: abi,
      contractAddress: "0xA519b71E531E3b9BdA27687d1fa0a79E5741e6D1",
      functionName: "balances",
      params: {
        account: address
      }
    })
    runContractFunction()
  }
  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
  useEffect(()=>{
    if(isAuthenticated && isWeb3Enabled){
      Web3Api.account.getTokenBalances({addess:user.get("ethAddress"),chain: "rinkeby"})
      .then((tokens)=> {
        setTrs(tokens.filter(token => token.token_address === "0xa1d331b5c70137facfe0148acbf90623ec8df9af"));
      })
    }
  },[isAuthenticated,user,enableWeb3,isWeb3Enabled])
  useEffect(()=>{
    if(isAuthenticated && isWeb3Enabled && !totalStaked){
      getTotalStake(user.get("ethAddress"))
    }
  },[isAuthenticated,isWeb3Enabled,totalStaked,user])
  useEffect(()=>{
    if(data?._hex){
      setTotalStaked(parseInt(data?._hex,16))
    }
  },[isAuthenticated,data,error])
  
  const tokenValue = (value, decimals) =>
      decimals ? value / Math.pow(10, decimals) : value;
  return (
    <Center py={6}>
      <Box
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}>
          <Text
            fontSize={'lg'}
            fontWeight={500}
            bg={useColorModeValue('green.50', 'green.900')}
            p={2}
            px={3}
            color={'green.500'}
            rounded={'full'}>
            Stake VRMC
          </Text>
          <Text fontSize={'2xl'} fontWeight={800}>
                Balance
          </Text>
          <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'6xl'} fontWeight={800}>
              {trs && isAuthenticated ? tokenValue(trs[0]?.balance,trs[0]?.decimals) : 0}
            </Text>
            <Text color={'gray.700'}>VRMC</Text>
          </Stack>
        </Stack>
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}>
          <Text fontSize={'2xl'} fontWeight={800}>
                Total Staked
          </Text>
          <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'6xl'} fontWeight={800}>
              {totalStaked && isAuthenticated ? tokenValue(totalStaked,18) : 0}
            </Text>
            <Text color={'gray.700'}>VRMC</Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <Input placeholder="0" type="number" max={trs ? trs[0]?.balance : 0} size="lg" value={amount} onChange={(e) => setAmount(e.target.value)} fontWeight={"bold"}/>

          {isAuthenticated ? (
            <>
            <Button
              mt={10}
              w={'full'}
              bg={'green.400'}
              color={'white'}
              rounded={'xl'}
              boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
              _hover={{
                bg: 'green.500',
              }}
              _focus={{
                bg: 'green.500',
              }}
              onClick={()=>{
                if(amount > 0){
                  Stake(amount)
                }
              }}>
              {isLoading ? "Loading..." : "Stake"}
            </Button>
            {totalStaked > 0 && (
              <Button
                mt={3}
                w={'full'}
                bg={'blue.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}
                onClick={()=>{
                  if(amount > 0){
                    Unstake(amount)
                  }
                }}>
                {isLoading ? "Loading..." : "Unstake"}
              </Button>
            )

            }
            <Button
              mt={3}
              w={'full'}
              bg={'red.400'}
              color={'white'}
              rounded={'xl'}
              boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
              _hover={{
                bg: 'red.500',
              }}
              _focus={{
                bg: 'red.500',
              }}
              onClick={async ()=>{
                await logout()
              }}
              >
              Logout
            </Button>
            </>
          ) : (
            <Button
              mt={10}
              w={'full'}
              bg={'blue.400'}
              color={'white'}
              rounded={'xl'}
              boxShadow={'0 5px 20px 0px rgb(0 128 255 / 43%)'}
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
                onClick={async ()=>{
                  await authenticate()
                }}
              >
              {isAuthenticating ? "Loading..." : "Connect Wallet"}
            </Button>
          )}
        </Box>
      </Box>
    </Center>
  );
}
