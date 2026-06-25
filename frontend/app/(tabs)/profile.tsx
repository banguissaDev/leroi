import { MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

const colors = {
  amber: '#ffb800',
  brown: '#704200',
  cream: '#fff7ed',
  line: '#e5cfae',
  muted: '#6f6254',
  bg: '#ffffff',
  cardBg: '#fff7ef',
};

const menuItems = [
  { icon: 'store-outline' as const, label: 'Ouvrir ma boutique', count: 'Devenir vendeur', route: '/vendor/register' },
  { icon: 'package-variant-closed' as const, label: 'Mes commandes', count: '3 en cours', route: '' },
  { icon: 'heart-outline' as const, label: 'Mes favoris', count: '12 articles', route: '' },
  { icon: 'map-marker-outline' as const, label: 'Mes adresses', count: '2 enregistrées', route: '' },
  { icon: 'credit-card-outline' as const, label: 'Paiement', count: 'Visa •••• 4242', route: '' },
  { icon: 'star-outline' as const, label: 'Mes avis', count: '8 publiés', route: '' },
  { icon: 'book-open-outline' as const, label: 'Mes ebooks', count: '4 achetés', route: '' },
  { icon: 'bell-outline' as const, label: 'Notifications', count: '2 nouvelles', route: '' },
  { icon: 'shield-check-outline' as const, label: 'Sécurité', count: '', route: '' },
  { icon: 'help-circle-outline' as const, label: 'Aide & Support', count: '', route: '' },
];

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>Mon Profil</Text>
        <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.7}>
          <Feather name="settings" size={22} color={colors.brown} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrap}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBae7-wthUsjUHULtJrGLQ6-5MpcdR1yJW_i_Nzrs1PJU1jXuCxmTAJ59rjyxKeLjZOWKURRCrZ43cOJtmILdPjY1ME4wbkhB4GbrFrPmSHn_NmWyOaFUaDHULX6jcGUS0aFeBJo3A-bxRWX6t1O2B6ydZniWinjU4rFImfCqQ5VxzeV7lXH9m7eEnuwdQRD2oJnHeEg2-3rYvFVyjpEYdemPH_FymmWJDC95hQwX3uxhRmc4GUnjzAdBIo0gLBZhXkGtNrDzWihOZB',
                }}
                style={styles.avatar}
                contentFit="cover"
              />
              <TouchableOpacity style={styles.editAvatar} activeOpacity={0.8}>
                <MaterialCommunityIcons name="camera" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Jean-Baptiste Koné</Text>
              <Text style={styles.profileEmail}>jb.kone@email.com</Text>
              <View style={styles.memberBadge}>
                <MaterialCommunityIcons name="crown" size={14} color={colors.amber} />
                <Text style={styles.memberText}>Membre Premium</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileBtn} activeOpacity={0.8}>
            <Text style={styles.editProfileText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Commandes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Favoris</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Avis</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Ebooks</Text>
          </View>
        </View>

        {/* Promo banner */}
        <View style={styles.promoBanner}>
          <MaterialCommunityIcons name="ticket-percent-outline" size={32} color={colors.amber} />
          <View style={styles.promoText}>
            <Text style={styles.promoTitle}>Parrainez un ami</Text>
            <Text style={styles.promoSub}>Gagnez 10€ de réduction sur votre prochaine commande</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.amber} />
        </View>

        {/* Menu */}
        <Text style={styles.sectionTitle}>Mon compte</Text>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            activeOpacity={0.75}
            onPress={() => {
              if (item.route) {
                router.push(item.route as any);
              }
            }}
          >
            <View style={styles.menuIconWrap}>
              <MaterialCommunityIcons name={item.icon} size={22} color={colors.brown} />
            </View>
            <View style={styles.menuBody}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.count !== '' && <Text style={styles.menuCount}>{item.count}</Text>}
            </View>
            <MaterialIcons name="chevron-right" size={22} color={colors.line} />
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <MaterialCommunityIcons name="logout" size={20} color="#cf111b" />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Chezroi v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f1e8',
  },
  header: {
    marginTop: 35,
    alignItems: 'center',
    backgroundColor: colors.cream,
    borderBottomColor: colors.line,
    borderBottomWidth: 2,
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: 24,
  },
  brand: {
    color: '#050505',
    flex: 1,
    fontSize: 22,
    fontWeight: '800',
  },
  settingsBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: colors.bg,
    margin: 16,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    boxShadow: '0 3px 10px rgba(112, 66, 0, 0.10)',
  },
  avatarSection: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ede0cc',
    borderWidth: 3,
    borderColor: colors.amber,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.brown,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#15110c',
  },
  profileEmail: {
    fontSize: 13,
    color: colors.muted,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  memberText: {
    fontSize: 12,
    color: colors.amber,
    fontWeight: '700',
  },
  editProfileBtn: {
    backgroundColor: colors.amber,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#050505',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0 3px 10px rgba(112, 66, 0, 0.10)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.brown,
  },
  statLabel: {
    fontSize: 12,
    color: colors.muted,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.line,
    marginVertical: 4,
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1a0e00',
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  promoText: {
    flex: 1,
    gap: 3,
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.amber,
  },
  promoSub: {
    fontSize: 12,
    color: '#c9a87a',
    lineHeight: 17,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.muted,
    paddingHorizontal: 20,
    paddingBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomColor: '#f3e8d4',
    borderBottomWidth: 1,
  },
  menuIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#fff5e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBody: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#15110c',
  },
  menuCount: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#f8d3d5',
    backgroundColor: '#fff5f5',
  },
  logoutText: {
    color: '#cf111b',
    fontSize: 15,
    fontWeight: '700',
  },
  version: {
    textAlign: 'center',
    color: colors.muted,
    fontSize: 12,
    marginTop: 16,
  },
});
