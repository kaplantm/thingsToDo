import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './src/screens/Home';
import MyIdeas from './src/screens/MyIdeas';
import Settings from './src/screens/Settings';
import Header from './src/components/Header';
import Colors from './theme/colors';
import HeaderRightContainer from './src/components/HeaderRightContainer';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <Header />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitle: null,
            headerTransparent: true,
            headerStyle: styles.headerStyle,
          }}>
          <Stack.Screen
            name="Not Bored Now"
            component={HomeScreen}
            options={{
              headerRight: HeaderRightContainer,
            }}
          />
          <Stack.Screen
            name="My Ideas"
            component={MyIdeas}
            options={{title: 'My Ideas'}}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{title: 'Settings'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 50,
  },
});

export default App;
