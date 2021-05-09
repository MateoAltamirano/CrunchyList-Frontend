import {
  Flex,
  CircularProgress,
  Box,
  Heading,
  Text,
  useRadioGroup,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import Card from '../components/Card';
import { userContext } from '../providers/UserContext';
import '../styles/myLists.css';
import {
  CheckIcon,
  RepeatClockIcon,
  TimeIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons';
import RadioButton from '../components/RadioButton';
import { Status } from '../utils/types';
import { Redirect } from 'react-router-dom';
import AnimeList from '../components/AnimeList';

const MyLists = () => {
  const user = useContext(userContext);
  if (user === undefined)
    throw new Error('Please use within UserContextProvider');
  const radioOptions = [
    {
      icon: <CheckIcon boxSize="1.5rem" marginBottom="0.5rem" />,
      value: 'Vistos',
    },
    {
      icon: <ViewIcon boxSize="1.5rem" marginBottom="0.5rem" />,
      value: 'Estoy viendo',
    },
    {
      icon: <RepeatClockIcon boxSize="1.5rem" marginBottom="0.5rem" />,
      value: 'En espera',
    },
    {
      icon: <ViewOffIcon boxSize="1.5rem" marginBottom="0.5rem" />,
      value: 'Descartados',
    },
    {
      icon: <TimeIcon boxSize="1.5rem" marginBottom="0.5rem" />,
      value: 'Planeo ver',
    },
  ];
  const token = localStorage.getItem('token');
  const { status, seen, watching, waiting, discarted, toSee } = user.state;
  const [listAnimes, setListAnimes] = useState('Vistos');
  const onRadioChange = (value: string) => {
    setListAnimes(value);
  };
  const { getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'Vistos',
    onChange: onRadioChange,
  });

  return token ? (
    <Flex h="100%" flexDirection="column">
      <Box h="100%">
        <Box className="profile">
          <Heading size="2xl" color="white">
            Mis Listas
          </Heading>
          <Text fontSize="xl" color="white">
            ¿Cuánto anime has visto?
          </Text>
        </Box>
        <Flex
          position="absolute"
          top={'40%'}
          w={'100%'}
          padding="0 3rem"
          flexDirection="column"
        >
          <Card w={'100%'} marginBottom="60px">
            {status === Status.LOADING ? (
              <CircularProgress isIndeterminate color="secondary.main" />
            ) : (
              <Flex flexDirection="column" w={'100%'}>
                <Flex flexWrap="wrap" flexDirection="column" marginTop="1rem">
                  <Flex alignSelf="center" flexWrap="wrap">
                    {radioOptions.map((option) => {
                      const { value, icon } = option;
                      const radio = getRadioProps({ value });
                      return (
                        <RadioButton key={value} {...radio}>
                          <Flex flexDirection="column" alignItems="center">
                            {icon}
                            {value}
                          </Flex>
                        </RadioButton>
                      );
                    })}
                  </Flex>
                  {listAnimes === 'Vistos' ? (
                    <AnimeList list={seen} listName="seen" />
                  ) : undefined}
                  {listAnimes === 'Estoy viendo' ? (
                    <AnimeList list={watching} listName="watching" />
                  ) : undefined}
                  {listAnimes === 'En espera' ? (
                    <AnimeList list={waiting} listName="waiting" />
                  ) : undefined}
                  {listAnimes === 'Descartados' ? (
                    <AnimeList list={discarted} listName="discarted" />
                  ) : undefined}
                  {listAnimes === 'Planeo ver' ? (
                    <AnimeList list={toSee} listName="toSee" />
                  ) : undefined}
                </Flex>
              </Flex>
            )}
          </Card>
        </Flex>
      </Box>
    </Flex>
  ) : (
    <Redirect to={{ pathname: '/' }} />
  );
};
export default MyLists;
