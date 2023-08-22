import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import IMGProfile from '../assets/image/default.png';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helpers/http';
import ImageTemplate from '../components/ImageTemplate';
import Input from '../components/Input';
import SelectDropdown from 'react-native-select-dropdown';
import {Formik} from 'formik';
import {RadioButton} from 'react-native-paper';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {setProfileData} from '../redux/reducers/profileData';

const EditProfile = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [profile, setProfile] = React.useState({});
  const [profession, setProfession] = React.useState('');
  const [nationality, setNationality] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [editEmail, setEditEmail] = React.useState(false);
  const [editGender, setEditGender] = React.useState(false);
  const [editPhone, setEditPhone] = React.useState(false);
  const [genderM, setGenderM] = React.useState(false);
  const [genderF, setGenderF] = React.useState(false);
  const [fileResponse, setFileResponse] = React.useState([]);
  const [selectedPicture, setSelectedPicture] = React.useState('');
  const [indicator, setIndicator] = React.useState(false);
  const selectProfession = ['Programmer', 'Designer', 'Analyst'];
  const selectNationality = ['Indonesia', 'Malaysia'];

  React.useEffect(() => {
    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
    };
    getProfile();
  }, [token]);

  // const getImage = async source => {
  //   let results;
  //   if (!source) {
  //     results = await launchImageLibrary();
  //   } else {
  //     results = await launchCamera({
  //       quality: 0.5,
  //     });
  //   }
  //   const data = results.assets[0];
  //   console.log(data);
  //   if (data.uri) {
  //     setSelectedPicture({
  //       name: data.fileName,
  //       type: data.type,
  //       uri:
  //         Platform.OS === 'android'
  //           ? data.uri
  //           : data.uri.replace('file://', ''),
  //     });

  //     setFileResponse(data.uri);
  //   }
  // };

  const doEdit = async values => {
    setIndicator(true);
    const form = new FormData();

    Object.keys(values).forEach(key => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });

    const fileImage = {
      uri: fileResponse,
      type: 'image/jpeg',
      name: 'image' + '-' + Date.now() + '.jpg',
    };

    if (fileResponse.length > 1) {
      form.append('picture', fileImage);
    }

    if (profession) {
      form.append('profession', profession);
    }
    if (nationality) {
      form.append('nationality', nationality);
    }
    if (date) {
      form.append('birthDate', moment(date).format('YYYY-MM-DD'));
    }

    if (genderM === true) {
      form.append('gender', 1);
    }

    if (genderF === true) {
      form.append('gender', 2);
    }

    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
    };

    try {
      const {data} = await http(token).patch('/profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(data.results);
      dispatch(setProfileData(data.results));
    } catch (err) {
      console.warn(err);
    }

    setIndicator(false);
    setEditEmail(false);
    setEditPhone(false);
    setEditGender(false);
    getProfile();
    setFileResponse([]);
  };

  const handleCameraSelection = React.useCallback(async () => {
    try {
      const response = await launchCamera({
        presentationStyle: 'fullScreen',
      });

      setFileResponse(response.assets[0].uri);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleDocumentSelection = React.useCallback(async () => {
    try {
      const response = await launchImageLibrary({
        presentationStyle: 'fullScreen',
      });

      setFileResponse(response.assets[0].uri);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handlePressEvent = () => {
    navigation.navigate('Profile');
  };
  console.log(date);
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
            <Text style={style.textHeader}>Edit Profile</Text>
          )}
        </View>
        <View style={style.contentHeader} />
      </View>
      <Formik
        initialValues={{
          fullName: profile?.fullName,
          email: profile?.email,
          phoneNumber: profile?.phoneNumber,
          profession: profile?.profession,
          nationality: profile?.nationality,
          birthDate: profile?.birthDate,
        }}
        onSubmit={doEdit}>
        {({values, handleBlur, handleChange, handleSubmit}) => {
          return (
            <View style={style.containerProfile}>
              <View style={style.profileWrapper}>
                <View style={style.photosContent}>
                  <View style={style.photoIcons}>
                    {selectedPicture ? (
                      <Image
                        style={style.fotoProfile}
                        src={selectedPicture.uri}
                        width={90}
                        height={90}
                      />
                    ) : (
                      <ImageTemplate
                        src={profile?.picture || null}
                        defaultImg={IMGProfile}
                        style={style.IMGProfiles}
                      />
                    )}
                  </View>
                </View>
                <View style={style.textGap20}>
                  <TouchableOpacity
                    style={style.btnLoadImg}
                    onPress={handleDocumentSelection}>
                    <FeatherIcon name="file-plus" size={25} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.btnLoadImg}
                    onPress={handleCameraSelection}>
                    <FeatherIcon name="camera" size={25} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView>
                <View style={style.dataProfileWrapper}>
                  <View style={style.formInput}>
                    <Text>Name</Text>
                    <View>
                      <Input
                        placeholder={profile?.fullName}
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        value={values.fullName}
                      />
                    </View>
                  </View>
                  <View style={style.formInput}>
                    <Text>Email</Text>
                    <View>
                      <View style={style.textBetween}>
                        {!editEmail && <Text>{profile?.email}</Text>}
                        {!editEmail && (
                          <Text onPress={() => setEditEmail(true)}>Edit</Text>
                        )}
                      </View>
                      {editEmail && (
                        <Input
                          placeholder={profile?.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                        />
                      )}
                    </View>
                  </View>
                  <View style={style.formInput}>
                    <Text>Phone</Text>
                    <View>
                      <View style={style.textBetween}>
                        {!editPhone && (
                          <Text>
                            {profile?.phoneNumber ? profile?.phoneNumber : '-'}
                          </Text>
                        )}
                        {!editPhone && (
                          <Text onPress={() => setEditPhone(true)}>Edit</Text>
                        )}
                      </View>
                      {editPhone && (
                        <Input
                          placeholder={
                            profile?.phoneNumber
                              ? profile?.phoneNumber
                              : '089762XXX'
                          }
                          onChangeText={handleChange('phoneNumber')}
                          onBlur={handleBlur('phoneNumber')}
                          value={values.phoneNumber}
                        />
                      )}
                    </View>
                  </View>

                  <View style={style.formInput}>
                    <Text>Gender</Text>
                    {editGender && (
                      <View style={style.wrappGender}>
                        <View style={style.wrappRadio}>
                          <RadioButton
                            value="1"
                            status={genderM ? 'checked' : 'unchecked'}
                            onPress={function () {
                              setGenderM(!genderM);
                              setGenderF(false);
                            }}
                          />
                          <Text
                            onPress={function () {
                              setGenderM(!genderM);
                              setGenderF(false);
                            }}>
                            Male
                          </Text>
                        </View>
                        <View style={style.wrappRadio}>
                          <RadioButton
                            value="0"
                            status={genderF ? 'checked' : 'unchecked'}
                            onPress={function () {
                              setGenderF(!genderF);
                              setGenderM(false);
                            }}
                          />
                          <Text
                            onPress={function () {
                              setGenderF(!genderF);
                              setGenderM(false);
                            }}>
                            Female
                          </Text>
                        </View>
                      </View>
                    )}
                    {!editGender && (
                      <View style={style.textBetween}>
                        <View style={style.wrappRadio}>
                          <Text>
                            {profile?.gender === 1 ? 'Male' : 'Female'}
                          </Text>
                        </View>
                        <Text onPress={() => setEditGender(true)}>Edit</Text>
                      </View>
                    )}
                  </View>

                  <View style={style.formInput}>
                    <Text>Profession</Text>
                    <View>
                      <SelectDropdown
                        data={selectProfession}
                        defaultButtonText={
                          profile?.profession
                            ? profile?.profession
                            : 'Select profession'
                        }
                        dropdownStyle={style.drStyle}
                        buttonStyle={style.selectDropdowns}
                        buttonTextStyle={style.btStyle}
                        rowStyle={style.rwStyle}
                        rowTextStyle={style.rtStyle}
                        renderDropdownIcon={isOpened => {
                          return (
                            <FeatherIcon
                              name={isOpened ? 'chevron-up' : 'chevron-down'}
                              size={25}
                              color="#000"
                            />
                          );
                        }}
                        onSelect={selectedItem => {
                          setProfession(selectedItem);
                        }}
                        buttonTextAfterSelection={selectedItem => {
                          return selectedItem;
                        }}
                        rowTextForSelection={item => {
                          return item;
                        }}
                      />
                    </View>
                  </View>
                  <View style={style.formInput}>
                    <Text>Nationality</Text>
                    <View>
                      <SelectDropdown
                        data={selectNationality}
                        defaultButtonText={
                          profile?.nationality
                            ? profile?.nationality
                            : 'Select nationality'
                        }
                        dropdownStyle={style.drStyle}
                        buttonStyle={style.selectDropdowns}
                        buttonTextStyle={style.btStyle}
                        rowStyle={style.rwStyle}
                        rowTextStyle={style.rtStyle}
                        renderDropdownIcon={isOpened => {
                          return (
                            <FeatherIcon
                              name={isOpened ? 'chevron-up' : 'chevron-down'}
                              size={25}
                              color="#000"
                            />
                          );
                        }}
                        onSelect={selectedItem => {
                          setNationality(selectedItem);
                        }}
                        buttonTextAfterSelection={selectedItem => {
                          return selectedItem;
                        }}
                        rowTextForSelection={item => {
                          return item;
                        }}
                      />
                    </View>
                  </View>
                  <View style={style.formInput}>
                    <Text>Birthday Date</Text>
                    <View style={style.textBetween}>
                      <View style={style.BirthDateWrapper}>
                        <View style={style.DateWrapper}>
                          <Text>
                            {profile?.birthDate
                              ? moment(profile?.birthDate).format('DD/MM/YYYY')
                              : '-'}
                          </Text>
                        </View>
                      </View>
                      <DatePicker
                        modal
                        open={open}
                        mode="date"
                        date={date}
                        onConfirm={newDate => {
                          setOpen(false);
                          setDate(newDate);
                        }}
                        onCancel={() => {
                          setOpen(false);
                        }}
                      />
                      <View>
                        <Text
                          style={style.EditBtnStyle}
                          onPress={() => setOpen(true)}>
                          Edit
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={style.btnContainer}>
                  <TouchableOpacity
                    style={style.touchButton}
                    onPress={handleSubmit}>
                    <Text style={style.textTouch}>Save</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const style = StyleSheet.create({
  fotoProfile: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  btnLoadImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  DateWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  BirthDateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  wrappGender: {
    flexDirection: 'row',
    gap: 30,
  },
  wrappRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectDropdowns: {
    width: '100%',
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    fontFamily: 'Poppins-Medium',
  },
  drStyle: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btStyle: {
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  rwStyle: {
    backgroundColor: '#FFF',
    borderBottomColor: '#FFF',
  },
  rtStyle: {
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
  },
  textBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textGap20: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  container: {
    paddingTop: 30,
    backgroundColor: '#e14d2a',
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
  },
  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  dataProfileWrapper: {
    marginTop: 20,
    gap: 20,
    marginBottom: 120,
  },
  photosContent: {
    width: 137,
    height: 137,
    borderWidth: 5,
    borderColor: '#e14d2a',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  photoIcons: {
    width: 115,
    height: 115,
    backgroundColor: 'gray',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  IMGProfiles: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
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
    backgroundColor: '#e14d2a',
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
});
export default EditProfile;
