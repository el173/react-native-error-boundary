import React from 'react';
import { View, Text } from 'react-native';

const CustomErrorComponent = (error: Error | null, errorInfo: string | undefined) => (
  <View>
    {error ? (
      <>
        <Text>Custom Error Message: {error.message}</Text>
        {errorInfo && <Text>Error Stack: {errorInfo}</Text>}
      </>
    ) : (
      <Text>No errors. Everything is running smoothly!</Text>
    )}
  </View>
);

export default CustomErrorComponent;
