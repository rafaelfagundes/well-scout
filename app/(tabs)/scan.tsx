import { StyleSheet, View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';

import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string,  string }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return (
      <BackgroundImage>
        <ScreenContainer>
          <Text>Requesting for camera permission</Text>
        </ScreenContainer>
      </BackgroundImage>
    );
  }
  if (hasPermission === false) {
    return (
      <BackgroundImage>
        <ScreenContainer>
          <Text>No access to camera</Text>
        </ScreenContainer>
      </BackgroundImage>
    );
  }


  return (
    <BackgroundImage>
      <ScreenContainer>
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
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
