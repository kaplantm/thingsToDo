import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { store, persistor } from './src/redux/store';
import HomeScreen from './src/screens/Home';
import Settings from './src/screens/Settings';
import Colors from './theme/colors';
import NewIdeaScreen from './src/screens/NewIdea';
import ActivityCards from './src/screens/ActivityCards';
import AuthService from './src/components/AuthService';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthService />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              initialRouteName: 'MyIdeas', // TODO: all route na,es as const
              // headerTitle: null,
              headerStyle: [styles.headerStyle],
              headerTitleStyle: [styles.headerTitleStyle],
              headerBackTitleVisible: false,
              headerBackImage: () => (
                <Icon
                  style={styles.backArrow}
                  name="arrow-back"
                  size={30}
                  color={Colors.lightPrimary}
                />
              ),
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={(navigation) => ({
                headerTitle: 'Things To Do',
              })}
            />
            <Stack.Screen
              name="Activity Cards"
              component={ActivityCards}
              options={{ title: 'Activity Cards' }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ title: 'Settings' }}
            />
            <Stack.Screen
              name="New Idea"
              component={NewIdeaScreen}
              options={{ title: 'New Idea' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 100,
    backgroundColor: Colors.defaultPrimary,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTitleStyle: {
    color: Colors.lightestGreyscale,
    fontSize: 20,
    letterSpacing: 1.2,
    fontWeight: '600',
  },
  backArrow: {
    marginLeft: 20,
  },
});

export default App;
