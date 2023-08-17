import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import http from '../helpers/http';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {setEventData} from '../redux/reducers/eventData';
import {setProfileData} from '../redux/reducers/profileData';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import ImageTemplate from '../components/ImageTemplate';
import IMGEventDef from '../assets/image/eventDefault.jpg';
import EventDate from '../components/EventDate';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const deviceToken = useSelector(state => state.deviceToken.data);
  const token = useSelector(state => state.auth.token);
  const [search, setSearch] = React.useState('');
  const events = useSelector(state => state.eventData.eventData);
  const [categories, setCategories] = React.useState([]);

  const saveToken = React.useCallback(async () => {
    const form = new URLSearchParams({token: deviceToken.token});
    await http(token).post('/device-token', form.toString());
  }, [deviceToken, token]);

  React.useEffect(() => {
    saveToken();
  }, [saveToken]);

  const handleSearch = () => {
    navigation.navigate('SearchResults', search);
  };

  const getCategory = React.useCallback(async () => {
    const {data} = await http().get('/category');
    setCategories(data.results);
  }, []);

  const getProfile = React.useCallback(async () => {
    const {data} = await http(token).get('/profile');
    dispatch(setProfileData(data.results));
  }, [token, dispatch]);

  const getEvents = React.useCallback(async () => {
    const {data} = await http().get('/events');
    dispatch(setEventData(data.results));
  }, [dispatch]);

  React.useEffect(() => {
    getProfile();
    getEvents();
    getCategory();
  }, [getProfile, getEvents, getCategory]);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handlePressEvent = id => {
    navigation.navigate('DetailEvent', {id});
  };

  const uniqueDates = [...new Set(events?.map(item => item?.date))];

  return (
    <View style={style.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View>
        <View style={style.drawerContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <FeatherIcon name="menu" size={35} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <FeatherIcon name="message-square" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={style.textInput}
          placeholderTextColor="white"
          placeholder="Search Event..."
          onChangeText={event => setSearch(event)}
          onSubmitEditing={() => handleSearch(search)}
        />
      </View>
      <ScrollView style={style.contsiner} horizontal={false}>
        <View>
          <Text style={style.containerText}>Events For You</Text>
        </View>
        <ScrollView horizontal={true} style={style.wrapperBox}>
          <ScrollView horizontal={true} style={style.wrapperBox}>
            {events &&
              events.map(item => {
                return (
                  <View style={style.containerTextNew} key={`${item?.id}-wow`}>
                    <ImageTemplate
                      src={item?.picture || null}
                      defaultImg={IMGEventDef}
                      style={style.eventImages}
                    />

                    <View style={style.wrapAllContent}>
                      <View style={style.warapperTextCont}>
                        <Text style={style.textNew}>
                          {moment(item?.date).format('LLLL').slice(0, 3)}
                          {', '}
                          {moment(item?.date).format('LLL')}
                        </Text>
                        <Text style={style.textContaninerNew}>
                          {item?.title.slice(0, 14) + ' ...'}
                        </Text>
                        <TouchableOpacity
                          style={style.button1}
                          onPress={() => handlePressEvent(item?.id)}>
                          <Icon name="arrow-right" size={30} color="#FFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </ScrollView>
        <View>
          <Text style={style.containerText}>Discover</Text>
        </View>
        <ScrollView style={style.wrapperBox} horizontal={true}>
          {categories.map(item => (
            <View key={`category-list-${item.id}`} style={style.wrapperBoxNew}>
              <TouchableOpacity style={style.wrapperBoxDiscover}>
                <View style={style.iconDiscover}>
                  <Text>{item?.name.slice(0, 1)}</Text>
                </View>
                <Text style={style.textDiscover}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={style.containerUpcoming}>
          <Text style={style.containerTextUpcoming}>Upcoming</Text>
          <Text>See all</Text>
        </View>
        <View style={style.monthTextCont}>
          <Text style={style.monthText}>SEP</Text>
        </View>
        {uniqueDates?.map(date => {
          const itemsByDate = events.filter(item => item?.date === date);
          const item = itemsByDate[0];
          return (
            <View key={`event-by-date-${item?.id}`} style={style.upcomingBox}>
              <EventDate dates={item?.date} days={item?.date} />
              <View style={style.contentUpcoming}>
                <View style={style.containerTextNew}>
                  <ImageTemplate
                    src={item?.picture || null}
                    defaultImg={IMGEventDef}
                    style={style.eventImages}
                  />

                  <View style={style.wrapAllContent}>
                    <View style={style.warapperTextCont}>
                      <Text style={style.textNew}>
                        {moment(item?.date).format('LLLL').slice(0, 3)}
                        {', '}
                        {moment(item?.date).format('LLL')}
                      </Text>
                      <Text style={style.textContaninerNew}>
                        {item?.title.slice(0, 14) + ' ...'}
                      </Text>
                      <TouchableOpacity
                        style={style.button1}
                        onPress={() => handlePressEvent(item?.id)}>
                        <Icon name="arrow-right" size={30} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={style.buttonUpcoming}>
                  <Text style={style.textButton}>
                    Show All {itemsByDate.length} Events
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  containerTextNew: {
    width: 260,
    height: 376,
    borderRadius: 40,
    marginLeft: 20,
    marginRight: 20,
    gap: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  wrapAllContent: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  dissolveContainer: {flex: 1},
  eventImages: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  textContaninerNew: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
  },
  textNew: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    width: 200,
  },
  warapperTextCont: {
    position: 'absolute',
    bottom: 50,
    left: 20,
  },

  button1: {
    backgroundColor: '#FF3D71',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  drawerContainer: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    backgroundColor: '#E14D2A',
    gap: 30,
    paddingTop: 30,
  },
  contsiner: {
    backgroundColor: 'white',
    border: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    gap: 10,
    marginBottom: 150,
  },
  textColor: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    opacity: 0.8,
    color: 'white',
    borderColor: 'white',
    fontSize: 17,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    margin: 20,
  },
  containerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    padding: 30,
  },

  wrapperBox: {
    flexDirection: 'row',
    gap: 10,
  },
  wrapperBoxNew: {
    margin: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginLeft: 30,
    width: 165,
    height: 66,
    borderRadius: 30,
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },

  textDiscover: {
    fontSize: 16,
    color: '#f0a695',
  },
  iconDiscover: {
    width: 45,
    height: 45,
    backgroundColor: '#f0a695',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperBoxDiscover: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTextUpcoming: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  containerUpcoming: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcomingBox: {
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  upcomingTextCont: {
    width: 60,
    height: 85,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3D72',
  },
  monthTextCont: {
    paddingHorizontal: 40,
  },
  textContDay: {
    alignItems: 'center',
  },
  textDay: {
    color: '#FF8900',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonUpcoming: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E14D2A',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 50,
    width: '80%',
    height: 50,
    borderTopColor: '#FF8900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FD841F',
    fontWeight: 'bold',
  },
  contentUpcoming: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  button: {
    padding: 10,
  },
});

export default Home;
