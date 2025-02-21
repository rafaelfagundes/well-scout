import { StyleSheet, View } from 'react-native';

import ScreenContainer from '@/components/ui/ScreenContainer';
import { Text } from 'react-native'
import BackgroundImage from '@/components/ui/BackgroundImage';
import { CategoryTabs, Tabs } from '@/features/overview/CategoryTabs';
import { useState } from 'react';


export default function OverviewScreen() {
  const [activeTab, setActiveTab] = useState(Tabs.FOOD);
  return (
    <BackgroundImage>
      <ScreenContainer>
        <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </ScreenContainer>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
});

