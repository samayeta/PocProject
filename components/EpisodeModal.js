import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  outsideModal: {
    backgroundColor: 'rgba(1, 1, 1, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    backgroundColor: 'white',
    marginTop: 30,
    marginHorizontal: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 20,
    marginHorizontal: 20,
    height: 500,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  characterDetailsContainer: {
    flexDirection: 'row',
    minHeight: 150,
    paddingBottom: 20,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },

  titleContainer: {
    flexDirection: 'column',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    maxWidth: 180,
  },
  characterDetailsText: {
    flexDirection: 'row',
    justifyItems: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    width: 150,
    maxWidth: '100%',
  },
  alive: {
    color: 'green',
  },
  dead: {
    color: 'red',
  },
  unknonwn: {
    color: 'grey',
  },

  episodesConHeading: {
    minWidth: '100%',
    marginTop: 20,
  },
  scrollContainer: {
    marginTop: 20,
    width: '100%',
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  modalHeadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  episode: {
    marginBottom: 10,
    minHeight: 50,
    flexDirection: 'row',
    borderColor: 'lightgrey',
    borderRadius: 5,
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  episodeName: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  episodeDetailCon: {
    borderLeftColor: 'lightgrey',
    borderLeftWidth: 1,
    paddingLeft: 10,
    width: '78%',
  },
  episodeDetail: {
    fontSize: 14,
    lineHeight: 24,
  },
  episodeDetail_date: {
    fontSize: 12,
    lineHeight: 20,
  },
});

const EpisodeModal = ({open, data, closeModal}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const {image, gender, name, origin, status, species, episodes} = data;

  useEffect(() => {
    setModalVisible(open);
  }, [open]);

  const getList = episodes.map(item => (
    <View style={styles.episode} key={item.episode}>
      <Text style={styles.episodeName}>{item.episode}</Text>
      <View style={styles.episodeDetailCon}>
        <Text style={styles.episodeDetail}>{item.name}</Text>
        <Text style={styles.episodeDetail_date}>Air Date: {item.air_date}</Text>
      </View>
    </View>
  ));

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => closeModal()}>
      <Pressable
        style={styles.outsideModal}
        onPress={event => {
          if (event.target === event.currentTarget) {
            setModalVisible(false);
            closeModal();
          }
        }}>
        <View style={styles.centeredView}>
          <View style={styles.container}>
            <View style={styles.modalHeadContainer}>
              <Text style={styles.title}>{name}</Text>
              <TouchableOpacity onPress={() => closeModal()}>
                <Icon name="close" style={styles.title} />
              </TouchableOpacity>
            </View>
            <View style={styles.characterDetailsContainer}>
              <Image
                style={{width: '50%', height: 'auto', marginRight: 10}}
                source={{uri: image}}
              />
              <View style={styles.titleContainer}>
                <Text style={{marginTop: 10}}>Gender : {gender}</Text>
                <View style={styles.characterDetailsText}>
                  <Icon
                    name="circle"
                    size={8}
                    style={[
                      status === 'Alive' && styles.alive,
                      status === 'Dead' && styles.dead,
                      status === 'unknown' && styles.unknonwn,
                    ]}
                  />
                  <Text style={{marginLeft: 5}}>
                    {status} - {species}
                  </Text>
                </View>
                {origin && origin.name && (
                  <Text style={{marginTop: 10}}>Origin : {origin.name}</Text>
                )}
              </View>
            </View>
            <View style={styles.episodesConHeading}>
              <Text style={styles.cardTitle}> Appeared in:</Text>
            </View>
            <ScrollView style={styles.scrollContainer} horizontal={false}>
              <TouchableWithoutFeedback>
                {episodes.length ? (
                  <View style={styles.list}>{getList}</View>
                ) : (
                  <Text
                    style={{textAlign: 'center', fontSize: 14, lineHeight: 24}}>
                    No episodes found
                  </Text>
                )}
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default EpisodeModal;
