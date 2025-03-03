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
    a: '#0C9157',
    b: '#2CB091',
    c: '#E7D395',
    d: '#FE654F',
    e: '#81171B',
  },
  dark: {
    a: '#13B95B',
    b: '#B0DB43',
    c: '#FFF07C',
    d: '#F56D60',
    e: '#E3383B',
  }
}

export const Colors = {
  light: {
    text: '#095256',
    invertedText: "#FFFFFF",
    background: '#FFFFFF',
    tint: tintColorLight,
    tintConstrast: tintConstrastColorLight,
    inactiveTabBarItem: inactiveTabBarItemLight,
    activeTabBarItem: activeTabBarItemLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    ratings: ratingColors.light,
    vegan: '#0C9157',
    vegetarian: '#3F88C5',
    error: '#FF0000',
    warning: '#FFA500',
    success: '#13B95B',
    inputOnCard: '#F2F2F2',
  },
  dark: {
    text: '#ECEDEE',
    invertedText: "#151718",
    background: '#151718',
    tint: tintColorDark,
    tintConstrast: tintConstrastColorDark,
    inactiveTabBarItem: inactiveTabBarItemDark,
    activeTabBarItem: activeTabBarItemDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    ratings: ratingColors.dark,
    vegan: '#96E6B3',
    vegetarian: '#01BAEF',
    error: '#FF0000',
    warning: '#FFA500',
    success: '#00FF00',
    inputOnCard: '#222'
  },
}; 
