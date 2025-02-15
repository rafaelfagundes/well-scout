import { StyleSheet, View } from 'react-native';

import ScreenContainer from '@/components/ui/ScreenContainer';
import { Text } from 'react-native'
import BackgroundImage from '@/components/ui/BackgroundImage';

export default function ScanScreen() {
  return (
    <BackgroundImage>
      <ScreenContainer>
        <Text>Scan</Text>
      </ScreenContainer>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
});

