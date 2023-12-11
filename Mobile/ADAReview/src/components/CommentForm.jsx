// ReviewForm.js
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Rating from '../components/StarRating';

const CommentForm = ({ route }) => {
  const navigation = useNavigation();
  const { review } = route.params;
  const [comment, setComment] = useState('');

  const submitReview = () => {
    navigation.navigate('Review', { review: review, reviews: {title, review, rating}  });
    // Vous pouvez effectuer d'autres actions après la soumission.
    setComment('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-sharp" size={30} color="#354F52" />
        </TouchableOpacity>

        <View style={styles.contentBook}>
            <Image source={review.image} style={styles.image} />
            <Text style={styles.title}>{review.title}</Text>
            <Text style={styles.author}>{review.author}</Text>
            <Rating rating={review.rating} disabled={true} />
            {/* Affichez d'autres informations sur le livre si nécessaire */}
        </View>

        <View style={styles.commentInputContainer}>
            <Text style={styles.sectionTitle}>Votre commentaire :</Text>
            <TextInput
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={(text) => setComment(text)}
            style={styles.commentInput}
            />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
            <Text style={{ color: 'white' }}>Ajouter</Text>
        </TouchableOpacity>

        </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0EC',
    flex: 1,
    padding: 20,
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
  commentInputContainer: {
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
  commentInput: {
    height: 100,
    textAlignVertical: 'top', // Pour que le texte commence en haut du TextInput
  },
  submitButton: {
    marginTop: 5,
    marginBottom: 50,
    padding: 10,
    backgroundColor: '#354F52',
    alignItems: 'center', // Centrer horizontalement
  },
});

export default CommentForm;