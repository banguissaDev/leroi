import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const colors = {
  amber: "#ffb800",
  brown: "#704200",
  cream: "#fff7ed",
  line: "#e5cfae",
  muted: "#6f6254",
  red: "#cf111b",
};

const categories = [
  { label: "Promos", icon: "fire" as const },
  { label: "Électro", icon: "washing-machine" as const },
  { label: "Mode", icon: "hanger" as const },
  { label: "Maison", icon: "sofa" as const },
  { label: "Beauté", icon: "face-woman-shimmer" as const },
  { label: "Bijoux", icon: "diamond-stone" as const },
  { label: "Ordinateurs", icon: "laptop" as const },
  { label: "Bébés", icon: "baby-face-outline" as const },
  { label: "Sport", icon: "basketball" as const },
  { label: "Téléphones", icon: "cellphone" as const },
  { label: "Livres", icon: "book-open-page-variant" as const },
  { label: "Auto Moto", icon: "car-sports" as const },
  { label: "Rangement", icon: "archive-outline" as const },
  { label: "Services", icon: "handshake-outline" as const },
];

const flashSales = [
  {
    discount: "-40%",
    title: "Casque sans fil premium à réduction active",
    rating: "4.8 (120)",
    price: "€149.99",
    oldPrice: "€249.99",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB46_IzbR69V8VtyEW0s9n36rEMZxfXkp1hHRwSS8fHsHL8BVGc4BjvkcSRwGssBUwoSmJNEPMcJ7F4oMdvTlFFvzjsc9c-Uk7ac7eirH0xAVH64TbmA4njuVm-PiekI_qACYN4oXG6WtTXKPBI7U9huVdbgxB6uXarWiOj7dlTN6vKdLu-aqNt6McuHqhPrEjDnkl2lUw7NSHxomW8BRz2ZVYwNpkrHGIPNlJI9pBIitdVJxoZTj777KOfS76oMxNp64yPJ2bFi5K1",
  },
  {
    discount: "-25%",
    title: "Montre connectée minimaliste Series X",
    rating: "4.6 (85)",
    price: "€199.00",
    oldPrice: "€265.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ2yLcuiVkSeJB2Av8N3_mfo2llGyZrSP4m-MlB951SZLrwB9Mbi9JBtMUm_yEvleoqkhFpqaV9IjNcX7Wy7sL4UEZ2AgsPECVKxPLFzA7DkKBgKuQusxbAsZlR1BjTK7cXxlKbu46Py899JAMJFYfDs8lTufjMnDYfgE1VftZgBVoM89tDg_7HUaxwe6Ks44VdkLz3wPCoXxYGdKewl3ZC4dZOiQ3aozbIcjAttMXRM1fDSXSJpU6kkdRYjRHadJkefnOl2vyaDqd",
  },
  {
    discount: "-15%",
    title: "Chaussures de course légères orange",
    rating: "4.9 (64)",
    price: "€89.99",
    oldPrice: "€105.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBegPS2xszMmoLHMV794gXWsogka9enmFKMPWGDNAg_2hleMeO70TSgDiPduxKhSA-iHDPsv6KfYm-EqoB1u-kfb3ZoeyLAtl_M7qq_ZG0bV2S3r23GFLj_MmU31C1eECKhttivugYBKqaG2D4SrmO59OWHl9b2xU4M25wv9jYmMG288O0Bdb_atrZNJWHiqrOrvfH1L_CMo93YpwABOnQwLNuNIkTeLfiJr565cJcyRosznPkA6eHsUnpy-vZrOoREav3H2sUhyTpm",
  },
];

