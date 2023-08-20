import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Regsiter from './Regsiter';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

import Home from './Home';
import Profile from './Profile';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import DetailEvent from './DetailEvent';
import SearchResults from './SearchResults';
import {logout} from '../redux/reducers/auth';

import {useSelector, useDispatch} from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ImageTemplate from '../components/ImageTemplate';
import IMGProfile from '../assets/image/default.png';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MyBooking from './MyBooking';
import MyWishlist from './MyWishlist';
import ManageEvent from './ManageEvent';
import CreateEvent from './CreateEvent';
import UpdateEvent from './UpdateEvent';
import DetailsEvent from './DetailsEvent';
import Booking from './Booking';

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profileData.profileData);

  return (
    <DrawerContentScrollView {...props}>
      <View style={style.containerProfile}>
        <View style={style.foto}>
          <View style={style.fotoIcon}>
            <ImageTemplate
              src={profile?.picture || null}
              defaultImg={IMGProfile}
              style={style.IMGProfiles}
            />
          </View>
        </View>
        <View>
          <Text style={style.textFullname}>
            {profile?.fullName?.length < 14 && profile?.fullName}
            {profile?.fullName?.length >= 14 &&
              profile?.fullName?.slice(0, 14) + ' ...'}
          </Text>
          <Text style={style.textProfession}>
            {profile?.profession ? profile?.profession : 'profession: -'}
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => dispatch(logout())}
        icon={({focused, color, size}) => (
          <FeatherIcon name="log-out" color={color} size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
}

const style = StyleSheet.create({
  containerProfile: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  foto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#4c3f91',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  fotoIcon: {
    width: 55,
    height: 55,
    backgroundColor: 'gray',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  IMGProfiles: {
    objectFit: 'cover',
    width: 60,
    height: 60,
  },
  textFullname: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
    color: 'black',
    width: 240,
  },
  textProfession: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
    color: 'grey',
  },
});

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#eaeaea',
          width: 340,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({color, size}) => (
            <FontAwesome5Icon name="home" color={color} size={size} />
          ),
          drawerLabel: 'Home',
        }}
      />

      <Drawer.Screen
        name="ManageEvent"
        component={ManageEvent}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="plus-circle" color={color} size={size} />
          ),
          drawerLabel: 'Manage Event',
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="user" color={color} size={size} />
          ),
          drawerLabel: 'Profile',
        }}
      />

      <Drawer.Screen
        name="MyBooking"
        component={MyBooking}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="clipboard" color={color} size={size} />
          ),
          drawerLabel: 'My Booking',
        }}
      />

      <Drawer.Screen
        name="MyWishlist"
        component={MyWishlist}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="heart" color={color} size={size} />
          ),
          drawerLabel: 'My Wishlist',
        }}
      />

      <Drawer.Screen
        name="SearchResults"
        component={SearchResults}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />

      <Drawer.Screen
        name="DetailEvent"
        component={DetailEvent}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />

      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />

      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />

      <Drawer.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />

      <Drawer.Screen
        name="UpdateEvent"
        component={UpdateEvent}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />

      <Drawer.Screen
        name="DetailsEvent"
        component={DetailsEvent}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />

      <Drawer.Screen
        name="Booking"
        component={Booking}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />
    </Drawer.Navigator>
  );
}

const Main = () => {
  const token = useSelector(state => state.auth.token);
  return (
    <NavigationContainer>
      {!token && (
        <AuthStack.Navigator
          screenOptions={{headerShadowVisible: false, headerTitle: ''}}>
          <AuthStack.Screen name="Register" component={Regsiter} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
          <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
        </AuthStack.Navigator>
      )}
      {/* {token && (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
      )} */}
      {token && (
        <>
          <MyDrawer />
        </>
      )}
    </NavigationContainer>
  );
};

export default Main;
