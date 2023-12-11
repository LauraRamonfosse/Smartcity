import {React, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Rating from '../components/StarRating';
import BackButton from "../components/BackButton";

function ReviewScreen({ route }) {
  const navigation = useNavigation();
  const {review} = route.params;
  const [likes, setLikes] = useState(10); // Initialisez avec la valeur initiale
  const [dislikes, setDislikes] = useState(5);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  const handleDislikeClick = () => {


    setDislikes(dislikes + 1);
  };


  const goToFormComment = () => {
    navigation.navigate('CommentForm', { review:review });
  };

  return (
    <>
    <SafeAreaView>
        <BackButton navigation={navigation} color={'#354F52'}/>
      <ScrollView style= {styles.container}>

        <View style={styles.reviewContaineur}>
          <Image source={review.image} style={styles.profileImage} />
          <View style={styles.textreviewContaineur}>
            <Text style={styles.commentName}>Nom de l'utilisateur</Text>
            <Rating rating={review.rating} disabled={true} />
            <Text style={styles.titleReview}>titre de la review </Text>
            <View style={styles.likesDislikeContainerReview}>
              <Text style={styles.likeButton}>👍</Text>
              <Text style={styles.voteCount}>{10-5}</Text>
              <Text style={styles.dislikeButton}>👎</Text>
            </View>
          </View>
        </View>

        <View style={styles.reviewContentContaineur}>
          <Text style={styles.contentReview}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </View>

        <View style= {{marginTop: 20, marginBottom: 10}}>
          <Text style= {{fontSize: 30}}>
            Commentaires :
          </Text>
        </View>

        <View style={styles.commentInfoContainer}>
          <Image source={review.image} style={styles.profileImage} />
          <View style={styles.textreviewContaineur}>
            <Text style={styles.commentName}>Nom de l'utilisateur</Text>
            <Text style={styles.contentComment}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
            <View style={styles.likesDislikeContainerComment}>
            <TouchableOpacity onPress={handleLikeClick}>
                <Text style={styles.likeButton}>👍</Text>
              </TouchableOpacity>
              <Text style={styles.voteCount}>{likes-dislikes}</Text>
              <TouchableOpacity onPress={handleDislikeClick}>
                <Text style={styles.dislikeButton}>👎</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.commentInfoContainer}>
          <Image source={review.image} style={styles.profileImage} />
          <View style={styles.textreviewContaineur}>
            <Text style={styles.commentName}>Nom de l'utilisateur</Text>
            <Text style={styles.contentComment}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
            <View style={styles.likesDislikeContainerComment}>
            <TouchableOpacity onPress={handleLikeClick}>
                <Text style={styles.likeButton}>👍</Text>
              </TouchableOpacity>
              <Text style={styles.voteCount}>{likes-dislikes}</Text>
              <TouchableOpacity onPress={handleDislikeClick}>
                <Text style={styles.dislikeButton}>👎</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0EC',
    padding: 20,
    marginBottom: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  icon: {
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contentBook: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleBook: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#354F52',
  },
  author: {
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
    fontWeight: '800',
  },
  buttonAdd: {
    backgroundColor: '#354F52',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    margin: 20,
  },
  sectionbutton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewContaineur: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderBottomWidth: 0, // Remove the bottom border
  },
  reviewContentContaineur: {
    padding: 10,
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    borderWidth: 2,
    borderTopWidth: 0, // Remove the top border
  },
  profileImage: {
    width: 100,
    height: 120,
    marginRight: 10, // Gardez la marge à droite si nécessaire
  },
  textreviewContaineur: {
    flex: 1,
  }, 
  contentReview: {
    fontWeight: 'bold',
  },
  commentInfoContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    flex: 1, // Ajuster automatiquement la hauteur
  },
  commentName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleReview: {
    fontWeight: 'bold',
    flexWrap: 'wrap', // Permettre le retour à la ligne
  },
  likesDislikeContainerReview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    top: 20,
    paddingBottom: 20,
  },
  likeButton: {
    fontSize: 15,
    marginEnd: 10,
  },
  dislikeButton: {
    fontSize: 15,
    marginStart: 10,
  },
  voteCount: {
    fontSize: 15,
    marginBottom: 10,
  },
  likesDislikeContainerComment: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: 20,
    paddingBottom: 10,
  },
  contentComment: {
    backgroundColor: '#D9D9D9',
    fontWeight: 'bold',
    flexWrap: 'wrap', // Permettre le retour à la ligne
  },
});

export default ReviewScreen;
