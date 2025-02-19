import { View, Text, Image, StyleSheet, useColorScheme, TouchableOpacity, Dimensions } from 'react-native';
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
  touchable?: boolean;
}

export default function ProductItem({
  id,
  imageUrl,
  productName,
  brandName,
  ecoScore,
  nutriScore,
  createdDate,
  touchable = true
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
      maxWidth: Dimensions.get('screen').width - 122,
    },
    brandName: {
      color: Colors[colorScheme ?? 'light'].text,
      fontFamily: Fonts.sansSerif,
      fontSize: 12,
      marginTop: 2,
      opacity: .85,
      maxWidth: Dimensions.get('screen').width - 250,
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
  });
  return (
    <Link href={`/product/${id}`} asChild>
      <TouchableOpacity style={styles.card} disabled={!touchable} >
        <View style={styles.cardContent}>
          <View style={styles.topContainer}>
            <View style={styles.productInfo}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
              </View>
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.brandName} numberOfLines={1} ellipsizeMode="tail">{brandName}</Text>
                  <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">{productName}</Text>
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

