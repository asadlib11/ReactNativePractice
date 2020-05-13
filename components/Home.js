import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Home=(props) =>{
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="Go to TodoList"
        onPress={() => props.navigation.navigate('TodoList')}
      />
      <Button
        title="Go to Your Profile"
        onPress={() => props.navigation.navigate('User', {name: "Asad"})}
      />
      <Button
        title="Go to Your Posts"
        onPress={() => props.navigation.navigate('Posts')}
      />
      <Button
        title="Go to Your ContactList"
        onPress={() => props.navigation.navigate('Contacts')}
      />
    </View>
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
export default Home;