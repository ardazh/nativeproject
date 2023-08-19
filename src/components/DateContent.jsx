import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import moment from 'moment';

const DateBox = ({dates, days}) => {
  return (
    <View style={style.upcomingTextCont}>
      <View style={style.textContDay}>
        <Text style={style.textDay}>{moment(dates).format('DD')}</Text>
        <Text>{moment(days).format('LLLL').slice(0, 3)}</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  upcomingTextCont: {
    width: 60,
    height: 75,
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
  textContDay: {
    alignItems: 'center',
  },
  textDay: {
    color: '#FF8900',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});

export default DateBox;
