import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowUp, Clock } from 'phosphor-react-native';

export default function ProductRating() {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.topContainer}>
          <View style={styles.productInfo}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1528750596806-ff12e21cda04?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.productName}>Ketchup</Text>
              <Text style={styles.brandName}>Heinz</Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Clock size={16} color="#6b7280" />
            <Text style={styles.timeText}>4 hours ago</Text>
          </View>
        </View>

        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={['#991b1b', '#ef4444', '#facc15', '#4ade80', '#166534']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <View style={styles.ratingLabel}>
            <ArrowUp size={16} color="#6b7280" />
            <Text style={styles.ratingText}>Bad</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: 672,
    margin: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    padding: 24,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
  },
  productInfo: {
    flexDirection: 'row',
    gap: 24,
    flex: 1,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#8B2323',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    gap: 4,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  brandName: {
    fontSize: 20,
    color: '#6b7280',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#6b7280',
  },
  gradientContainer: {
    marginTop: 24,
    gap: 8,
  },
  gradient: {
    height: 8,
    width: '100%',
    borderRadius: 9999,
  },
  ratingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6b7280',
  },
  chevron: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }], // Half of icon height (24/2)
  },
});
