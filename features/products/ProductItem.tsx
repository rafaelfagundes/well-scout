import { View, Text, Image, StyleSheet, useColorScheme, Dimensions, Pressable } from 'react-native';
import NoImage from '@/components/ui/NoImage';
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
  createdDate?: string;
  touchable?: boolean;
  hideRating?: boolean;
}

export default function ProductItem({
  id,
  imageUrl,
  productName,
  brandName,
  ecoScore,
  nutriScore,
  createdDate,
  touchable = true,
  hideRating = false
}: ProductItemProps) {

  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  const imageSize = hideRating ? 36 : 70;

  const styles = StyleSheet.create({
    card: {
      borderRadius: 20,
      backgroundColor: colors.background,
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
      width: imageSize,
      height: imageSize,
      borderRadius: 12,
      overflow: 'hidden',
      marginRight: 10,
      backgroundColor: colors.background,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    infoContainer: {
      justifyContent: 'space-between',
      width: '100%',
      minWidth: Dimensions.get('screen').width - 134,
      maxWidth: Dimensions.get('screen').width - 134,
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
      fontSize: 13,
      marginBottom: 4,
      opacity: .70,
      maxWidth: Dimensions.get('screen').width - 250,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      marginRight: 8,
      marginTop: 1,
    },
    timeText: {
      fontFamily: Fonts.sansSerif,
      fontSize: 11,
      color: colors.text,
      opacity: .70,
    },
  });
  return (
    <Link href={`/product/${id}`} asChild>
      <Pressable style={styles.card} disabled={!touchable} >
        <View style={styles.cardContent}>
          <View style={styles.topContainer}>
            <View style={styles.productInfo}>
              <View style={styles.imageContainer}>
                {imageUrl ? (
                  <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
                ) : (
                  <NoImage imageSize={imageSize} />
                )}
              </View>
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.brandName} numberOfLines={1} ellipsizeMode="tail">{brandName}</Text>
                  <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">{productName}</Text>
                </View>
                {!hideRating && <NutriAndEcoScore nutriScore={nutriScore} ecoScore={ecoScore}></NutriAndEcoScore>}
              </View>
            </View>
            {createdDate && <View style={styles.timeContainer}>
              <Clock size={12} color={Colors[colorScheme ?? 'light'].text} />
              <Text style={styles.timeText}>{formatRelativeTime(new Date(createdDate))}</Text>
            </View>}
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

