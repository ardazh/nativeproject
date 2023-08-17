import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import globalStyles from '../assets/css/globalStyles';
import Input from '../components/Input';
import Button from '../components/Button';
import {Link} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {asyncRegister} from '../redux/actions/auth';
import {clearMessage} from '../redux/reducers/auth';
import Alert from '../components/alert';
import SplashScreen from 'react-native-splash-screen';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name cannot be empty'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Password cannot be empty'),
  confirmPassword: Yup.string().required('Confirm password cannot be empty'),
});

const Regsiter = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const successMessage = useSelector(state => state.auth.successMessage);
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const doRegister = values => {
    dispatch(asyncRegister(values));
  };

  if (successMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
      navigation.replace('Login');
    }, 1500);
  }

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.heading}>
        <View>
          <Text style={globalStyles.title}>Sign Up</Text>
        </View>
        <View>
          <Text style={globalStyles.subTitle}>
            Already have an account?
            <Link style={globalStyles.link} to="/Login">
              Log In
            </Link>
          </Text>
        </View>
      </View>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doRegister}>
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <>
            <View style={styles.formGap}>
              {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
              <Input
                placeholder="Full Name"
                onBlur={handleBlur('fullName')}
                onChangeText={handleChange('fullName')}
                value={values.fullName}
              />
              {errors.email && touched.email && (
                <Text style={globalStyles.textError}>{errors.email}</Text>
              )}
              <Input
                placeholder="Email"
                keyboardType="email-address"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={globalStyles.textError}>{errors.email}</Text>
              )}
              <Input
                placeholder="Enter your password"
                secureTextEntry
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={globalStyles.textError}>{errors.password}</Text>
              )}
              <Input
                placeholder="Confirm your password"
                secureTextEntry
                onBlur={handleBlur('confirmPassword')}
                onChangeText={handleChange('confirmPassword')}
                value={values.confirmPassword}
              />
              {errors.password && touched.password && (
                <Text style={globalStyles.textError}>{errors.password}</Text>
              )}
              <View style={styles.formCheck}>
                <Icon name="square" size={20} color="grey" />
                <Text>Accept terms and condition</Text>
              </View>
            </View>
            <View>
              <Button
                disabled={!touched.email && !touched.password}
                onPress={handleSubmit}>
                Sign Up
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    gap: 50,
  },
  heading: {
    gap: 15,
  },
  formCheck: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 15,
  },
  formGap: {
    gap: 15,
  },
});

export default Regsiter;
