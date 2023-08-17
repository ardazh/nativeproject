import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 55,
    backgroundColor: '#FD841F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  btnDisabled: {
    backgroundColor: '#bebfc2',
  },
  btnDisabledText: {
    color: '#6b6c6e',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    color: '#373A42',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    color: '#373A42',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    height: 55,
    paddingHorizontal: 20,
    borderColor: '#C1C5D0',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputComponent: {
    flex: 1,
  },
  link: {
    color: '#E14D2A',
  },
  textError: {
    color: '#FF0000',
  },
});

export default globalStyles;
