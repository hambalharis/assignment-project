import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = ({loading = false}) => {
  return (
    <>
      {loading ? (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000026',
  },
});

export default Loader;
