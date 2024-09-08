/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import ErrorBoundary from '@el173/react-native-error-boundary';

import CustomErrorComponent from './CustomErrorComponent';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  // Function to throw an error
  const throwError = () => {
    throw new Error('This is a test error');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ErrorBoundary
        renderError={(error, errorInfo) => CustomErrorComponent(error, errorInfo)}
        // enableOriginalHandler={true}
        // onError={(err, isFatal) => {
        //   console.log('---------handle error optionally here', err, isFatal);
        // }}
      >
        <View style={styles.sectionContainer}>
          <View>
            <Button title="Throw Error" onPress={throwError} />
          </View>
        </View>
      </ErrorBoundary>

      {/* <ErrorBoundary 
        message="Something went wrong. Please try again later." 
        // enableOriginalHandler={true}
        // showStackTrace
        onError={(err, isFatal) => {
          console.log('---------handle error optionally here', err, isFatal);
        }}
      >
        <View style={styles.sectionContainer}>
          <Button title="Throw Error" onPress={throwError} />
        </View>
      </ErrorBoundary> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
