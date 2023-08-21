import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import globalStyles from '../assets/css/globalStyles';
import Input from '../components/Input';
import Button from '../components/Button';
import {Link} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {asyncLogin} from '../redux/actions/auth';
import Alert from '../components/alert';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Password cant be empty'),
});

const Login = () => {
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const doLogin = values => {
    dispatch(asyncLogin(values));
  };
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.heading}>
        <View>
          <Text style={globalStyles.title}>Log In</Text>
        </View>
        <View>
          <Text style={globalStyles.subTitle}>
            Hi, Welcome back to OnceTicket!
          </Text>
        </View>
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doLogin}>
        {({
          handleBlur,
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.formGap}>
              {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
              <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={globalStyles.textError}>{errors.email}</Text>
              )}
              <Input
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder="Enter your password"
                secureTextEntry
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={globalStyles.textError}>{errors.password}</Text>
              )}
              <View style={styles.alignRight}>
                <Link style={globalStyles.link} to="/ForgotPassword">
                  Forgot Password
                </Link>
              </View>
            </View>
            <View>
              <Button
                disabled={!touched.email && !touched.password}
                onPress={handleSubmit}>
                Log In
              </Button>
            </View>
          </>
        )}
      </Formik>
      <View style={styles.formAlternative}>
        <Text>or sign in with</Text>
        <View style={styles.formAlternativeIcons}>
          <View style={styles.borderAlternativeIcons}>
            <Icon size={35} name="google" color="grey" />
          </View>
          <View style={styles.borderAlternativeIcons}>
            <Icon size={35} name="facebook" color="blue" />
          </View>
          <View style={styles.borderAlternativeIcons}>
            <Icon size={35} name="fingerprint" color="orange" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    gap: 50,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  heading: {
    gap: 10,
  },
  formGap: {
    gap: 15,
  },
  formAlternative: {
    alignItems: 'center',
    gap: 15,
  },
  formAlternativeIcons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  borderAlternativeIcons: {
    width: 95,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E14D2A',
    borderRadius: 5,
  },
});

export default Login;
