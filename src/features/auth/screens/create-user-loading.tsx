import {StyleSheet, Text, View} from 'react-native';
import commonStyles from '../../../styles/common';
import LoadingIcon from '../../../components/loading';

const CreateUserLoading = () => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          commonStyles.marginBottom32,
          commonStyles.textNormal,
          commonStyles.marginTop60,
          commonStyles.textCenter,
        ]}>
        Hang on! We’re creating
        <Text style={commonStyles.textHightLight}> your account</Text> ?
      </Text>
      <LoadingIcon />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    alignItems: 'center',
    flex: 1,
  },
});
export default CreateUserLoading;
