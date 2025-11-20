import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FFFFFF',
              elevation: 2,
              shadowOpacity: 0.1,
            },
            headerTintColor: '#1F2937',
            headerTitleStyle: {
              fontWeight: '600',
              fontSize: 20,
            },
            headerTitle: () => (
              <View style={styles.headerTitle}>
                <View style={styles.logoContainer}>
                  <Text style={styles.logoText}>🤖</Text>
                </View>
                <View>
                  <Text style={styles.titleText}>CHATBOT</Text>
                  <Text style={styles.subtitleText}>AI-Powered Assistant</Text>
                </View>
              </View>
            ),
          }}
        >
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitleText: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default App;
