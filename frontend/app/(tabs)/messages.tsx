import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const colors = {
  amber: '#ffb800',
  brown: '#704200',
  cream: '#fff7ed',
  line: '#e5cfae',
  muted: '#6f6254',
  bg: '#ffffff',
};

const conversations = [
  {
    id: '1',
    name: 'Boutique TechPro',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBegPS2xszMmoLHMV794gXWsogka9enmFKMPWGDNAg_2hleMeO70TSgDiPduxKhSA-iHDPsv6KfYm-EqoB1u-kfb3ZoeyLAtl_M7qq_ZG0bV2S3r23GFLj_MmU31C1eECKhttivugYBKqaG2D4SrmO59OWHl9b2xU4M25wv9jYmMG288O0Bdb_atrZNJWHiqrOrvfH1L_CMo93YpwABOnQwLNuNIkTeLfiJr565cJcyRosznPkA6eHsUnpy-vZrOoREav3H2sUhyTpm',
    lastMessage: 'Votre commande a été expédiée !',
    time: '10:32',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Mode & Style',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ2yLcuiVkSeJB2Av8N3_mfo2llGyZrSP4m-MlB951SZLrwB9Mbi9JBtMUm_yEvleoqkhFpqaV9IjNcX7Wy7sL4UEZ2AgsPECVKxPLFzA7DkKBgKuQusxbAsZlR1BjTK7cXxlKbu46Py899JAMJFYfDs8lTufjMnDYfgE1VftZgBVoM89tDg_7HUaxwe6Ks44VdkLz3wPCoXxYGdKewl3ZC4dZOiQ3aozbIcjAttMXRM1fDSXSJpU6kkdRYjRHadJkefnOl2vyaDqd',
    lastMessage: 'Merci pour votre achat 😊',
    time: 'Hier',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Électro Maison',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB46_IzbR69V8VtyEW0s9n36rEMZxfXkp1hHRwSS8fHsHL8BVGc4BjvkcSRwGssBUwoSmJNEPMcJ7F4oMdvTlFFvzjsc9c-Uk7ac7eirH0xAVH64TbmA4njuVm-PiekI_qACYN4oXG6WtTXKPBI7U9huVdbgxB6uXarWiOj7dlTN6vKdLu-aqNt6McuHqhPrEjDnkl2lUw7NSHxomW8BRz2ZVYwNpkrHGIPNlJI9pBIitdVJxoZTj777KOfS76oMxNp64yPJ2bFi5K1',
    lastMessage: 'Disponible en stock cette semaine',
    time: 'Lun',
    unread: 1,
    online: true,
  },
  {
    id: '4',
    name: 'Support Chezroi',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBae7-wthUsjUHULtJrGLQ6-5MpcdR1yJW_i_Nzrs1PJU1jXuCxmTAJ59rjyxKeLjZOWKURRCrZ43cOJtmILdPjY1ME4wbkhB4GbrFrPmSHn_NmWyOaFUaDHULX6jcGUS0aFeBJo3A-bxRWX6t1O2B6ydZniWinjU4rFImfCqQ5VxzeV7lXH9m7eEnuwdQRD2oJnHeEg2-3rYvFVyjpEYdemPH_FymmWJDC95hQwX3uxhRmc4GUnjzAdBIo0gLBZhXkGtNrDzWihOZB',
    lastMessage: 'Comment puis-je vous aider ?',
    time: 'Dim',
    unread: 0,
    online: true,
  },
  {
    id: '5',
    name: 'Livres & Savoirs',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmLsXNtf7JZFaAnVlLpVzdK5dyff9JcEEwEv54yvUZgE9vkX0KTcUUPuJ-3jpX4Xzh7MYqK-bhDZpFq1IZnmALgRtbnraqw9p4R2Cn1pAA-BVBljdy4zRFhqcxztGpqIs1iOGUTq9ANRJ3CBqRpvkSkfxpf4vNCbZayLvTvDsAqxhKTO-j_fGa00Iru8TariHCTnEdDCuB9fi7CA_cpkXfUiYIU1bkjU2W0uvDS0EzYFBZB2PXZhb890IzAU3TtrNwheljvKNtsHDp',
    lastMessage: 'Votre ebook est prêt à télécharger',
    time: '28/05',
    unread: 0,
    online: false,
  },
];

export default function MessagesScreen() {
  const totalUnread = conversations.reduce((acc, c) => acc + c.unread, 0);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>Messagerie</Text>
        {totalUnread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalUnread}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.headerAction} activeOpacity={0.7}>
          <MaterialCommunityIcons name="pencil-outline" size={22} color={colors.brown} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={20} color="#9b876a" />
          <TextInput
            placeholder="Rechercher une conversation..."
            placeholderTextColor="#9b876a"
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {conversations.map((conv, index) => (
          <TouchableOpacity key={conv.id} style={styles.convItem} activeOpacity={0.78}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: conv.avatar }} style={styles.avatar} contentFit="cover" />
              {conv.online && <View style={styles.onlineDot} />}
            </View>
            <View style={styles.convBody}>
              <View style={styles.convTop}>
                <Text style={[styles.convName, conv.unread > 0 && styles.convNameBold]}>
                  {conv.name}
                </Text>
                <Text style={styles.convTime}>{conv.time}</Text>
              </View>
              <View style={styles.convBottom}>
                <Text
                  style={[styles.convLast, conv.unread > 0 && styles.convLastBold]}
                  numberOfLines={1}
                >
                  {conv.lastMessage}
                </Text>
                {conv.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{conv.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Empty hint */}
        <View style={styles.hint}>
          <MaterialCommunityIcons name="message-text-outline" size={36} color={colors.line} />
          <Text style={styles.hintText}>Achetez pour démarrer une conversation</Text>
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
    height: 56,
    paddingHorizontal: 24,
    gap: 10,
  },
  brand: {
    color: '#050505',
    flex: 1,
    fontSize: 22,
    fontWeight: '800',
  },
  badge: {
    backgroundColor: '#cf111b',
    borderRadius: 999,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  headerAction: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    backgroundColor: '#fff5ec',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d6b98d',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    height: 44,
    paddingHorizontal: 14,
  },
  searchInput: {
    color: '#241b11',
    flex: 1,
    fontSize: 15,
  },
  convItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomColor: '#f3e8d4',
    borderBottomWidth: 1,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ede0cc',
  },
  onlineDot: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    width: 13,
    height: 13,
    borderRadius: 99,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#fff',
  },
  convBody: {
    flex: 1,
    gap: 4,
  },
  convTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  convName: {
    fontSize: 15,
    color: '#15110c',
    fontWeight: '500',
  },
  convNameBold: {
    fontWeight: '800',
  },
  convTime: {
    fontSize: 12,
    color: colors.muted,
  },
  convBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  convLast: {
    fontSize: 13,
    color: colors.muted,
    flex: 1,
  },
  convLastBold: {
    color: '#15110c',
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: colors.amber,
    borderRadius: 999,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginLeft: 8,
  },
  unreadText: {
    color: '#050505',
    fontSize: 11,
    fontWeight: '800',
  },
  hint: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 40,
  },
  hintText: {
    fontSize: 14,
    color: colors.muted,
  },
});
