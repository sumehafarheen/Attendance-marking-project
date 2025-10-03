import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  SetPassword: undefined;
  Home: undefined;
  Attendance: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// ----------- Login Screen -----------
const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim() === '') {
      Alert.alert('Error', 'Please enter your username');
    } else {
      navigation.navigate('SetPassword', { username });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Enter Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Next" onPress={handleLogin} />
    </View>
  );
};

// ----------- Set Password Screen -----------
const SetPasswordScreen = ({ route, navigation }: any) => {
  const { username } = route.params;
  const [password, setPassword] = useState('');

  const handleSetPassword = () => {
    if (password.trim() === '') {
      Alert.alert('Error', 'Please enter a password');
    } else {
      Alert.alert('Success', `Password set for ${username}`);
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Password</Text>
      <TextInput
        placeholder="Enter Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Submit" onPress={handleSetPassword} />
    </View>
  );
};

// ----------- Home Screen -----------
const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Attendance App</Text>
      <Button title="Go to Attendance" onPress={() => navigation.navigate('Attendance')} />
    </View>
  );
};

// ----------- Attendance Screen -----------
const AttendanceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Screen</Text>
      <Text>Mark your attendance here!</Text>
    </View>
  );
};

// ----------- App Component -----------
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// ----------- Styles -----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});