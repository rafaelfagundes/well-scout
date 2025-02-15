import { StyleSheet, View, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import type { BarcodeScanningResult } from 'expo-camera';

import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    // Camera permissions are still loading
    return (
      <BackgroundImage>
        <ScreenContainer>
          <Text>Requesting camera permission...</Text>
        </ScreenContainer>
      </BackgroundImage>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <BackgroundImage>
        <ScreenContainer>
          <Text>We need your permission to show the camera</Text>
          <Text style={styles.text} onPress={requestPermission}>Grant permission</Text>
        </ScreenContainer>
      </BackgroundImage>
    );
  }

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    setScanned(true);
    alert(`Bar code with type ${result.type} and data ${result.data} has been scanned!`);
  };

  return (
    <BackgroundImage>
      <ScreenContainer>
        <View style={styles.container}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            facing="back"
          />
          {scanned && <Text style={styles.text} onPress={() => setScanned(false)}>Tap to Scan Again</Text>}
        </View>
      </ScreenContainer>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  }
});
