import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import moment from 'moment';
import DateBox from '../components/DateContent';
import FAwesome from 'react-native-vector-icons/FontAwesome';

const EventList = ({
  keyMaps,
  dateBoxDate,
  dateBoxDay,
  title,
  location,
  date,
  day,
  paymentMethod,
  addRemoveWishlist,
  forWishlist,
  forMyBooking,
  forManageEvent,
  transactionDetail,
  funcEventDetail,
  funcEventUpdate,
  funcEventDelete,
}) => {
  return (
    <View style={style.wishlistContainer} key={keyMaps}>
      <View style={style.sectionWishlistLeft}>
        <View>
          <DateBox dates={dateBoxDate} days={dateBoxDay} />
        </View>
        {forWishlist && (
          <View>
            <TouchableOpacity onPress={addRemoveWishlist}>
              <FAwesome name="heart" size={30} color="red" />
            </TouchableOpacity>
          </View>
        )}
        {forMyBooking &&
          (paymentMethod === 'Not Defined' ? (
            <View style={style.containerPending}>
              <Text style={style.pendingText}>Pending</Text>
            </View>
          ) : (
            <View style={style.containerPaid}>
              <Text style={style.paidText}>Success</Text>
            </View>
          ))}
      </View>
      <View style={style.sectionWishlistRight}>
        <View>
          <Text style={style.eventTitle}>
            {title?.length >= 16 ? title?.slice(0, 10) + '..' : title}
          </Text>
        </View>
        <View style={style.subSecWishlistRight}>
          <View>
            <View>
              <Text style={style.eventSubTitle}>{location}, Indonesia</Text>
            </View>
            <View>
              <Text style={style.eventSubTitle}>
                {moment(date).format('LLLL').slice(0, 3)}
                {', '}
                {moment(day).format('LLL')}
              </Text>
            </View>
          </View>
          {forMyBooking && (
            <View>
              <TouchableOpacity onPress={transactionDetail}>
                <Text style={style.textBtnDetail}>Detail</Text>
              </TouchableOpacity>
            </View>
          )}
          {forManageEvent && (
            <View style={style.btnGroupEvent}>
              <TouchableOpacity onPress={funcEventDetail}>
                <Text style={style.textBtnDetail}>Detail</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={funcEventUpdate}>
                <Text style={style.textBtnDetail}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={funcEventDelete}>
                <Text style={style.textBtnDetail}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerPaid: {
    backgroundColor: '#b6e5a8',
    padding: 5,
    borderRadius: 10,
  },
  paidText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#49be25',
  },
  containerPending: {
    backgroundColor: '#ffdcb3',
    padding: 5,
    borderRadius: 10,
  },
  pendingText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#FF8900',
  },
  container: {
    paddingTop: 30,
    backgroundColor: '#4c3f91',
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
  containerWishlist: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    gap: 35,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  wrapperWishlist: {
    marginTop: 20,
    gap: 30,
    marginBottom: 120,
  },
  wishlistContainer: {
    flexDirection: 'row',
    justifyContent: 'start',
    width: '100%',
    gap: 30,
  },

  sectionWishlistLeft: {
    gap: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionWishlistRight: {
    gap: 15,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subSecWishlistRight: {
    gap: 5,
  },
  textBtnDetail: {
    color: '#4c3f91',
    fontFamily: 'Poppins-Medium',
  },
  btnGroupEvent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  eventTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    textTransform: 'capitalize',
    color: 'black',
  },
  eventSubTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  noEventText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    textTransform: 'capitalize',
    color: 'black',
    textAlign: 'center',
  },
  noEventSubText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  noEventContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default EventList;

// <View
//   style={style.wishlistContainer}
//   key={`wishlist-manage-${item.wishlistId}`}>
//   <View style={style.sectionWishlistLeft}>
//     <View>
//       <DateBox dates={item?.date} days={item?.date} />
//     </View>
//     <View>
//       <TouchableOpacity
//         onPress={() => addRemoveWishlist(`${item.eventId}`)}>
//         <FAwesome name="heart" size={30} color="red" />
//       </TouchableOpacity>
//     </View>
//   </View>
//   <View style={style.sectionWishlistRight}>
//     <View>
//       <Text style={style.eventTitle}>{item.title}</Text>
//     </View>
//     <View>
//       <View>
//         <Text style={style.eventSubTitle}>
//           {item.location}, Indonesia
//         </Text>
//       </View>
//       <View>
//         <Text>
//           {moment(item?.date).format('LLLL').slice(0, 3)}
//           {', '}
//           {moment(item?.date).format('LLL')}
//         </Text>
//       </View>
//     </View>
//   </View>
// </View>
