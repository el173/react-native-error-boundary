# React Native ErrorBoundary

A customizable `ErrorBoundary` component for React Native applications that helps catch and handle unexpected errors in your app. You can provide a custom error message, an `onError` callback, and a custom render for the error UI.

## Features

- Catch JavaScript errors anywhere in the React Native app and handle them.
- Option to display a custom error UI or message.
- Option to pass an `onError` callback for custom error handling (e.g., logging errors).
- Toggle to display the error stack trace.

## Installation

You can install this component via npm or yarn:

```bash
npm install @el173/@el173/react-native-error-boundary
```

or

```bash
yarn add @el173/react-native-error-boundary
```

## Usage

Wrap your app (or part of it) with the `ErrorBoundary` component. Here's an example usage:

### Basic Usage

```tsx
import React from 'react';
import { Text } from 'react-native';
import ErrorBoundary from '@el173/react-native-error-boundary';

const App = () => {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
};

const MyComponent = () => {
  throw new Error("This is a test error!"); // Example error
  return <Text>Hello World!</Text>;
};

export default App;
```

### Custom Error Message

You can provide a custom error message to display when an error occurs:

```tsx
<ErrorBoundary message="Something went wrong! Please try restarting the app.">
  <MyComponent />
</ErrorBoundary>
```

### Custom `onError` Callback

You can pass a custom `onError` callback to log errors or handle them in any other way:

```tsx
<ErrorBoundary 
  onError={(error, isFatal) => {
    console.log("Error caught:", error);
    console.log("Is fatal:", isFatal);
  }}
>
  <MyComponent />
</ErrorBoundary>
```

### Custom Error UI

You can define your own error UI by passing the `renderError` prop:

```tsx
<ErrorBoundary
  renderError={(error, errorInfo) => (
    <View>
      <Text style={{ color: 'red' }}>An error occurred: {error.toString()}</Text>
      <Text>{errorInfo}</Text>
    </View>
  )}
>
  <MyComponent />
</ErrorBoundary>
```

### Example: Using All Features

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import ErrorBoundary from '@el173/react-native-error-boundary';

const App = () => {
  return (
    <ErrorBoundary 
      message="Oops! Something went wrong." 
      onError={(error, isFatal) => console.log("Caught an error:", error, "Fatal:", isFatal)}
      renderError={(error, errorInfo) => (
        <View>
          <Text style={{ color: 'red' }}>An error occurred: {error.message}</Text>
          <Text>{errorInfo}</Text>
        </View>
      )}
    >
      <MyComponent />
    </ErrorBoundary>
  );
};

const MyComponent = () => {
  throw new Error("Sample error!");
  return <Text>Hello World!</Text>;
};

export default App;
```

## Props

| Prop Name            | Type                                                        | Description                                                                                                                                  |
|----------------------|-------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `children`           | `ReactNode`                                                  | The child component(s) to be wrapped by the error boundary.                                                                                  |
| `renderError`        | `(error: Error, errorInfo?: string) => ReactNode`            | A function to render a custom error UI. `errorInfo` includes the stack trace of the error.                                                    |
| `message`            | `string`                                                     | A custom error message to display if no `renderError` is provided.                                                                            |
| `enableOriginalHandler` | `boolean`                                                  | If true, the original global error handler will be invoked in addition to the custom handler (defaults to `false`).                           |
| `onError`            | `(error: Error, isFatal?: boolean) => void`                  | A callback that gets invoked whenever an error is caught. You can use this for logging or custom error handling logic.                        |
| `showStackTrace`       | `boolean`                                                    | Controls whether the stack trace should be displayed. Defaults to `false`. When `true`, a button is provided to toggle stack trace visibility.    |


## License

MIT