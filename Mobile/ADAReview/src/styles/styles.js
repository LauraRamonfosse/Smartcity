// styles.js
import { StatusBar, StyleSheet } from 'react-native';

// Styles des cartes pour book et account
export const cardStyle = StyleSheet.create({
  
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
  accountImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  bookImage: {
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
  likeDislikeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 30,
    right: 0,
  },
  likeButton: {
    fontSize: 15,
    marginBottom : 10,
    color: '#00cc00', // Couleur du bouton Like
  },
  dislikeButton: {
    fontSize: 15,
    color: '#cc0000', // Couleur du bouton Dislike
  },
  reviewImage: {
    width: 100,
    height: 120,
    marginRight: 10,
  },
  username: {
    fontSize: 12,
    marginBottom: 8,
  },
  reviewTitle:{
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom : 10
  },
  voteCount: {
    fontSize: 15,
    marginBottom : 10,
    fontWeight: 'bold',
  },
});

// BookScreen
export const bookDetailsstyles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0EC',
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  icon: { // Ajustez la marge pour placer le bouton légèrement moins haut
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  content: {
    alignItems : 'center',
    marginBottom: 30, // Ajustez la marge pour placer les informations du livre un peu plus haut
  },
  title: {
    fontSize: 32,
    fontWeight:'800',
    marginTop: 7,
    marginBottom : 7,
    color : '#354F52'
  },
  ratingContainer:{
    flexDirection: 'row', 
    alignItems:'center'
  },
  info: {
    textAlign: 'center',
    fontSize : 16,
    marginTop : 5,
    marginBottom :7,
    color : '#000',
    fontWeight : '400'
  },
  author: {
    fontSize: 20,
    marginBottom : 7,
    color : '#000',
    fontWeight:'800'
  },
  date: {
    fontSize: 16,
    marginTop: 5,
    color: '#808080',
  },
  reviewContainer: {
    backgroundColor: '#354F52',
    borderRadius : 0,
    width : '91%',
    padding: 10,
    marginTop: 20, // Ajustez la marge pour définir l'espace entre le livre et le conteneur de la critique
  },
  cardContainer:{
    width:'95%',
    marginTop : 40
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom : 10,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#354F52',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addIcon:{
    color :'white',
    fontWeight : '800',

  },
  addText: {
    color: 'white',
    fontWeight : '800',
    fontSize: 23,
  },
});

//SearchScreen
export const searchStyle = StyleSheet.create({
  bar: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingBottom: 10, 
    paddingTop: 10,
  }
})
