import { StyleSheet, View, Text, Alert, SafeAreaView, TouchableOpacity, useColorScheme } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import type { CameraType, BarcodeScanningResult } from 'expo-camera';
import { useEffect, useState } from 'react';

import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Logo from '@/components/ui/Logo';
import { Flashlight, Info, UserCircleGear } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [facing] = useState<CameraType>('back');
  const [barCode, setBarCode] = useState<string>("")
  const [enableTorch, setEnableTorch] = useState(false)
  const tabBarHeight = useBottomTabBarHeight()
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingHorizontal: 16,
      marginBottom: tabBarHeight
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
      backgroundColor: 'black',
      overflow: "hidden",
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      marginVertical: 20,
      justifyContent: 'space-between',
    },
    headerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // width: 64 + 20 // margin
      width: 116
    },
    cameraContainer: {
      flex: 1,
    }
  });


  useEffect(() => {
    if (barCode !== "") {
      console.log(barCode)
    }
  }, [barCode])

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
    // setScanned(true);
    // alert(`Bar code with type ${result.type} and data ${result.data} has been scanned!`);
    setBarCode(result.data)
  };

  return (
    <BackgroundImage>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Logo />
            <View style={styles.headerButtons}>
              <TouchableOpacity onPress={() => console.log('go to ProductDetailScreen')}>
                <Info size={32} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEnableTorch(!enableTorch)}>
                <Flashlight size={32} color={colors.text} weight={enableTorch ? 'fill' : 'regular'} />
              </TouchableOpacity>
              <TouchableOpacity>
                <UserCircleGear size={32} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cameraContainer}>
            <CameraView
              autofocus='on'
              enableTorch={enableTorch}
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
