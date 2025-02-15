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
      flex: 1, // Make the container take up all available space
      flexDirection: 'column',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    text: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
    },
    cameraView: {
      width: "100%",
      borderRadius: 20,
      overflow: "hidden",
      flex: 1, // Make CameraView fill its parent
    },
    header: {
      flexDirection: 'row',
      marginTop: 20
    },
    cameraContainer: {
      flex: 1, // Add this to make the camera container fill the SafeAreaView
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
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Logo />
          </View>
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.cameraView}
              facing={facing}
              barcodeScannerSettings={{
                barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a'],
              }}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
          </View>
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
