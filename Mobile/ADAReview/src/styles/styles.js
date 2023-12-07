// styles.js
import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0EC',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bigImage: {
    width: 150,
    height: 300,
    marginRight: 10
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#808080',
  },
  author: {
    fontSize: 16,
    marginBottom: 8,
  },
  text: {
    color: '#808080',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
