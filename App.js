import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import notifee, {EventType} from '@notifee/react-native';

const App = () => {
  // Subscribe to events
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      console.log('Foreground notification');
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  return (
    <>
      <AppNavigator />
      <Toast />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
