import { StyleSheet, View, Text, Alert, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import type { CameraType, BarcodeScanningResult } from 'expo-camera';
import { useState } from 'react';

import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Logo from '@/components/ui/Logo';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [facing] = useState<CameraType>('back');
  const tabBarHeight = useBottomTabBarHeight()

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      paddingHorizontal: 16,
      // height: "100%",
      // width: "100%",
    },
    text: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
    },
    cameraView: {
      width: "100%",
      height: "100%",
      borderRadius: 20,
      overflow: "hidden",
    },
    header: {
      flexDirection: 'row',
      marginTop: 20
    }
  });

  if (!permission) {
    return (
      <BackgroundImage>
        <ScreenContainer>
          <Text>Requesting camera permission...</Text>
        </ScreenContainer>
      </BackgroundImage>
    );
  }

  if (!permission.granted) {
    return (
      <BackgroundImage>
        <ScreenContainer>
          <Text style={styles.text} onPress={() => {
            Alert.alert(
              "Camera Permission Required",
              "We need access to your camera to scan barcodes. Would you like to enable camera access?",
              [
                {
                  text: "Not Now",
                  style: "cancel"
                },
                {
                  text: "Enable Camera",
                  onPress: requestPermission
                }
              ]
            );
          }}>Enable Camera Access</Text>
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
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Logo />
          </View>
          <CameraView
            // style={{ ...StyleSheet.absoluteFillObject, ...styles.cameraView }}
            style={{ ...styles.cameraView }}
            facing={facing}
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a'],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />

          {scanned && (
            <Text style={styles.text} onPress={() => setScanned(false)}>
              Tap to Scan Again
            </Text>
          )}
        </View>
      </SafeAreaView>
    </BackgroundImage>
  );
}

