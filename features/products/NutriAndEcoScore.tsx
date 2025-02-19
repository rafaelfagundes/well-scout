import { Fonts } from '@/constants/Fonts';
import { Leaf, Plant, Tree, TreeEvergreen } from 'phosphor-react-native';
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

interface NutriAndEcoScoreProps {
  nutriScore: string;
  ecoScore: string;
}

function NutriAndEcoScore({ nutriScore, ecoScore }: NutriAndEcoScoreProps) {
  return (
    <View style={styles.ratings}>
      <View style={styles.nutriScore}>
        <NutriScore nutriScore='a' isFirst={true} isScore={nutriScore === 'a'} />
        <NutriScore nutriScore='b' isScore={nutriScore === 'b'} />
        <NutriScore nutriScore='c' isScore={nutriScore === 'c'} />
        <NutriScore nutriScore='d' isScore={nutriScore === 'd'} />
        <NutriScore nutriScore='e' isScore={nutriScore === 'e'} isLast={true} />
      </View>
      <View style={styles.ecoScore}>
        <EcoScore ecoScore={ecoScore}></EcoScore>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ratings: {
    flexDirection: 'row',
    height: 30,
    gap: 10,
  },
  nutriScore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ecoScore: {}
})

export default NutriAndEcoScore

function EcoScore({ ecoScore }: { ecoScore: string }) {
  const color = getBackgroundColor(ecoScore)

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    icon: {
      width: 26,
      height: 26,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color,
      zIndex: 100
    },
    textHolder: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      paddingLeft: 20,
      paddingRight: 10,
      marginLeft: -15,
      height: 18
    },
    text: {
      fontFamily: Fonts.sansSerif,
      fontWeight: 700,
      color: '#FFF',
      fontSize: 12,
    }
  })

  return <View style={styles.item}>
    <View style={styles.icon}>
      <Tree size={18} color="#FFF" weight='fill' />
    </View>
    <View style={styles.textHolder}>
      <Text style={styles.text}>{ecoScore.toUpperCase()}</Text>
    </View>
  </View>
}

function NutriScore({ nutriScore, isScore = false, isFirst = false, isLast = false }: { nutriScore: string, isScore?: boolean, isFirst?: boolean, isLast?: boolean }) {
  const color = getBackgroundColor(nutriScore);

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: isLast || isFirst || isScore ? 26 : 24,
      height: isScore ? 26 : 16,
      backgroundColor: color,
      borderTopLeftRadius: isFirst || isScore ? 8 : 0,
      borderBottomLeftRadius: isFirst || isScore ? 8 : 0,
      borderTopRightRadius: isLast || isScore ? 8 : 0,
      borderBottomRightRadius: isLast || isScore ? 8 : 0,
      // marginHorizontal: isScore ? 1 : 0,
      paddingRight: isLast && !isScore ? 4 : 0,
      paddingLeft: isFirst && !isScore ? 4 : 0,
    },
    ratingLetter: {
      color: '#FFF',
      fontFamily: Fonts.sansSerif,
      fontWeight: 700,
      fontSize: 12
    }
  })

  return (
    <View style={styles.item}>
      <Text style={styles.ratingLetter}>{nutriScore.toUpperCase()}</Text>
    </View>
  )
}

function getBackgroundColor(score: string) {
  let color: string;

  switch (score) {
    case 'a':
      color = '#095256'
      break;
    case 'b':
      color = '#00DF82'
      break;
    case 'c':
      color = '#E7D395'
      break;
    case 'd':
      color = '#FE654F'
      break;
    case 'e':
      color = '#81171B'
      break;
    default:
      color = '#000';
      break;
  }

  return color;
}
