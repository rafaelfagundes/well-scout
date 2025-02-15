import { StyleSheet, View } from 'react-native';

import ScreenContainer from '@/components/ui/ScreenContainer';
import { Text } from 'react-native'
import BackgroundImage from '@/components/ui/BackgroundImage';

export default function OverviewScreen() {
  return (
    <BackgroundImage>
      <ScreenContainer>
        <Text>Overview</Text>
      </ScreenContainer>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
});

