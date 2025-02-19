import { StyleSheet, View, Text, Alert, SafeAreaView, TouchableOpacity, useColorScheme } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Logo from '@/components/ui/Logo';
import { Flashlight, Info, UserCircleGear } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';

export default function ScanScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back')

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const router = useRouter();
  const [scanned, setScanned] = useState(false);
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

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      // console.log(`Scanned ${codes.length} codes!`)
      if (codes[0].value !== barCode) {
        setBarCode(codes[0].value ?? "")
      }
    }
  });

  useEffect(() => {
    console.log(barCode)
    if (barCode !== "") {
      router.push(`/product/${barCode}`);
    }
  }, [barCode])

  if (!hasPermission) {
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
            {device && <Camera
              style={styles.cameraView}
              codeScanner={codeScanner}
              device={device}
              isActive={true}
              torch={enableTorch ? 'on' : 'off'}
              zoom={2}
            />}
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
