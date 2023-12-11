import { TouchableOpacity } from "react-native";
import { bookDetailsstyles } from "../styles/styles";
import Icon from 'react-native-vector-icons/Ionicons';

function BackButton({ navigation, style }) {
  return (
    <TouchableOpacity
      style={[bookDetailsstyles.icon, style]} // Utilisez la propriété style ici
      onPress={() => navigation.goBack()}
    >
      <Icon name="chevron-back-sharp" size={30} color="#354F52" />
    </TouchableOpacity>
  );
}

export default BackButton;
