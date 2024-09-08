import React, { useState, useEffect, ReactNode } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ScaledSize, View } from 'react-native';

type ErrorHandlerCallback = (error: Error, isFatal?: boolean) => void;

interface ErrorBoundaryProps {
  children: ReactNode;
  renderError?: (error: Error | null, errorInfo: string | undefined) => ReactNode;
  message?: string;
  enableOriginalHandler?: boolean;
  onError?: ErrorHandlerCallback;
  showStackTrace?: boolean;
}

const ErrorBoundary = ({
  children,
  renderError,
  message,
  enableOriginalHandler,
  onError,
  showStackTrace = false,
}: ErrorBoundaryProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [showStack, setShowStack] = useState(false);
  const [maxStackHeight, setMaxStackHeight] = useState(
    Dimensions.get('window').height / 2,
  );

  useEffect(() => {
    const errorHandler = (err: Error, errorInfo: { isFatal: boolean }) => {
      if (errorInfo.isFatal) {
        setError(err);

        if (onError) {
          onError(err, errorInfo.isFatal);
        }
      }
    };

    const globalHandler: ErrorHandlerCallback = (err: Error, isFatal?: boolean) => {
      errorHandler(err, { isFatal: isFatal ?? false });
      if (originalHandler && enableOriginalHandler) {
        originalHandler(err, isFatal);
      }
    };

    const originalHandler = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler(globalHandler);

    return () => {
      ErrorUtils.setGlobalHandler(originalHandler);
    };
  }, [enableOriginalHandler, onError]);

  useEffect(() => {
    const handleResize = ({ window }: { window: ScaledSize }) => {
      setMaxStackHeight(window.height / 2);
    };
  
    Dimensions.addEventListener('change', handleResize);
  
    return () => {
      Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  const handleShowStack = () => {
    setShowStack(!showStack);
  };

  if (error) {
    return renderError ? (
      <View style={styles.mainWrapper}>
        {renderError(error, error.stack)}
      </View>
    ) : (
      <ScrollView contentContainerStyle={styles.mainWrapper}>
        <Text>{message || 'An error occurred. Please restart the app.'}</Text>
        <TouchableOpacity onPress={showStackTrace ? handleShowStack : undefined}>
          <Text style={styles.errorText}>{error.toString()}</Text>
        </TouchableOpacity>
        {showStackTrace && showStack && (
          <ScrollView
            style={[styles.errorStackContainer, { maxHeight: maxStackHeight }]}>
            <Text style={styles.errorStack}>{error.stack}</Text>
          </ScrollView>
        )}
      </ScrollView>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 10,
    color: '#721c24',
  },
  errorStackContainer: {
    marginTop: 20,
    width: '100%',
  },
  errorStack: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default ErrorBoundary;
