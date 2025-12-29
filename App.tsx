
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens (из будущей реализации)
import DashboardScreen from './src/screens/DashboardScreen';
import NewBatchWizard from './src/screens/NewBatchWizard';

import { StyleSheet } from 'react-native';
import { theme } from './src/styles/theme';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar style="dark" />
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: theme.colors.background },
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                        animation: 'slide_from_right',
                    }}
                >
                    <Stack.Screen name="Dashboard" component={DashboardScreen} />
                    <Stack.Screen
                        name="NewBatchWizard"
                        component={NewBatchWizard}
                        options={{
                            presentation: 'card',
                            gestureEnabled: true,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...theme.typography.header,
    },
});
