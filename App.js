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
import HomeHeaderRight from './src/components/HomeHeaderRight';
import NewIdeaScreen from './src/screens/NewIdea';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <Header />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            initialRouteName: 'MyIdeas', // TODO: all route na,es as const
            // headerTitle: null,
            headerStyle: [
              styles.headerStyle,
              {backgroundColor: Colors.lightestGreyscale},
            ],
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <Icon
                style={styles.backArrow}
                name="arrow-back"
                size={30}
                color={Colors.defaultPrimary}
              />
            ),
          }}>
          <Stack.Screen
            name="Not Bored Now"
            component={HomeScreen}
            options={(navigation) => ({
              headerRight: () => <HomeHeaderRight {...navigation} />,
              headerTitle: null,
            })}
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
          <Stack.Screen
            name="New Idea"
            component={NewIdeaScreen}
            options={{title: 'New Idea'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,

    elevation: 5,
  },
  backArrow: {
    marginLeft: 20,
  },
});

export default App;
