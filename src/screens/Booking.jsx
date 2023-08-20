import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import IMGSection from '../assets/image/booking.png';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helpers/http';
import {setTransactionData} from '../redux/reducers/transaction';

const Booking = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const eventId = useSelector(state => state.eventId.eventId);
  const [sections, setSections] = React.useState([]);
  const [filledSection, setFilledSection] = React.useState({
    id: 0,
    quantity: 0,
  });

  React.useEffect(() => {
    const getSections = async () => {
      const {data} = await http(token).get('/section');
      setSections(data.results);
    };
    getSections();
  }, [token]);

  const increment = id => {
    if (filledSection.quantity >= 2) {
      setFilledSection({id, quantity: 2});
    } else {
      setFilledSection({id, quantity: filledSection.quantity + 1});
    }
  };
  const decrement = id => {
    if (filledSection.quantity <= 0) {
      setFilledSection({id, quantity: 0});
    } else {
      setFilledSection({id, quantity: filledSection.quantity - 1});
    }
  };

  const doReservation = async () => {
    const form = new URLSearchParams({
      eventId,
      sectionId: filledSection.id,
      quantity: filledSection.quantity,
    }).toString();
    const {data} = await http(token).post('/reservation', form);

    const dataBooking = {
      eventId,
      eventName: data.results.events.title,
      reservationId: data.results.id,
      sectionName: data.results.sectionName,
      quantity: data.results.quantity,
      totalPayment: data.results.totalPrice,
    };

    dispatch(setTransactionData(dataBooking));
    navigation.navigate('Payment');
    // dispatch(clearEventId());
  };

  React.useEffect(() => {
    if (eventId === null) {
      navigation.navigate('MyBooking');
    }
  }, [eventId, navigation]);

  const handlePressEvent = id => {
    navigation.navigate('DetailEvent', {id});
  };

  const selectedSection =
    filledSection && sections.filter(item => item.id === filledSection.id)[0];

  return (
    <View style={style.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={style.sectionHeader}>
        <View style={style.contentHeader}>
          <TouchableOpacity onPress={() => handlePressEvent(eventId)}>
            <FeatherIcon name="arrow-left" size={35} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={style.textHeader}>Checkout</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <View style={style.wrapper}>
        <View style={style.secTickContainer}>
          <Image source={IMGSection} style={style.imageSection} />
        </View>
        <View style={style.containerCheckout}>
          <View style={style.ticketHeader}>
            <View>
              <Text style={style.textTic}>Tickets</Text>
            </View>
            <View style={style.sortSectionTicket}>
              <View>
                <Text style={style.textTic2}>BY PRICE</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <FeatherIcon name="filter" size={30} color="#4c3f91" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView style={style.ticketVariant}>
            {sections.map(item => (
              <View key={`section-select-${item.id}`} style={style.contItem}>
                <View style={style.contIcon}>
                  <FAwesome name="ticket" size={25} color="#4c3f91" />
                </View>
                <View style={style.contSect}>
                  <View>
                    <Text style={style.sectionText}>SECTION {item.name}</Text>
                    <Text style={style.contSeat}>12 Seats available</Text>
                  </View>
                  <Text style={style.contQuty}>Quantity</Text>
                </View>
                <View style={style.contPriceOut}>
                  <View style={style.priceOut}>
                    <Text style={style.sectionText}>IDR {item.price}</Text>
                    <Text>per person</Text>
                  </View>
                  <View style={style.count}>
                    <TouchableOpacity
                      style={style.addOrRemoveQty}
                      onPress={() => decrement(item.id)}>
                      <Text style={style.iconInQty}>-</Text>
                    </TouchableOpacity>
                    <Text style={style.textCount}>
                      {item.id === filledSection.id
                        ? filledSection.quantity
                        : 0}
                    </Text>
                    <TouchableOpacity
                      style={style.addOrRemoveQty}
                      onPress={() => increment(item.id)}>
                      <Text style={style.iconInQty}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={style.sectionPayment}>
            <View>
              <View style={style.results}>
                <Text style={style.reslutsText}>
                  {selectedSection?.name || '-'}
                </Text>
                <Text>-</Text>
                <Text style={style.reslutsText}>{filledSection?.quantity}</Text>
                <Text>-</Text>
                <Text style={style.reslutsText}>
                  IDR {selectedSection?.price * filledSection?.quantity || '0'}
                </Text>
              </View>
              <View style={style.getOwnCont}>
                <Text style={style.getOwn}>Get now on Urticket</Text>
              </View>
            </View>
            <View>
              {filledSection.id === 0 || filledSection.quantity === 0 ? (
                <Text>Select Tickets</Text>
              ) : (
                <TouchableOpacity
                  onPress={doReservation}
                  style={style.touchCheckOut}>
                  <Text style={style.textCheckout}>Checkout</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#e14d2a',
    flex: 1,
  },
  wrapper: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
    position: 'relative',
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
  secTickContainer: {
    width: '100%',
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageSection: {
    width: '85%',
    height: '85%',
  },
  ticketVariant: {
    height: 90,
  },
  sectionPayment: {
    width: '100%',
    height: 55,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 10,
  },
  containerCheckout: {
    paddingVertical: 20,
    gap: 15,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  sortSectionTicket: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  iconInQty: {
    fontFamily: 'Poppins-Bold',
  },
  textTic: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  textTic2: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
  },
  contItem: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  contIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#F1EAFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  contSect: {
    gap: 10,
  },
  contSeat: {
    opacity: 0.7,
  },
  contQuty: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  contPriceOut: {
    // justifyContent: 'center',
    // alignItems: 'center',
    gap: 10,
  },
  priceOut: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  count: {
    flexDirection: 'row',
    gap: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addOrRemoveQty: {
    width: 33,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  checkOut: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    gap: 25,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 7,
    marginBottom: 50,
  },
  results: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reslutsText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  touchCheckOut: {
    backgroundColor: '#e14d2a',
    width: 118,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCheckout: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  getOwn: {
    fontSize: 12,
  },
  getOwnCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Booking;
