// ReviewForm.js
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Image, ScrollView,  InputAccessoryView, Keyboard, SafeAreaView  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Rating from '../components/StarRating';
import BackButton from '../components/BackButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ReviewFormScreen = ({ route }) => {
  const navigation = useNavigation();
  const { book } = route.params;
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const submitReview = () => {
    navigation.navigate('Review', { book: book });
    // Vous pouvez effectuer d'autres actions après la soumission.
    setReview('');
    setRating(0);
  };

  return (
    <>
    {/*Creation d'un bouton fermer dans le keyboard permettant de le quitter*/}
    <InputAccessoryView nativeID="inputAccessoryView1">
      <View style={styles.inputAccessoryView}>
        <TouchableOpacity onPress={() => Keyboard.dismiss()}>
          <Text style={styles.inputAccessoryButton}>Fermer</Text>
        </TouchableOpacity>
      </View> 
    </InputAccessoryView>
     {/*SafeAreaView pour garder le bouton back*/}
    <SafeAreaView>
      <BackButton navigation={navigation} />
    </SafeAreaView>

    {/*KeyboardAwareScrollView pour ajuster le keyboard pendant écriture*/}
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}>
      
      <ScrollView style={styles.container}>
        <View style={styles.contentBook}>
            <Image source={book.image} style={styles.image} />
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
            <Rating rating={book.rating} disabled={true} />
        </View>

        <View style={styles.ratingInputContainer}>
            <Text style={styles.sectionTitle}>Votre note :</Text>
            <Rating rating={rating} onRatingChange={(value) => setRating(value)} disabled={false} starSize = {35}/>
        </View>

        <View style={styles.titleInputContainer}>
            <Text style={styles.sectionTitle}>Titre :</Text>
            <TextInput
            value={title}
            maxLength={20}
            onChangeText={(text) => setTitle(text)}
            style={styles.titleInput}
            inputAccessoryViewID="inputAccessoryView1"
            />
        </View>

        <View style={styles.reviewInputContainer}>
          <Text style={styles.sectionTitle}>Votre critique :</Text>
          <TextInput
            maxLength={500}
            value={review}
            onChangeText={(text) => setReview(text)}
            style={styles.reviewInput}
            inputAccessoryViewID="inputAccessoryView1"
            multiline={true}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Ajouter</Text>
        </TouchableOpacity>

      </ScrollView>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0EC',
    flex : 1
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
  title: {
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
  titleInputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 5,
    paddingBottom: 5,
    marginBottom: 20,
  },
  reviewInputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  ratingInputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  titleInput: {
    height: 40,
  },
  reviewInput: {
    height: 100,
    textAlignVertical: 'top', // Pour que le texte commence en haut du TextInput
  },
  inputAccessoryView: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  inputAccessoryButton: {
    color: 'blue',
    fontWeight: 'bold',
    padding: 10,
  },
  submitButton: {
    marginTop: 5,
    marginBottom : 15,
    padding: 10,
    width : '30%',
    backgroundColor: '#354F52',
    alignSelf :'center',
    alignItems: 'center', // Centrer horizontalement
  },
});

export default ReviewFormScreen;