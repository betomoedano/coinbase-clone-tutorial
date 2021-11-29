import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import Colors from '../constants/Colors';
import CBButton from '../components/CBButton';

import { WatchlistState } from '../store/reducers/watchlist';
import { TopmoversState } from '../store/reducers/topmovers';
import { NewsState } from '../store/reducers/news';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';


import * as watchlistActions from '../store/actions/watchlist';
import * as topmoversActions from '../store/actions/topmovers';
import * as newsActions from '../store/actions/news';


import Watchlist from '../components/Whatchlist'
import TopMoversList from '../components/TopMoversList';
import NewsList from '../components/NewsList';

interface RootState {
    watchlist: WatchlistState;
    topmovers: TopmoversState;
    news: NewsState;
}

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {

  const watchlistData = useSelector(
    (state: RootState) => state.watchlist.watchlistData
  )

  const topMoversData = useSelector(
    (state: RootState) => state.topmovers.topMoversData
  )

  const newsData = useSelector(
    (state: RootState) => state.news.newsData
  )
  
  console.log(newsData)
  const dispatch = useDispatch();

  const loadData = () => {
    try {
      dispatch(watchlistActions.fetchCoinData());
      dispatch(topmoversActions.fetchTopMoversData());
      dispatch(newsActions.fetchNewsData());
    }   catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const viewMoreHandler = () => {
    navigation.navigate('News');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={{alignItems: 'center'}}
      >
        <Image 
          style={styles.image} 
          source= {{uri: 'https://i.imgur.com/9EEaSaS.png'}}
        />
        <Text style={styles.title}>Welcome to Coinbase!</Text>
        <Text style={styles.subTitle}>Make your first investment today</Text>
        <CBButton title="Get Started" />
        <Watchlist coinData={watchlistData}/>
        <TopMoversList coinData={topMoversData}/>
        <NewsList isHomeScreen={true} newsData={newsData} viewMoreHandler={viewMoreHandler}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  image: {
    height: 250,
    width: 150,
    marginTop:40,
  },
  title: {
    fontSize: 21,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: .5,
  },
  subTitle: {
    fontSize: 17,
    marginBottom: 24,
    color: Colors.subtitle,
  }
});

export default Home;
