/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#095256';
const tintColorDark = '#00DF82';

const tintConstrastColorLight = '#fff';
const tintConstrastColorDark = '#095256';

const activeTabBarItemLight = tintColorLight;
const activeTabBarItemDark = '#FFF';
const inactiveTabBarItemDark = '#FFFFFF60';
const inactiveTabBarItemLight = '#09525675';


export const Colors = {
  light: {
    text: '#095256',
    background: '#fff',
    tint: tintColorLight,
    tintConstrast: tintConstrastColorLight,
    inactiveTabBarItem: inactiveTabBarItemLight,
    activeTabBarItem: activeTabBarItemLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
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
  },
}; 
