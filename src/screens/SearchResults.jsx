import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import React from 'react';
import http from '../helpers/http';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ImageTemplate from '../components/ImageTemplate';
import IMGEventDummy from '../assets/image/eventDefault.jpg';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import FAwesome from 'react-native-vector-icons/FontAwesome';

const SearchResults = ({route, navigation}) => {
  const searctQuery = route.params;
  const [seacrhItem, setSearchItem] = React.useState('');
  const [indicator, setIndicator] = React.useState(false);
  const [events, setEvent] = React.useState([]);
  const [sortEvent, setSortEvent] = React.useState('id');
  const [sortEventBy, setSortEventBy] = React.useState('DESC');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [limitData, setLimitData] = React.useState(5);
  const [isLoading, setIsLoading] = React.useState(false);
  const [newSearch, setNewSearch] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    setSearchItem(searctQuery);
  }, [searctQuery]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const {data} = await http().get(
          `/events?search=${seacrhItem}&page=${currentPage}&limit=${limitData}&sort=${sortEvent}&sortBy=${sortEventBy}`,
        );
        setEvent([...events, ...data.results]);
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, sortEvent, seacrhItem, sortEventBy]),
  );

  const renderItem = ({item}) => {
    return (
      <View style={style.itemWrapperStyle}>
        <View style={style.photosContent}>
          <View style={style.photoIcons}>
            <ImageTemplate
              src={item?.picture || null}
              defaultImg={IMGEventDummy}
              style={style.IMGProfiles}
            />
          </View>
        </View>
        <View style={style.contentWrapperStyle}>
          <TouchableOpacity onPress={() => handlePressEventDetail(item?.id)}>
            <Text style={style.txtNameStyle}>{`${item?.title} `}</Text>
          </TouchableOpacity>
          <Text style={style.txtEmailStyle}>
            Location : {`${item?.location} `}
          </Text>
          <Text style={style.txtEmailStyle}>
            Category : {`${item?.category} `}
          </Text>
          <Text style={style.txtEmailStyle}>
            Date : {moment(item?.date).format('LLLL').slice(0, 3)}
            {', '}
            {moment(item?.date).format('LLL')}
          </Text>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={style.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSortEvent = (sort, sortBy) => {
    setEvent([]);
    setCurrentPage(1);
    setModalVisible(false);
    setSortEvent(sort);
    setSortEventBy(sortBy);
  };

  const handleSearch = qSearch => {
    setEvent([]);
    setCurrentPage(1);
    setSearchItem(qSearch);
  };
  const openModalFilter = () => {
    setModalVisible(true);
  };

  const handlePressEvent = () => {
    navigation.navigate('Home');
    setEvent([]);
    setCurrentPage(1);
  };
  const handlePressEventDetail = id => {
    navigation.navigate('DetailEvent', {id});
    setEvent([]);
    setCurrentPage(1);
  };

  return (
    <View style={style.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={style.sectionHeader}>
        <View style={style.contentHeader}>
          <TouchableOpacity onPress={handlePressEvent}>
            <FeatherIcon name="arrow-left" size={35} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View>
          {indicator ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={style.textHeader}>Search Event</Text>
          )}
        </View>
        <View style={style.contentHeader} />
      </View>
      <View style={style.containerProfile}>
        <View style={style.wrapInputFilter}>
          <View style={style.inputSearch}>
            <TextInput
              style={style.textInput}
              placeholderTextColor="black"
              placeholder="Search Event..."
              onChangeText={event => setNewSearch(event)}
              onSubmitEditing={() => handleSearch(newSearch)}
            />
          </View>
          <View>
            <TouchableOpacity onPress={openModalFilter}>
              <FAwesome name="sliders" size={35} color="#4c3f91" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.dataProfileWrapper}>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={item => `search-results-${item.id}`}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0}
          />
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Sort Event By :</Text>
            <Pressable onPress={() => handleSortEvent('date', 'ASC')}>
              <Text style={style.textStyleItem}>Latest Event</Text>
            </Pressable>
            <Pressable onPress={() => handleSortEvent('title', 'ASC')}>
              <Text style={style.textStyleItem}>Event Name (A/Z)</Text>
            </Pressable>
            <Pressable onPress={() => handleSortEvent('title', 'DESC')}>
              <Text style={style.textStyleItem}>Event Name (Z/A)</Text>
            </Pressable>
            <View style={style.wrapModalBtn}>
              <Pressable
                style={[style.button, style.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={style.textStyleNo}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  inputSearch: {
    width: '90%',
  },
  wrapInputFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  wrapModalBtn: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#b6e5a8',
  },
  buttonClose: {
    backgroundColor: '#ffdcb3',
  },
  textStyleItem: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    height: 30,
  },
  textStyleNo: {
    color: '#49be25',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    opacity: 0.8,
    color: 'black',
    borderColor: '#4c3f91',
    fontSize: 17,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    margin: 20,
  },
  photosContent: {
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  photoIcons: {
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  IMGProfiles: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  contentTextContent: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    width: 200,
  },
  contentTextTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    width: 110,
  },
  contentText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  contentWrap: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    gap: 10,
  },
  container: {
    paddingTop: 30,
    backgroundColor: '#E14D2A',
    flex: 1,
  },
  textHeader: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    color: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 50,
  },
  contentHeader: {
    flex: 1,
  },
  containerProfile: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    gap: 45,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 100,
  },
  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  dataProfileWrapper: {
    gap: 20,
    marginBottom: 120,
  },
  formInput: {
    width: '100%',
    gap: 15,
  },
  btnContainer: {
    bottom: 30,
    width: '100%',
  },
  touchButton: {
    backgroundColor: '#4c3f91',
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  textTouch: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    gap: 20,
  },
  itemImageStyle: {
    width: 100,
    height: 140,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'start',
  },
  txtNameStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
  },
  txtEmailStyle: {
    color: '#777',
    width: 220,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

export default SearchResults;
