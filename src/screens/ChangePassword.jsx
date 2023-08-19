import {Formik} from 'formik';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/alert';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';
import http from '../helpers/http';

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Old password cannot be empty'),
  newPassword: Yup.string().required('New password cannot be empty'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Password must match')
    .required('Confirm password cannot be empty'),
});

const ChangePassword = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const doChangePassword = async values => {
    try {
      const form = new URLSearchParams();
      form.append('oldPassword', values.oldPassword);
      form.append('newPassword', values.newPassword);
      form.append('confirmPassword', values.confirmPassword);
      const {data} = await http(token).post(
        '/change-password',
        form.toString(),
      );
      // console.log(data);
      if (data?.message) {
        setSuccessMessage(data?.message);
        setTimeout(() => navigation.navigate('Profile'), 2000);
      }
      // console.log(form.toString());
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      if (errorMsg) {
        setErrorMessage(errorMsg);
      }
    }
  };

  if (successMessage) {
    setTimeout(() => setSuccessMessage(''), 3000);
  }
  if (errorMessage) {
    setTimeout(() => setErrorMessage(''), 3000);
  }

  const handlePressEvent = () => {
    navigation.navigate('Profile');
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
          <Text style={style.textHeader}>Change Password</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <View style={style.containerForm}>
        <View style={style.formWrapper}>
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doChangePassword}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={style.formInput}>
                {successMessage && (
                  <Alert variant="success">{successMessage}</Alert>
                )}
                {errorMessage && <Alert variant="error">{errorMessage}</Alert>}

                <View style={style.itemFormInput}>
                  <Text>Old Password</Text>
                  <View>
                    <Input
                      onChangeText={handleChange('oldPassword')}
                      onBlur={handleBlur('oldPassword')}
                      value={values.oldPassword}
                      placeholder="Enter your old password"
                      password
                    />
                    {errors.oldPassword && touched.oldPassword && (
                      <Text style={style.errorsText}>{errors.oldPassword}</Text>
                    )}
                  </View>
                </View>

                <View style={style.itemFormInput}>
                  <Text>New Password</Text>
                  <View>
                    <Input
                      onChangeText={handleChange('newPassword')}
                      onBlur={handleBlur('newPassword')}
                      value={values.newPassword}
                      placeholder="Re-Enter your new password"
                      password
                    />
                    {errors.newPassword && touched.newPassword && (
                      <Text style={style.errorsText}>{errors.newPassword}</Text>
                    )}
                  </View>
                </View>

                <View style={style.itemFormInput}>
                  <Text>Confirm Password</Text>
                  <View>
                    <Input
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      placeholder="Re-Enter your confirm password"
                      password
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text style={style.errorsText}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>
                </View>
                <View>
                  <Button
                    disabled={
                      !touched.oldPassword &&
                      !touched.newPassword &&
                      !touched.confirmPassword
                    }
                    onPress={handleSubmit}>
                    Update
                  </Button>
                </View>
              </View>
            )}
          </Formik>
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
  containerForm: {
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
  formWrapper: {
    marginTop: 20,
    gap: 30,
    marginBottom: 120,
  },
  photosContent: {
    width: 137,
    height: 137,
    borderWidth: 5,
    borderColor: '#4c3f91',
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
    gap: 25,
  },
  itemFormInput: {
    width: '100%',
    gap: 5,
  },
  btnContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
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
  errorsText: {
    color: '#FF9191',
  },
});

export default ChangePassword;
