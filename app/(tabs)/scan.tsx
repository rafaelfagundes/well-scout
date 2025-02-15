import { StyleSheet, View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import type { BarcodeScanningResult } from 'expo-camera';

import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // Store the image URI

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

  const takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: false, skipProcessing: true };
      const photo = await this.camera.takePictureAsync(options);
      setCapturedImage(photo.uri);
      setScanned(true); //optionally set scanned to true after taking a picture
    }
  };


  return (
    <BackgroundImage>
      <ScreenContainer>
        <View style={styles.container}>
          <CameraView
            ref={(ref) => {
              this.camera = ref;
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            facing="back"
          />
          {scanned && !capturedImage && (
            <Text style={styles.text} onPress={() => setScanned(false)}>Tap to Scan Again</Text>
          )}

          {!capturedImage && (
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
          )}

          {capturedImage && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: capturedImage }} style={styles.imagePreview} />
              <TouchableOpacity style={styles.retakeButton} onPress={() => {
                setCapturedImage(null);
                setScanned(false); // Allow rescanning after retake.
              }}>
                <Text style={styles.buttonText}>Retake</Text>
              </TouchableOpacity>
            </View>
          )}
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
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    padding: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  imagePreviewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Semi-transparent background
  },
  imagePreview: {
    width: '80%', // Adjust as needed
    height: '80%', // Adjust as needed
    resizeMode: 'contain',
  },
  retakeButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    padding: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
});
