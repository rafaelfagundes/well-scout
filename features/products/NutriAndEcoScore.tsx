import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Leaf, Plant, Tree, TreeEvergreen } from 'phosphor-react-native';
import React from 'react'
import { Text, View, StyleSheet, useColorScheme } from 'react-native'

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
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  nutriScore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ecoScore: {
    marginRight: 5
  }
})

export default NutriAndEcoScore;

function EcoScore({ ecoScore }: { ecoScore: string }) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const color = colors.ratings[ecoScore as keyof typeof colors.ratings]

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
      backgroundColor: color ?? colors.text,
      zIndex: 100
    },
    textHolder: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color ?? colors.text,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      paddingLeft: 20,
      paddingRight: 10,
      marginLeft: -15,
      height: 16
    },
    text: {
      fontFamily: Fonts.sansSerif,
      fontWeight: 700,
      color: colors.invertedText,
      fontSize: 12,
    }
  })

  function getEcoScore(ecoScore: string) {
    if (['a', 'b', 'c', 'd', 'e'].includes(ecoScore)) {
      return ecoScore.toUpperCase()
    }
    else {
      return 'N/A'
    }
  }

  return <View style={styles.item}>
    <View style={styles.icon}>
      <Tree size={16} color={colors.invertedText} weight='fill' />
    </View>
    <View style={styles.textHolder}>
      <Text style={styles.text}>{getEcoScore(ecoScore)}</Text>
    </View>
  </View>
}

function NutriScore({ nutriScore, isScore = false, isFirst = false, isLast = false }: { nutriScore: string, isScore?: boolean, isFirst?: boolean, isLast?: boolean }) {
  const colors = Colors[useColorScheme() ?? 'light'];
  const color = colors.ratings[nutriScore as keyof typeof colors.ratings]

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
      color: colors.invertedText,
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

