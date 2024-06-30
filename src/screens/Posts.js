import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Loader from '../components/Loader';
import ApiEndpoints from '../services/ApiEndpoints';
import ServiceRequest from '../services/ServiceRequest';
import Notifications from '../utils/Notifications';
import Counter from '../components/Counter';

const Posts = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(10);
  const [limit, setLimit] = useState(10);
  const [paginationLoading, setPaginationLoading] = useState(false);

  const fetchingNotif = {
    id: '1',
    title: 'Fetching Data',
    body: 'Fetching data from server',
  };
  const completedNotif = {
    id: '2',
    title: 'Fetching Data Completed',
    body: 'Fetching data from server completed',
  };

  useEffect(() => {
    console.log('mounted');
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log('first');
    setLoading(true);
    Notifications.onDisplayNotification(fetchingNotif);

    const res = await apiCall();

    setData(res);
    setLoading(false);
    Notifications.onDisplayNotification(completedNotif);
  };

  const apiCall = useCallback(async (currentPage = 1) => {
    // console.log('\n page ==>', currentPage);
    const url = ApiEndpoints.POST_URL;
    const response = await ServiceRequest.fetchData(
      url + `?_page=${currentPage}_limit=${limit}`,
    );
    // console.log(response);

    return response;
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  const fetchMoreData = async () => {
    console.log('second');
    if (lastPage > page) {
      setPaginationLoading(true);
      const nextPage = page + 1;
      setPage(nextPage);

      const res = await apiCall(nextPage);

      setData([...data, ...res]);
      setPaginationLoading(false);
    }
  };

  const renderItem = useCallback(({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => {
          navigation.navigate('PostDetails', {
            id: item.id,
          });
        }}>
        <View style={styles.rowStyle}>
          <Text style={styles.textMedium}>userId:</Text>
          <Text style={styles.textRegular}>{item.userId}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textMedium}>id:</Text>
          <Text style={styles.textRegular}>{item.id}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textMedium}>title:</Text>
          <Text numberOfLines={2} style={styles.textRegular}>
            {item.title}
          </Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textMedium}>body:</Text>
          <Text numberOfLines={2} style={styles.textRegular}>
            {item.body}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Counter />
      <FlatList
        contentContainerStyle={{paddingVertical: 10}}
        data={memoizedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={() => {
          !loading && !paginationLoading && fetchMoreData();
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          paginationLoading && !loading ? (
            <View
              style={{
                height: 50,
              }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : null
        }
      />
      <Loader loading={loading} />
    </SafeAreaView>
  );
};

export default Posts;

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  itemStyle: {
    backgroundColor: '#e6e6fa',
    marginHorizontal: 15,
    padding: 15,
    marginVertical: 10,
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
