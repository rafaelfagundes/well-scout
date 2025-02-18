import { View, Text, Image, StyleSheet } from 'react-native';
import { Clock } from 'phosphor-react-native';
import { Fonts } from '@/constants/Fonts';
import NutriAndEcoScore from './NutriAndEcoScore';
import { formatRelativeTime } from '@/lib/formatRelativeTime';

interface ProductItemProps {
  id: string;
  imageUrl: string;
  productName: string;
  brandName: string;
  ecoScore: string;
  nutriScore: string;
  createdDate: Date;
}

export default function ProductItem({
  imageUrl,
  productName,
  brandName,
  ecoScore,
  nutriScore,
  createdDate,
}: ProductItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.topContainer}>
          <View style={styles.productInfo}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.productName}>{productName}</Text>
                <Text style={styles.brandName}>{brandName}</Text>
              </View>
              <NutriAndEcoScore nutriScore={nutriScore} ecoScore={ecoScore}></NutriAndEcoScore>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Clock size={12} color="#6b7280" />
            <Text style={styles.timeText}>{formatRelativeTime(createdDate)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
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
    borderRadius: 16,
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
    fontFamily: Fonts.sansSerif,
    fontSize: 15,
    fontWeight: '700',
  },
  brandName: {
    fontFamily: Fonts.sansSerif,
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 10,
    marginTop: 3,
  },
  timeText: {
    fontFamily: Fonts.sansSerif,
    fontSize: 11,
    color: '#6b7280',
  },
  chevron: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }], // Half of icon height (24/2)
  },
});
