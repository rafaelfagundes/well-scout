import { StyleSheet, View } from 'react-native';

import ScreenContainer from '@/components/ui/ScreenContainer';
import { Text } from 'react-native'
import BackgroundImage from '@/components/ui/BackgroundImage';
import { CategoryTabs, Tabs } from '@/features/overview/CategoryTabs';
import { useState } from 'react';
import RatingBar from '@/components/ui/RatingBar';


export default function OverviewScreen() {
  const [activeTab, setActiveTab] = useState(Tabs.FOOD);
  return (
    <BackgroundImage>
      <ScreenContainer>
        <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <RatingBar ratings={{ 'a': 50, 'b': 10, 'c': 30, 'd': 40, 'e': 10 }} />
      </ScreenContainer>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
});

