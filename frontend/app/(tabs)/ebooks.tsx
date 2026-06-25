import { MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
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

const genres = ['Tous', 'Business', 'Développement perso', 'Fiction', 'Science', 'Histoire', 'Tech'];

const ebooks = [
  {
    title: "L'art du design moderne",
    author: 'Sophie Laurent',
    genre: 'Design',
    price: '€14.99',
    rating: '4.8',
    pages: '320',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmLsXNtf7JZFaAnVlLpVzdK5dyff9JcEEwEv54yvUZgE9vkX0KTcUUPuJ-3jpX4Xzh7MYqK-bhDZpFq1IZnmALgRtbnraqw9p4R2Cn1pAA-BVBljdy4zRFhqcxztGpqIs1iOGUTq9ANRJ3CBqRpvkSkfxpf4vNCbZayLvTvDsAqxhKTO-j_fGa00Iru8TariHCTnEdDCuB9fi7CA_cpkXfUiYIU1bkjU2W0uvDS0EzYFBZB2PXZhb890IzAU3TtrNwheljvKNtsHDp',
  },
  {
    title: 'Maîtrisez votre argent',
    author: 'Marc Dupont',
    genre: 'Finance',
    price: '€11.99',
    rating: '4.6',
    pages: '248',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBae7-wthUsjUHULtJrGLQ6-5MpcdR1yJW_i_Nzrs1PJU1jXuCxmTAJ59rjyxKeLjZOWKURRCrZ43cOJtmILdPjY1ME4wbkhB4GbrFrPmSHn_NmWyOaFUaDHULX6jcGUS0aFeBJo3A-bxRWX6t1O2B6ydZniWinjU4rFImfCqQ5VxzeV7lXH9m7eEnuwdQRD2oJnHeEg2-3rYvFVyjpEYdemPH_FymmWJDC95hQwX3uxhRmc4GUnjzAdBIo0gLBZhXkGtNrDzWihOZB',
  },
  {
    title: 'Développement web avancé',
    author: 'Julien Martin',
    genre: 'Tech',
    price: '€18.50',
    rating: '4.9',
    pages: '512',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ2yLcuiVkSeJB2Av8N3_mfo2llGyZrSP4m-MlB951SZLrwB9Mbi9JBtMUm_yEvleoqkhFpqaV9IjNcX7Wy7sL4UEZ2AgsPECVKxPLFzA7DkKBgKuQusxbAsZlR1BjTK7cXxlKbu46Py899JAMJFYfDs8lTufjMnDYfgE1VftZgBVoM89tDg_7HUaxwe6Ks44VdkLz3wPCoXxYGdKewl3ZC4dZOiQ3aozbIcjAttMXRM1fDSXSJpU6kkdRYjRHadJkefnOl2vyaDqd',
  },
  {
    title: 'Mindfulness au quotidien',
    author: 'Amina Chérif',
    genre: 'Développement perso',
    price: '€9.99',
    rating: '4.7',
    pages: '196',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB46_IzbR69V8VtyEW0s9n36rEMZxfXkp1hHRwSS8fHsHL8BVGc4BjvkcSRwGssBUwoSmJNEPMcJ7F4oMdvTlFFvzjsc9c-Uk7ac7eirH0xAVH64TbmA4njuVm-PiekI_qACYN4oXG6WtTXKPBI7U9huVdbgxB6uXarWiOj7dlTN6vKdLu-aqNt6McuHqhPrEjDnkl2lUw7NSHxomW8BRz2ZVYwNpkrHGIPNlJI9pBIitdVJxoZTj777KOfS76oMxNp64yPJ2bFi5K1',
  },
];

export default function EbooksScreen() {
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
        {/* Search */}
        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Feather name="search" size={17} color="#1f1a14" />
            <TextInput
              placeholder="Rechercher un ebook..."
              placeholderTextColor="#9b876a"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <MaterialCommunityIcons name="book-open-page-variant" size={48} color={colors.amber} />
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Bibliothèque numérique</Text>
            <Text style={styles.bannerSub}>+500 ebooks disponibles en téléchargement instantané</Text>
          </View>
        </View>

        {/* Genres filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreRow}
        >
          {genres.map((g, i) => (
            <TouchableOpacity key={g} style={[styles.genreChip, i === 0 && styles.genreActive]} activeOpacity={0.75}>
              <Text style={[styles.genreText, i === 0 && styles.genreTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section title */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Populaires</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {/* Ebook cards */}
        {ebooks.map((book) => (
          <TouchableOpacity key={book.title} style={styles.bookCard} activeOpacity={0.85}>
            <Image source={{ uri: book.image }} style={styles.bookCover} contentFit="cover" />
            <View style={styles.bookInfo}>
              <Text style={styles.bookGenre}>{book.genre}</Text>
              <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
              <View style={styles.bookMeta}>
                <View style={styles.ratingWrap}>
                  <MaterialIcons name="star" size={14} color={colors.amber} />
                  <Text style={styles.ratingText}>{book.rating}</Text>
                </View>
                <Text style={styles.pagesText}>{book.pages} pages</Text>
              </View>
              <View style={styles.bookFooter}>
                <Text style={styles.bookPrice}>{book.price}</Text>
                <TouchableOpacity style={styles.buyBtn} activeOpacity={0.8}>
                  <Text style={styles.buyBtnText}>Acheter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#1a0e00',
    marginHorizontal: 16,
    marginTop: 4,
    borderRadius: 14,
    padding: 20,
  },
  bannerText: {
    flex: 1,
    gap: 4,
  },
  bannerTitle: {
    color: colors.amber,
    fontSize: 17,
    fontWeight: '900',
  },
  bannerSub: {
    color: '#c9a87a',
    fontSize: 13,
    lineHeight: 18,
  },
  genreRow: {
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  genreChip: {
    borderColor: colors.line,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#fffaf4',
  },
  genreActive: {
    backgroundColor: colors.amber,
    borderColor: colors.amber,
  },
  genreText: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: '600',
  },
  genreTextActive: {
    color: '#050505',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#050505',
  },
  seeAll: {
    color: colors.brown,
    fontSize: 13,
  },
  bookCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 3px 10px rgba(112, 66, 0, 0.12)',
  },
  bookCover: {
    width: 100,
    height: 140,
    backgroundColor: '#ede0cc',
  },
  bookInfo: {
    flex: 1,
    padding: 14,
    gap: 5,
  },
  bookGenre: {
    fontSize: 11,
    color: colors.brown,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#15110c',
    lineHeight: 21,
  },
  bookAuthor: {
    fontSize: 13,
    color: colors.muted,
  },
  bookMeta: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    color: '#6d6257',
  },
  pagesText: {
    fontSize: 12,
    color: '#6d6257',
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  bookPrice: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.brown,
  },
  buyBtn: {
    backgroundColor: colors.amber,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buyBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#050505',
  },
});
