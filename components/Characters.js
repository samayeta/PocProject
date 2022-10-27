import React, {useState, useEffect, memo} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  Keyboard,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EpisodeModal from './EpisodeModal';
import Card from './Card';

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBarUnclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBarClicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: '90%',
  },
  separator: {
    height: 0.5,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Characters = () => {
  const [filter, setFilter] = useState('');
  const [list, setList] = useState({
    info: {count: 0},
    results: [],
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [charDetails, setCharDetails] = useState({
    episodes: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const itemPerPage = 20;

  useEffect(() => {
    if (list.results.length < page * itemPerPage && !refreshing) {
      page === 1 ? setLoading(true) : setMoreLoading(true);
      requestApi(page);
    }
  }, [page]);

  const requestApi = async curPage => {
    await fetch(`https://rickandmortyapi.com/api/character?page=${curPage}`)
      .then(response => response.json())
      .then(data => {
        setList({
          info: {...data.info},
          results:
            curPage === 1
              ? [...data.results]
              : list.results.concat(data.results),
        });
        setLoading(false);
        setMoreLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const fetchData = () => {
    if (page < list.info.pages && !loading && !moreLoading) {
      setPage(page + 1);
    }
  };

  const onChangeValue = val => {
    !clicked && setClicked(true);
    setFilter(val);

    if (val) {
      fetch(`https://rickandmortyapi.com/api/character/?name=${val}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setList({
              info: {count: 0},
              results: [],
            });
          } else {
            setList({
              info: {...data.info},
              results: [...data.results],
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  const refreshPage = () => {
    if (!refreshing) {
      setPage(1);
      setRefreshing(true);
      setFilter('');
      requestApi(1);
    }
  };

  const displayDetsils = item => {
    const allChar = item.episode.map(data => {
      const arr = data.split('/');
      return arr[arr.length - 1];
    });
    let req = allChar.join(',');
    fetch(`https://rickandmortyapi.com/api/episode/${req}`)
      .then(response => response.json())
      .then(data => {
        if (data instanceof Array) {
          setCharDetails({
            ...item,
            episodes: data,
          });
        } else {
          setCharDetails({
            ...item,
            episodes: [data],
          });
        }
        setOpenModal(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setCharDetails({episodes: []});
    setOpenModal(false);
  };

  const renderHeader = () => (
    <Text style={styles.title}>
      {list.info.count ? `Total characters: ${list.info.count}` : null}
    </Text>
  );

  const renderFooter = () => (
    <View style={styles.footerText}>
      {moreLoading && <ActivityIndicator size="small" />}
      {list.info.pages === page && <Text>No more character at the moment</Text>}
    </View>
  );

  const renderEmpty = () => {
    return (
      !refreshing && (
        <View style={styles.emptyText}>
          <Text>No character found</Text>
          <Button
            onPress={() => requestApi(1)}
            color="#f194ff"
            title="Refresh"
          />
        </View>
      )
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={clicked ? styles.searchBarClicked : styles.searchBarUnclicked}>
          <Icon name="search" size={14} color="black" style={{marginLeft: 1}} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeValue}
            value={filter}
            placeholder={'Search Character by name'}
          />
          {clicked && (
            <Icon
              name="close"
              size={14}
              color="black"
              style={{padding: 1}}
              onPress={() => {
                setFilter('');
              }}
            />
          )}
        </View>
        {clicked && (
          <View>
            <Button
              title="Cancel"
              onPress={() => {
                Keyboard.dismiss();
                setClicked(false);
              }}
            />
          </View>
        )}
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        // <VirtualizedList
        //   data={list.results}
        //   keyExtractor={(item, index) => index}
        //   getItemCount={() => (list.info.count ? list.info.count : 0)}
        //   renderItem={item => <Card data={item} getEpisodes={getEpisodes} />}
        //   onEndReachedThreshold={0.5}
        //   onEndReached={fetchData}
        //   getItem={(data, index) => {
        //     const item = {...data[index]};
        //     if (item && item.episode) {
        //       return {...item};
        //     }
        //   }}
        //   ListEmptyComponent={renderEmpty}
        //   onRefresh={refreshPage}
        //   refreshing={refreshing}
        //   ListFooterComponent={renderFooter}
        //   ListHeaderComponent={renderHeader}
        //   />
        <FlatList
          data={list.results}
          keyExtractor={(item, index) => index}
          renderItem={item => (
            <Card data={item} displayDetsils={displayDetsils} />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={fetchData}
          ListEmptyComponent={renderEmpty}
          onRefresh={refreshPage}
          refreshing={refreshing}
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderHeader}
        />
      )}
      <EpisodeModal
        open={openModal}
        data={charDetails}
        closeModal={closeModal}
      />
    </SafeAreaView>
  );
};
export default memo(Characters);
