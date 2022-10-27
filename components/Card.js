import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
    shadowOpacity: 0.6,
    elevation: 8,
    backgroundColor: 'white',
    // padding: 20,
    borderRadius: 0,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: 150,
    //alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 10,
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
  cardButton: {
    marginTop: 'auto',
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    bottom: 0,
    width: '100%',
  },
  buttonTitle: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#0000EE',
    textDecorationColor: '#0000EE',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
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
});
class Card extends React.PureComponent {
  render() {
    const {data, displayDetsils} = this.props;
    if (data && data.item) {
      const {id, image, episode, name, status, species} = data.item;
      return (
        <View style={styles.card}>
          <Image
            style={{width: '50%', height: 'auto', marginRight: 10}}
            source={{uri: image}}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.cardTitle}>{name}</Text>
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
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => displayDetsils(data.item)}>
              <Text style={styles.buttonTitle}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
// const Card = React.memo(({data, displayDetsils}) => {
//   if (data && data.item) {
//     return (
//       <View style={styles.card}>
//         <Image
//           style={{width: 200, height: 'auto', marginRight: 10}}
//           source={{uri: data.item.image}}
//         />
//         <View style={styles.titleContainer}>
//           <Text style={styles.cardTitle}>{data.item.name} {data.item.id}</Text>
//           <Text style={styles.cardTitle}>Status: {data.item.status}</Text>
//           <TouchableOpacity
//             style={styles.cardButton}
//             onPress={() => getEpisodes(data.item.episode)}>
//             <Text style={styles.buttonTitle}>View Episodes</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// });

export default Card;
