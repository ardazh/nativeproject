import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FAwesome from 'react-native-vector-icons/FontAwesome';
import EndIcon from 'react-native-vector-icons/Entypo';
import IMGCard from '../assets/image/cardDummy.png';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helpers/http';
import {clearTransactionData} from '../redux/reducers/transaction';

const Payment = ({navigation}) => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const bookingData = useSelector(state => state.transaction.transactionData);
  const [paymentMethod, setPaymentMethod] = React.useState('1');

  const handlePaymentMethodChange = value => {
    setPaymentMethod(value);
  };

  const doPayment = async () => {
    const {reservationId} = bookingData;
    const form = new URLSearchParams({
      reservationId,
      paymentMethodId: paymentMethod,
    }).toString();
    const {data} = await http(token).post('/payment', form);
    if (data) {
      navigation.navigate('MyBooking');
      dispatch(clearTransactionData());
    }
  };
  return (
    <View style={style.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={style.sectionHeader}>
        <View style={style.contentHeader}>
          <TouchableOpacity>
            <FeatherIcon name="arrow-left" size={35} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={style.textHeader}>Payment</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <View style={style.containerOne}>
        <View style={style.contPrice}>
          <View style={style.contOut}>
            <View>
              <Text style={style.textPayment}>Payment method</Text>
            </View>
            <View style={style.contCard}>
              <View style={style.borderRadio}>
                <TouchableOpacity
                  style={[
                    style.radioButton,
                    paymentMethod === '1' && style.radioButtonSelected,
                  ]}
                  onPress={() => handlePaymentMethodChange('1')}
                />
              </View>
              <View style={style.iconCard}>
                <FAwesome name="credit-card-alt" size={20} color="#4c3f91" />
              </View>
              <View>
                <Text style={style.textIcon}>Card</Text>
              </View>
            </View>
          </View>
          <ScrollView horizontal={true}>
            <View style={style.CardCountain}>
              <View style={style.cardOutput}>
                <Image style={style.IMGCards} source={IMGCard} />
              </View>
              <TouchableOpacity style={style.plusCont}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={style.cardPayment}>
            <View style={style.contCard}>
              <View style={style.borderRadio}>
                <TouchableOpacity
                  style={[
                    style.radioButton,
                    paymentMethod === '2' && style.radioButtonSelected,
                  ]}
                  onPress={() => handlePaymentMethodChange('2')}
                />
              </View>
              <View style={style.iconCard2}>
                <FAwesome name="bank" size={20} color="#FC1055" />
              </View>
              <View>
                <Text style={style.textIcon}>Bank Transfer</Text>
              </View>
            </View>
            <View style={style.contCard}>
              <View style={style.borderRadio}>
                <TouchableOpacity
                  style={[
                    style.radioButton,
                    paymentMethod === '3' && style.radioButtonSelected,
                  ]}
                  onPress={() => handlePaymentMethodChange('3')}
                />
              </View>
              <View style={style.iconCard3}>
                <EndIcon name="shop" size={25} color="#FF8900" />
              </View>
              <View>
                <Text style={style.textIcon}>Retail</Text>
              </View>
            </View>
            <View style={style.contCard}>
              <View style={style.borderRadio}>
                <TouchableOpacity
                  style={[
                    style.radioButton,
                    paymentMethod === '4' && style.radioButtonSelected,
                  ]}
                  onPress={() => handlePaymentMethodChange('4')}
                />
              </View>
              <View style={style.iconCard4}>
                <FAwesome name="dollar" size={20} color="#3366FF" />
              </View>
              <View>
                <Text style={style.textIcon}>E-Money</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={style.checkOut}>
          <View>
            <View style={style.results}>
              <Text style={style.reslutsText}>Total Payment</Text>
            </View>
            <View style={style.getOwnCont}>
              <Text style={style.getOwn}>IDR {bookingData?.totalPayment}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={doPayment} style={style.touchCheckOut}>
            <Text style={style.textCheckout}>Payment</Text>
          </TouchableOpacity>
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
  containerOne: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    position: 'relative',
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
  textHeader: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    color: 'white',
  },
  CardCountain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusCont: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 20,
  },
  cardPayment: {
    gap: 30,
    marginBottom: 20,
  },
  borderRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'orange',
    padding: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e14d2a',
  },
  cardOutput: {
    width: 335,
    height: 203,
    backgroundColor: '#FFA000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  IMGCards: {
    width: '100%',
    height: '100%',
  },
  textPayment: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
  },
  contCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },
  iconCard: {
    backgroundColor: 'rgba(136, 77, 255, 0.2)',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCard2: {
    backgroundColor: 'rgba(252, 16, 85, 0.2)',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCard3: {
    backgroundColor: 'rgba(255, 137, 0, 0.2)',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCard4: {
    backgroundColor: 'rgba(51, 102, 255, 0.2)',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIcon: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
  },

  contPrice: {
    backgroundColor: 'white',
    paddingTop: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    gap: 30,
  },

  contOut: {
    paddingVertical: 10,
    gap: 15,
  },

  checkOut: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  results: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reslutsText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  touchCheckOut: {
    backgroundColor: '#e14d2a',
    width: 169,
    height: 55,
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
    fontSize: 20,
    color: '#e14d2a',
    fontFamily: 'Poppins-SemiBold',
  },
  getOwnCont: {
    justifyContent: 'flex-start',
  },
});

export default Payment;
