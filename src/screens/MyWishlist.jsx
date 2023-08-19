import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import http from '../helpers/http';
import EventList from '../components/EventList';

const MyWishlist = () => {
  const [wishlists, setWishlists] = React.useState([]);
  const token = useSelector(state => state.auth.token);

  const getWishlists = React.useCallback(async () => {
    const {data} = await http(token).get('/wishlists');
    setWishlists(data.results);
  }, [token]);

  React.useEffect(() => {
    getWishlists();
  }, [getWishlists]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const {data} = await http(token).get('/wishlists');
        setWishlists(data.results);
      };
      fetchData();
    }, [token]),
  );

  const addRemoveWishlist = async id => {
    try {
      const {data} = await http(token).delete(`/wishlists/${id}`);
      if (data.results) {
        console.log(data.results);
      }
      getWishlists();
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        console.log(message);
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.eventContain}>
        {wishlists.length < 1 && (
          <View style={styles.eventDetail}>
            <Text style={styles.eventTitle}>No wishlist found</Text>
            <Text style={styles.eventSubtitle}>
              It appears you haven’t found any wishlists yet. Maybe try
              searching these?
            </Text>
          </View>
        )}
        {wishlists.map(item => {
          return (
            <EventList
              key={`manage-wishlist-${item?.wishlistId}`}
              contentDate={item?.date}
              contentDay={item?.date}
              title={item?.title}
              location={item?.location}
              date={item?.date}
              day={item?.date}
              forWishlist
              addRemoveWishlist={() => addRemoveWishlist(`${item.wishlistId}`)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: 'white',
    gap: 20,
    paddingHorizontal: 30,
  },
  eventContain: {
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
  },
  eventDetail: {
    flexDirection: 'column',
    gap: 10,
  },
  eventTitle: {
    color: '#373A42',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: 2,
  },
  eventSubtitle: {
    color: '#373A42',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 27,
  },
});

export default MyWishlist;
