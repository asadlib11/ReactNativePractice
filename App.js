import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './components/Home';
import TodoList from './components/TodoList';
import User from './components/User';
import TodoTask from './components/TodoTask';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import ContactsPage from './components/Contacts';

export default function App() {
  const Stack = createStackNavigator();
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
    <NavigationContainer>
      <Stack.Navigator initalRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TodoList" component={TodoList} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="TaskDetail" component={TodoTask} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="PostDetail" component={PostDetail} />
        <Stack.Screen name="Contacts" component={ContactsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
