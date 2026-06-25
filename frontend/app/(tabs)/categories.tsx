import { MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const colors = {
  amber: '#ffb800',
  brown: '#704200',
  cream: '#fff7ed',
  line: '#e5cfae',
  muted: '#6f6254',
  bg: '#ffffff',
  cardBg: '#fff7ef',
};

const categories = [
  { label: 'Promos', icon: 'fire' as const, count: 142, color: '#cf111b' },
  { label: 'Électronique', icon: 'television-play' as const, count: 328, color: '#1976d2' },
  { label: 'Mode', icon: 'hanger' as const, count: 512, color: '#9c27b0' },
  { label: 'Maison', icon: 'sofa' as const, count: 204, color: '#e65100' },
  { label: 'Beauté', icon: 'face-woman-shimmer' as const, count: 167, color: '#e91e63' },
  { label: 'Bijoux', icon: 'diamond-stone' as const, count: 89, color: '#ffc107' },
  { label: 'Ordinateurs', icon: 'laptop' as const, count: 95, color: '#00796b' },
  { label: 'Bébés', icon: 'baby-face-outline' as const, count: 76, color: '#f06292' },
  { label: 'Sport', icon: 'basketball' as const, count: 213, color: '#43a047' },
  { label: 'Téléphones', icon: 'cellphone' as const, count: 148, color: '#5e35b1' },
  { label: 'Livres & Ebooks', icon: 'book-open-page-variant' as const, count: 391, color: '#6d4c41' },
  { label: 'Auto & Moto', icon: 'car-sports' as const, count: 57, color: '#455a64' },
  { label: 'Rangement', icon: 'archive-outline' as const, count: 44, color: '#fb8c00' },
  { label: 'Services', icon: 'handshake-outline' as const, count: 128, color: '#0288d1' },
  { label: 'Alimentation', icon: 'food-fork-drink' as const, count: 265, color: '#558b2f' },
  { label: 'Jouets', icon: 'toy-brick-outline' as const, count: 99, color: '#d32f2f' },
];

export default function CategoriesScreen() {
  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>Chezroi</Text>
        <TouchableOpacity style={styles.cartButton} activeOpacity={0.7}>
          <MaterialIcons name="shopping-cart" size={18} color={colors.brown} />
          <Text style={styles.cartText}>Panier</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Search bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Feather name="search" size={17} color="#1f1a14" />
            <TextInput
              placeholder="Rechercher une catégorie..."
              placeholderTextColor="#9b876a"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleRow}>
          <MaterialIcons name="grid-view" size={24} color={colors.brown} />
          <Text style={styles.pageTitle}>Toutes les catégories</Text>
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.label} style={styles.card} activeOpacity={0.78}>
              <View style={[styles.iconWrap, { backgroundColor: cat.color + '18' }]}>
                <MaterialCommunityIcons name={cat.icon} size={32} color={cat.color} />
              </View>
              <Text style={styles.cardLabel} numberOfLines={2}>{cat.label}</Text>
              <Text style={styles.cardCount}>{cat.count} articles</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    marginTop: 35,
    alignItems: 'center',
    backgroundColor: colors.cream,
    borderBottomColor: colors.line,
    borderBottomWidth: 2,
    flexDirection: 'row',
    gap: 5,
    height: 56,
    paddingHorizontal: 24,
  },
  brand: {
    color: colors.brown,
    flex: 1,
    fontSize: 22,
    fontWeight: '800',
  },
  cartButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  cartText: {
    color: colors.brown,
    fontSize: 14,
  },
  content: {
    paddingBottom: 34,
  },
  searchSection: {
    backgroundColor: '#fff5ec',
    padding: 16,
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d6b98d',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    height: 48,
    paddingHorizontal: 12,
  },
  searchInput: {
    color: '#241b11',
    flex: 1,
    fontSize: 15,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  pageTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#050505',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 10,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    width: '47%',
    padding: 16,
    gap: 8,
    boxShadow: '0 3px 10px rgba(112, 66, 0, 0.10)',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#15110c',
  },
  cardCount: {
    fontSize: 12,
    color: colors.muted,
  },
});
