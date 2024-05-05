import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from './screens/ChatScreen';
import MessagesScreen from './screens/MessageScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GlobalState from './context';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator>
          {/* all the screens here */}
          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ChatScreen'
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='MessageScreen'
            component={MessagesScreen}
            options={{ title: 'Messages' }} // Example: Set custom title for MessageScreen
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* StatusBar */}
      <StatusBar style='auto' />
    </GlobalState>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
