/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#095256';
const tintColorDark = '#00DF82';

const tintConstrastColorLight = '#FFFFFF';
const tintConstrastColorDark = '#095256';

const activeTabBarItemLight = tintColorLight;
const activeTabBarItemDark = '#FFFFFF';
const inactiveTabBarItemDark = '#FFFFFF60';
const inactiveTabBarItemLight = '#09525675';

const ratingColors = {
  light: {
    a: '#095256',
    b: '#00DF82',
    c: '#E7D395',
    d: '#FE654F',
    e: '#81171B',
  },
  dark: {
    a: '#095256',
    b: '#00DF82',
    c: '#E7D395',
    d: '#FE654F',
    e: '#81171B',
  }
}

export const Colors = {
  light: {
    text: '#095256',
    background: '#FFFFFF',
    tint: tintColorLight,
    tintConstrast: tintConstrastColorLight,
    inactiveTabBarItem: inactiveTabBarItemLight,
    activeTabBarItem: activeTabBarItemLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    ratings: ratingColors.light
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    tintConstrast: tintConstrastColorDark,
    inactiveTabBarItem: inactiveTabBarItemDark,
    activeTabBarItem: activeTabBarItemDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    ratings: ratingColors.dark
  },
}; 
