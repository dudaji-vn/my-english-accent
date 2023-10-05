import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  textNormal: {
    fontFamily: 'OpenSans',
    fontWeight: '500',
    fontSize: 32,
    lineHeight: 43.58,
    color: '#333333',
  },
  textHightLight: {
    fontFamily: 'OpenSans-Bold',
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 43.58,
    color: '#4080FF',
  },
  textNote: {
    color: '#333333',
    fontWeight: '300',
    fontSize: 16,
    fontStyle: 'italic',
    opacity: 0.6,
    textAlign: 'right',
  },
  paddingHorizontal20: {
    paddingHorizontal: 20,
  },
  paddingLeft20: {
    paddingLeft: 20,
  },
  paddingRight20: {
    paddingRight: 20,
  },
  marginRight4: {
    marginRight: 4,
  },
  marginHorizontal20: {
    marginHorizontal: 20,
  },
  marginBottom16: {
    marginBottom: 16,
  },
  marginBottom32: {
    marginBottom: 32,
  },
  marginBottom60: {
    marginBottom: 60,
  },
  marginBottom80: {
    marginBottom: 80,
  },
  marginBottom160: {
    marginBottom: 160,
  },
  marginTop60: {
    marginTop: 60,
  },
  marginTop160: {
    marginTop: 160,
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default commonStyles;
