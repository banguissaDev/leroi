import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ENDPOINTS } from '../../constants/api';

const colors = {
  amber: '#ffb800',
  brown: '#704200',
  cream: '#fff7ed',
  line: '#e5cfae',
  muted: '#6f6254',
  bg: '#ffffff',
  success: '#22c55e',
  error: '#ef4444',
};

type Tab = 'pending' | 'approved' | 'rejected';

type Vendor = {
  id: string;
  shopName: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  category: string;
  description: string;
  status: Tab;
  rejectReason?: string;
  createdAt: string;
  documents?: { type: string; filename: string }[];
};

export default function AdminScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('pending');
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await fetch(ENDPOINTS.adminVendors);
      const data = await res.json();
      setVendors(data);
    } catch {
      Alert.alert('Erreur', 'Impossible de charger les demandes. Vérifiez la connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVendors(); }, []);

  const handleApprove = async (id: string) => {
    Alert.alert(
      'Approuver la boutique',
      'Cette boutique sera immédiatement visible sur l\'application.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Approuver',
          onPress: async () => {
            setActionLoading(id);
            try {
              await fetch(ENDPOINTS.adminApprove(id), { method: 'PATCH' });
              setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' } : v));
              Alert.alert('✅ Approuvé', 'La boutique est maintenant visible sur Chezroi.');
            } catch {
              Alert.alert('Erreur', 'Impossible d\'approuver. Réessayez.');
            } finally {
              setActionLoading(null);
            }
          },
        },
      ]
    );
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    if (!rejectReason.trim()) {
      Alert.alert('Motif requis', 'Veuillez indiquer la raison du rejet.');
      return;
    }
    setActionLoading(rejectModal);
    try {
      await fetch(ENDPOINTS.adminReject(rejectModal), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rejectReason }),
      });
      setVendors(prev => prev.map(v =>
        v.id === rejectModal ? { ...v, status: 'rejected', rejectReason: rejectReason } : v
      ));
      setRejectModal(null);
      setRejectReason('');
      Alert.alert('❌ Rejeté', 'Le fournisseur a été notifié du rejet.');
    } catch {
      Alert.alert('Erreur', 'Impossible de rejeter. Réessayez.');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = vendors.filter(v => v.status === activeTab);

  const tabs: { key: Tab; label: string; color: string }[] = [
    { key: 'pending', label: 'En attente', color: colors.amber },
    { key: 'approved', label: 'Approuvés', color: colors.success },
    { key: 'rejected', label: 'Rejetés', color: colors.error },
  ];

  const counts = {
    pending: vendors.filter(v => v.status === 'pending').length,
    approved: vendors.filter(v => v.status === 'approved').length,
    rejected: vendors.filter(v => v.status === 'rejected').length,
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#15110c" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Administration</Text>
          <Text style={styles.headerSub}>Gestion des boutiques</Text>
        </View>
        <TouchableOpacity style={styles.refreshBtn} onPress={fetchVendors} activeOpacity={0.7}>
          <MaterialCommunityIcons name="refresh" size={22} color={colors.brown} />
        </TouchableOpacity>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        {tabs.map(t => (
          <View key={t.key} style={styles.statItem}>
            <Text style={[styles.statNum, { color: t.color }]}>{counts[t.key]}</Text>
            <Text style={styles.statLabel}>{t.label}</Text>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {tabs.map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, activeTab === t.key && { borderBottomColor: t.color, borderBottomWidth: 2.5 }]}
            onPress={() => setActiveTab(t.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === t.key && { color: t.color, fontWeight: '800' }]}>
              {t.label}
              {counts[t.key] > 0 && (
                <Text style={[styles.tabBadge, { color: t.color }]}>  {counts[t.key]}</Text>
              )}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={colors.amber} />
          <Text style={styles.loadingText}>Chargement des demandes...</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.emptyWrap}>
          <MaterialCommunityIcons name="inbox-outline" size={56} color={colors.line} />
          <Text style={styles.emptyTitle}>Aucune demande {tabs.find(t => t.key === activeTab)?.label.toLowerCase()}</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {filtered.map(vendor => (
            <View key={vendor.id} style={styles.vendorCard}>
              {/* Card header */}
              <View style={styles.cardHeader}>
                <View style={styles.shopAvatar}>
                  <MaterialCommunityIcons name="store" size={26} color={colors.brown} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.shopName}>{vendor.shopName}</Text>
                  <Text style={styles.shopCategory}>{vendor.category}</Text>
                  <Text style={styles.shopDate}>
                    {new Date(vendor.createdAt).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedVendor(vendor)} activeOpacity={0.7}>
                  <MaterialIcons name="info-outline" size={22} color={colors.muted} />
                </TouchableOpacity>
              </View>

              {/* Gérant info */}
              <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="account-outline" size={16} color={colors.muted} />
                  <Text style={styles.infoText}>{vendor.fullName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="email-outline" size={16} color={colors.muted} />
                  <Text style={styles.infoText}>{vendor.email}</Text>
                </View>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="phone-outline" size={16} color={colors.muted} />
                  <Text style={styles.infoText}>{vendor.phone} — {vendor.city}</Text>
                </View>
                {vendor.documents && vendor.documents.length > 0 && (
                  <View style={styles.docsRow}>
                    {vendor.documents.map((doc, i) => (
                      <View key={i} style={styles.docChip}>
                        <MaterialCommunityIcons name="file-document-outline" size={14} color={colors.brown} />
                        <Text style={styles.docChipText}>{doc.type}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>

              {/* Reject reason if rejected */}
              {vendor.status === 'rejected' && vendor.rejectReason && (
                <View style={styles.rejectReasonBox}>
                  <Text style={styles.rejectReasonLabel}>Motif du rejet :</Text>
                  <Text style={styles.rejectReasonText}>{vendor.rejectReason}</Text>
                </View>
              )}

              {/* Actions */}
              {activeTab === 'pending' && (
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={[styles.rejectBtn, actionLoading === vendor.id && styles.btnDisabled]}
                    onPress={() => setRejectModal(vendor.id)}
                    disabled={actionLoading === vendor.id}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons name="close" size={18} color={colors.error} />
                    <Text style={styles.rejectBtnText}>Rejeter</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.approveBtn, actionLoading === vendor.id && styles.btnDisabled]}
                    onPress={() => handleApprove(vendor.id)}
                    disabled={actionLoading === vendor.id}
                    activeOpacity={0.85}
                  >
                    {actionLoading === vendor.id ? (
                      <ActivityIndicator size="small" color="#050505" />
                    ) : (
                      <>
                        <MaterialIcons name="check" size={18} color="#050505" />
                        <Text style={styles.approveBtnText}>Approuver</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              )}

              {activeTab === 'approved' && (
                <View style={styles.approvedBadge}>
                  <MaterialIcons name="check-circle" size={16} color={colors.success} />
                  <Text style={styles.approvedBadgeText}>Boutique active et visible</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}

      {/* Reject modal */}
      <Modal visible={rejectModal !== null} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Motif du rejet</Text>
            <Text style={styles.modalSub}>Expliquez pourquoi cette boutique n'est pas approuvée. Le fournisseur recevra ce message.</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="ex: Documents illisibles, registre de commerce expiré..."
              placeholderTextColor="#bba88a"
              value={rejectReason}
              onChangeText={setRejectReason}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => { setRejectModal(null); setRejectReason(''); }}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalConfirm, actionLoading !== null && styles.btnDisabled]}
                onPress={handleReject}
                disabled={actionLoading !== null}
                activeOpacity={0.85}
              >
                {actionLoading !== null ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.modalConfirmText}>Confirmer le rejet</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Detail modal */}
      <Modal visible={selectedVendor !== null} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { maxHeight: '75%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedVendor?.shopName}</Text>
              <TouchableOpacity onPress={() => setSelectedVendor(null)}>
                <MaterialIcons name="close" size={24} color={colors.muted} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.detailSection}>Description</Text>
              <Text style={styles.detailText}>{selectedVendor?.description}</Text>
              <Text style={styles.detailSection}>Coordonnées</Text>
              <Text style={styles.detailText}>{selectedVendor?.fullName}</Text>
              <Text style={styles.detailText}>{selectedVendor?.email}</Text>
              <Text style={styles.detailText}>{selectedVendor?.phone} — {selectedVendor?.city}</Text>
              <Text style={styles.detailSection}>Catégorie</Text>
              <Text style={styles.detailText}>{selectedVendor?.category}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalClose} onPress={() => setSelectedVendor(null)} activeOpacity={0.85}>
              <Text style={styles.modalCloseText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f7f1e8' },
  header: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: colors.cream,
    borderBottomColor: colors.line,
    borderBottomWidth: 2,
    gap: 12,
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  headerCenter: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#15110c' },
  headerSub: { fontSize: 12, color: colors.muted },
  refreshBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  statNum: { fontSize: 26, fontWeight: '900' },
  statLabel: { fontSize: 11, color: colors.muted },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  tabText: { fontSize: 13, color: colors.muted, fontWeight: '600' },
  tabBadge: { fontSize: 13, fontWeight: '900' },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: colors.muted, fontSize: 14 },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyTitle: { fontSize: 16, color: colors.muted, fontWeight: '600' },
  listContent: { padding: 16, gap: 14 },
  vendorCard: {
    backgroundColor: colors.bg,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    alignItems: 'center',
    borderBottomColor: '#f3e8d4',
    borderBottomWidth: 1,
  },
  shopAvatar: {
    width: 50, height: 50, borderRadius: 12,
    backgroundColor: '#fff5e6',
    alignItems: 'center', justifyContent: 'center',
  },
  cardInfo: { flex: 1 },
  shopName: { fontSize: 16, fontWeight: '800', color: '#15110c' },
  shopCategory: { fontSize: 12, color: colors.brown, fontWeight: '600', marginTop: 2 },
  shopDate: { fontSize: 11, color: colors.muted, marginTop: 2 },
  cardBody: { padding: 14, gap: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoText: { fontSize: 13, color: '#15110c' },
  docsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 4 },
  docChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#fff5e6', borderRadius: 6,
    paddingHorizontal: 10, paddingVertical: 5,
    borderWidth: 1, borderColor: colors.line,
  },
  docChipText: { fontSize: 12, color: colors.brown, fontWeight: '600' },
  rejectReasonBox: {
    backgroundColor: '#fef2f2',
    marginHorizontal: 14, borderRadius: 8, padding: 10, marginBottom: 10,
  },
  rejectReasonLabel: { fontSize: 12, fontWeight: '700', color: '#ef4444', marginBottom: 4 },
  rejectReasonText: { fontSize: 13, color: '#7f1d1d', lineHeight: 18 },
  cardActions: { flexDirection: 'row', gap: 10, padding: 14, paddingTop: 0 },
  rejectBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderWidth: 1.5, borderColor: colors.error, borderRadius: 10, height: 44,
    backgroundColor: '#fff5f5',
  },
  rejectBtnText: { color: colors.error, fontWeight: '700', fontSize: 14 },
  approveBtn: {
    flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: colors.amber, borderRadius: 10, height: 44,
  },
  approveBtnText: { color: '#050505', fontWeight: '800', fontSize: 14 },
  approvedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    padding: 10, paddingHorizontal: 14,
    borderTopColor: '#f3e8d4', borderTopWidth: 1,
  },
  approvedBadgeText: { fontSize: 13, color: colors.success, fontWeight: '600' },
  btnDisabled: { opacity: 0.5 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 24, gap: 14,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: '900', color: '#15110c' },
  modalSub: { fontSize: 13, color: colors.muted, lineHeight: 19 },
  modalInput: {
    borderWidth: 1.5, borderColor: colors.line, borderRadius: 10,
    padding: 14, fontSize: 14, color: '#241b11',
    backgroundColor: '#fffaf4', minHeight: 100,
  },
  modalActions: { flexDirection: 'row', gap: 10 },
  modalCancel: {
    flex: 1, alignItems: 'center', borderWidth: 1.5, borderColor: colors.line,
    borderRadius: 10, height: 48, justifyContent: 'center',
  },
  modalCancelText: { fontSize: 14, color: colors.muted, fontWeight: '600' },
  modalConfirm: {
    flex: 2, alignItems: 'center', backgroundColor: colors.error,
    borderRadius: 10, height: 48, justifyContent: 'center',
  },
  modalConfirmText: { fontSize: 14, fontWeight: '800', color: '#fff' },
  detailSection: { fontSize: 12, fontWeight: '800', color: colors.brown, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 12, marginBottom: 4 },
  detailText: { fontSize: 14, color: '#15110c', lineHeight: 20 },
  modalClose: {
    backgroundColor: colors.amber, borderRadius: 10, height: 48,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  modalCloseText: { fontSize: 15, fontWeight: '800', color: '#050505' },
});
