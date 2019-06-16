import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    zIndex: 2000,
    bottom: 0,
  },
  offlineText: { color: '#fff' },
});

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>Not connected to MQTT</Text>
    </View>
  );
}

export default MiniOfflineSign;
