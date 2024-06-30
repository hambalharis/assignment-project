import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Button title="Increment" onPress={() => setCount(prev => prev + 1)} />
      <Text style={styles.text}>{count}</Text>
      <Button
        title="Decrement"
        onPress={() => {
          if (count > 0) {
            setCount(prev => prev - 1);
          }
        }}
      />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    color: '#333333',
    fontWeight: '900',
  },
});
