import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import http from '../helpers/http';
import Feather from 'react-native-vector-icons/Feather';
import EventList from '../components/EventList';

const ManageEvent = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [event, setEvent] = React.useState([]);
  const [eventIds, setEventIds] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const getEventByUser = React.useCallback(async () => {
    const {data} = await http(token).get('/events/manage?limit=10');
    setEvent(data.results);
  }, [token]);

  React.useEffect(() => {
    getEventByUser();
  }, [getEventByUser]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const {data} = await http(token).get('/events/manage');
        setEvent(data.results);
      };
      fetchData();
    }, [token]),
  );

  const handleDeleteEvent = async id => {
    try {
      setModalVisible(false);
      const {data} = await http(token).delete(`/events/manage/${id}`);
      console.log(data);
      setEventIds(null);
      setEvent();
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        console.warn(message);
      }
    }
  };
  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };
  const handleUpdateEvent = id => {
    navigation.navigate('UpdateEvent', {id});
  };
  const handleDetailEvent = id => {
    navigation.navigate('DetailsEvent', {id});
  };
  const openModalDelete = eventId => {
    setEventIds(eventId);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <TouchableOpacity
        onPress={handleCreateEvent}
        style={styles.createContain}>
        <Feather name="plus-circle" size={30} />
        <Text style={styles.textCreate}>Create</Text>
      </TouchableOpacity>
      <View style={styles.eventContain}>
        {event.length < 1 && (
          <View style={styles.eventDetail}>
            <Text style={styles.eventTitle}>No tickets bought</Text>
            <Text style={styles.eventSubtitle}>
              It appears you haven’t bought any tickets yet. Maybe try searching
              these?
            </Text>
          </View>
        )}
        <View style={styles.gap20}>
          {event.map(item => {
            return (
              <EventList
                key={`manage-event-${item?.id}`}
                contentDate={item?.date}
                contentDay={item?.date}
                title={item?.title}
                location={item?.location}
                date={item?.date}
                day={item?.date}
                forManageEvent
                functionUpdate={() => handleUpdateEvent(item.id)}
                functionDetail={() => handleDetailEvent(item.id)}
                functionDelete={() => openModalDelete(item.id)}
              />
            );
          })}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Confirm Delete ?</Text>
            <View style={styles.wrapModalBtn}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleDeleteEvent(eventIds)}>
                <Text style={styles.textYes}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textNo}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: 'white',
    gap: 20,
    paddingHorizontal: 30,
  },
  createContain: {
    width: '40%',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fa7252',
    borderRadius: 15,
    marginTop: 20,
  },
  textCreate: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1,
  },
  eventContain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 20,
  },
  eventDetail: {
    width: '90%',
    flexDirection: 'column',
    gap: 10,
  },
  eventTitle: {
    color: '#373A42',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 36,
    letterSpacing: 1,
  },
  eventSubtitle: {
    color: '#B3B8B8',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  gap20: {
    gap: 20,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  wrapModalBtn: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 70,
  },
  buttonOpen: {
    backgroundColor: '#b6e5a8',
  },
  buttonClose: {
    backgroundColor: '#ffdcb3',
  },
  textYes: {
    color: '#FF8900',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  textNo: {
    color: '#49be25',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});

export default ManageEvent;
