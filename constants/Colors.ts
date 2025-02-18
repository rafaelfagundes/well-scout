/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#095256';
const tintColorDark = '#fff';

const inactiveTabBarItemLight = '#09525670';
const inactiveTabBarItemDark = '#FFFFFF60';


export const Colors = {
  light: {
    text: '#095256',
    background: '#fff',
    tint: tintColorLight,
    inactiveTabBarItem: inactiveTabBarItemLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    inactiveTabBarItem: inactiveTabBarItemDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
}; 
