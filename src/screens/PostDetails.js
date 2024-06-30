import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ApiEndpoints from '../services/ApiEndpoints';
import ServiceRequest from '../services/ServiceRequest';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';

const PostDetails = props => {
  const id = props.route.params?.id;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    console.log('child screen mounted');
    fetchData();

    return () => {
      console.log('child screen unmounted');
    };
  }, [fetchData]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const url = ApiEndpoints.POST_URL;
    const response = await ServiceRequest.fetchData(url + id);
    // console.log(response);
    setLoading(false);
    setData(response);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.itemStyle}>
        <View style={styles.rowStyle}>
          <Text style={styles.textMedium}>userId:</Text>
          <Text style={styles.textRegular}>{data.userId}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textMedium}>id:</Text>
          <Text style={styles.textRegular}>{data.id}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textMedium}>title:</Text>
          <Text style={styles.textRegular}>{data.title}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textMedium}>body:</Text>
          <Text style={styles.textRegular}>{data.body}</Text>
        </View>
      </View>

      <Loader loading={loading} />
    </SafeAreaView>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  itemStyle: {
    backgroundColor: '#f8f8ff',
    marginHorizontal: 15,
    padding: 15,
    marginVertical: 20,
    borderRadius: 10,
    elevation: 4,
  },
  textMedium: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '500',
    width: '25%',
  },
  textRegular: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '400',
    width: '75%',
  },
});
