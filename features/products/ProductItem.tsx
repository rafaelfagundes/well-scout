import { View, Text, Image, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Clock } from 'phosphor-react-native';
import { Fonts } from '@/constants/Fonts';
import NutriAndEcoScore from './NutriAndEcoScore';
import { formatRelativeTime } from '@/lib/formatRelativeTime';
import { Colors } from '@/constants/Colors';

interface ProductItemProps {
  id: string;
  imageUrl: string;
  productName: string;
  brandName: string;
  ecoScore: string;
  nutriScore: string;
  createdDate?: Date;
}

export default function ProductItem({
  id,
  imageUrl,
  productName,
  brandName,
  ecoScore,
  nutriScore,
  createdDate,
}: ProductItemProps) {

  const colorScheme = useColorScheme()

  const styles = StyleSheet.create({
    card: {
      borderRadius: 20,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      opacity: 0.85
    },
    cardContent: {
      padding: 10,
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    productInfo: {
      flexDirection: 'row',
      flex: 1,
    },
    imageContainer: {
      width: 70,
      height: 70,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: '#8B2323',
      marginRight: 10,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    infoContainer: {
      justifyContent: 'space-between',
    },
    productName: {
      color: Colors[colorScheme ?? 'light'].text,
      fontFamily: Fonts.sansSerif,
      fontSize: 15,
      fontWeight: '700',
    },
    brandName: {
      color: Colors[colorScheme ?? 'light'].text,
      fontFamily: Fonts.sansSerif,
      fontSize: 12,
      marginTop: 2,
      opacity: .85
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      marginRight: 10,
      marginTop: 3,
    },
    timeText: {
      fontFamily: Fonts.sansSerif,
      fontSize: 11,
      color: Colors[colorScheme ?? 'light'].text,
    },
    chevron: {
      position: 'absolute',
      right: 16,
      top: '50%',
      transform: [{ translateY: -12 }], // Half of icon height (24/2)
    },
  });
  return (
    <Link href={`/product/${id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.topContainer}>
            <View style={styles.productInfo}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
              </View>
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">{productName}</Text>
                  <Text style={styles.brandName} numberOfLines={1} ellipsizeMode="tail">{brandName}</Text>
                </View>
                <NutriAndEcoScore nutriScore={nutriScore} ecoScore={ecoScore}></NutriAndEcoScore>
              </View>
            </View>
            {createdDate && <View style={styles.timeContainer}>
              <Clock size={12} color={Colors[colorScheme ?? 'light'].text} />
              <Text style={styles.timeText}>{formatRelativeTime(createdDate)}</Text>
            </View>}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