const recommended = [
  {
    title: "Montre mécanique classique en cuir",
    price: "€320.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBae7-wthUsjUHULtJrGLQ6-5MpcdR1yJW_i_Nzrs1PJU1jXuCxmTAJ59rjyxKeLjZOWKURRCrZ43cOJtmILdPjY1ME4wbkhB4GbrFrPmSHn_NmWyOaFUaDHULX6jcGUS0aFeBJo3A-bxRWX6t1O2B6ydZniWinjU4rFImfCqQ5VxzeV7lXH9m7eEnuwdQRD2oJnHeEg2-3rYvFVyjpEYdemPH_FymmWJDC95hQwX3uxhRmc4GUnjzAdBIo0gLBZhXkGtNrDzWihOZB",
  },
  {
    title: "L'art du design moderne (Ebook)",
    price: "€14.99",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmLsXNtf7JZFaAnVlLpVzdK5dyff9JcEEwEv54yvUZgE9vkX0KTcUUPuJ-3jpX4Xzh7MYqK-bhDZpFq1IZnmALgRtbnraqw9p4R2Cn1pAA-BVBljdy4zRFhqcxztGpqIs1iOGUTq9ANRJ3CBqRpvkSkfxpf4vNCbZayLvTvDsAqxhKTO-j_fGa00Iru8TariHCTnEdDCuB9fi7CA_cpkXfUiYIU1bkjU2W0uvDS0EzYFBZB2PXZhb890IzAU3TtrNwheljvKNtsHDp",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
          <Feather name="menu" size={25} color="#17120b" />
        </TouchableOpacity>
        <Text style={styles.brand}>Chezroi</Text>
        <TouchableOpacity style={styles.cartButton} activeOpacity={0.7}>
          <MaterialIcons name="shopping-cart" size={18} color={colors.brown} />
          <Text style={styles.cartText}>Panier</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Feather name="search" size={17} color="#1f1a14" />
            <TextInput
              placeholder="Rechercher sur Chezroi..."
              placeholderTextColor="#332c22"
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={styles.heroCard}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0thyDzoYlfKsv9xKbh2Y3oFLsMYQsXPcrVv-bQO4nolGJ3oYdZD8kZZu55wDppJHM6GDjU0JLRrdMn8sEONX34Eow_p_vZI2OQgif9Ly2IIEjJtXkgPLK3XEXr9BRhP2ULuzN1rI38XASVjtYBVlmfiSvYnRDwmmVv2rpZihuIzwoHWjWJyDFxDLDxa_3fcefALsmdTCJJu4JkK_1WNjds1JBVLcRHlej0prR39PhoSFfO-72RtXar4v_Ydr1yku5PG2rkeH-_TQO",
            }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          <View style={styles.heroShade} />
          <View style={styles.heroContent}>
            <Text style={styles.heroBadge}>DURÉE LIMITÉE</Text>
            <Text style={styles.heroTitle}>{"Soldes d'été"}</Text>
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.85}>
              <Text style={styles.heroButtonText}>Acheter</Text>
              <Feather name="arrow-right" size={18} color="#050505" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.label}
              style={styles.categoryItem}
              activeOpacity={0.75}
            >
              <View style={styles.categoryCircle}>
                <MaterialCommunityIcons
                  name={category.icon}
                  size={31}
                  color="#8a5b08"
                />
              </View>
              <Text style={styles.categoryLabel} numberOfLines={2}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionTitleRow}>
          <View style={styles.titleWithIcon}>
            <MaterialIcons name="bolt" size={28} color={colors.red} />
            <Text style={styles.sectionTitle}>Ventes Flash</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flashRow}
        >
          {flashSales.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={styles.productCard}
              activeOpacity={0.86}
            >
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                contentFit="cover"
              />
              <View style={styles.productBody}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.ratingRow}>
                  <MaterialIcons name="star-border" size={16} color="#9a6200" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <View style={styles.priceRow}>
                  <View>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons
                      name="add-shopping-cart"
                      size={20}
                      color="#111111"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.recommendTitle}>Recommandé pour vous</Text>

        <TouchableOpacity style={styles.collectionCard} activeOpacity={0.9}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDQYACTieymdyMa0Z1mAbgt4r7z_DQo0zGCjyP8gQDxhysk9W2ue3FPsHe0ghVit4EJbXIFSBhOfX2KFytlYQeaJMczrjnIw-yaFfuc_qm-a6GXH-PfAyeNwkMiXEl6uBouxGC_hOZ-IHBRA1BK4x4AkZ1KHxUIjYpSWUN9Op4fmUeIppwMFq475QsQ7ECikcyl9eukPrjcF4SzfxGwvrekdsXj6TobENu2rEbpoY43OjW_ZbjNgwpTnqRMZiPkgHmtZhto9cgXuCw",
            }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          <View style={styles.collectionShade} />
          <View style={styles.collectionCopy}>
            <Text style={styles.collectionBadge}>NOUVEAUTÉ</Text>
            <Text style={styles.collectionTitle}>
              Collection de meubles minimalistes modernes
            </Text>
            <View style={styles.collectionButton}>
              <Text style={styles.collectionButtonText}>
                Voir la collection
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.recommendGrid}>
          {recommended.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={styles.recommendCard}
              activeOpacity={0.86}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.recommendImage}
                contentFit="cover"
              />
              <Text style={styles.recommendProductTitle}>{item.title}</Text>
              <View style={styles.recommendFooter}>
                <Text style={styles.recommendPrice}>{item.price}</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Feather name="heart" size={24} color="#1f1407" />
                </TouchableOpacity>
              </View>
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
    backgroundColor: "#ffffff",
  },
  header: {
    marginTop: 35,
    alignItems: "center",
    backgroundColor: colors.cream,
    borderBottomColor: colors.line,
    borderBottomWidth: 2,
    flexDirection: "row",
    gap: 5,
    height: 56,
    paddingHorizontal: 24,
  },
  headerIcon: {
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  brand: {
    color: colors.brown,
    flex: 1,
    fontSize: 22,
    fontWeight: "800",
  },
  cartText: {
    color: colors.brown,
    fontSize: 14,
  },
  cartButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  content: {
    paddingBottom: 34,
  },
  searchSection: {
    backgroundColor: "#fff5ec",
    padding: 16,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#d6b98d",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    height: 48,
    paddingHorizontal: 12,
  },
  searchInput: {
    color: "#241b11",
    flex: 1,
    fontSize: 15,
  },
  heroCard: {
    height: 160,
    marginHorizontal: 16,
    marginTop: -1,
    overflow: "hidden",
    borderRadius: 9,
    backgroundColor: "#07101a",
    boxShadow: "0 3px 9px rgba(0, 0, 0, 0.25)",
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  heroContent: {
    gap: 13,
    paddingHorizontal: 24,
    paddingTop: 0,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.red,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0,
  },
  heroButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.amber,
    borderRadius: 7,
    flexDirection: "row",
    gap: 12,
    height: 49,
    paddingHorizontal: 24,
  },
  heroButtonText: {
    color: "#050505",
    fontSize: 14,
    fontWeight: "800",
  },
  categoryRow: {
    gap: 24,
    paddingHorizontal: 20,
    paddingVertical: 31,
  },
  categoryItem: {
    alignItems: "center",
    gap: 8,
    width: 64,
  },
  categoryCircle: {
    alignItems: "center",
    backgroundColor: "#fdf0dd",
    borderRadius: 999,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  categoryLabel: {
    color: "#050505",
    fontSize: 12,
  },
  sectionTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  titleWithIcon: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  sectionTitle: {
    color: "#050505",
    fontSize: 23,
    fontWeight: "900",
  },
  seeAll: {
    color: colors.brown,
    fontSize: 13,
  },
  flashRow: {
    gap: 12,
    paddingHorizontal: 0,
    paddingTop: 17,
    paddingBottom: 44,
  },
  productCard: {
    backgroundColor: "#fff7ef",
    borderRadius: 12,
    overflow: "hidden",
    width: 160,
    boxShadow: "0 5px 14px rgba(112, 66, 0, 0.14)",
  },
  discountBadge: {
    backgroundColor: colors.red,
    borderRadius: 4,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    position: "absolute",
    top: 7,
    zIndex: 2,
  },
  discountText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
  },
  productImage: {
    backgroundColor: "#efe6dc",
    height: 160,
    width: "100%",
  },
  productBody: {
    gap: 6,
    padding: 12,
  },
  productTitle: {
    color: "#15110c",
    fontSize: 15,
    lineHeight: 21,
  },
  ratingRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  ratingText: {
    color: "#6d6257",
    fontSize: 12,
  },
  priceRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  price: {
    color: colors.brown,
    fontSize: 16,
    fontWeight: "900",
  },
  oldPrice: {
    color: "#5f554a",
    fontSize: 11,
    marginTop: 4,
    textDecorationLine: "line-through",
  },
  addButton: {
    alignItems: "center",
    backgroundColor: colors.amber,
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  recommendTitle: {
    color: "#050505",
    fontSize: 22,
    fontWeight: "900",
    paddingHorizontal: 16,
    paddingBottom: 18,
  },
  collectionCard: {
    height: 280,
    marginHorizontal: 16,
    overflow: "hidden",
    borderRadius: 13,
    backgroundColor: "#2e2a25",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
  },
  collectionShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.38)",
  },
  collectionCopy: {
    bottom: 24,
    left: 24,
    position: "absolute",
    right: 20,
  },
  collectionBadge: {
    color: "#ffd578",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
  },
  collectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 26,
    marginBottom: 16,
    maxWidth: 280,
  },
  collectionButton: {
    alignSelf: "flex-start",
    borderColor: "rgba(255, 255, 255, 0.55)",
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 11,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  collectionButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  recommendGrid: {
    flexDirection: "row",
    gap: 13,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  recommendCard: {
    backgroundColor: "#fff7ef",
    borderRadius: 12,
    flex: 1,
    gap: 14,
    padding: 12,
    minHeight: 278,
    boxShadow: "0 5px 14px rgba(112, 66, 0, 0.12)",
  },
  recommendImage: {
    borderRadius: 9,
    height: 140,
    width: "100%",
    backgroundColor: "#efe6dc",
  },
  recommendProductTitle: {
    color: "#15110c",
    fontSize: 15,
    lineHeight: 21,
    minHeight: 47,
  },
  recommendFooter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  recommendPrice: {
    color: colors.brown,
    fontSize: 16,
    fontWeight: "900",
  },
});
