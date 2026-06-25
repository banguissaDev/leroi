import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ENDPOINTS } from '../../constants/api';

const colors = {
  amber: '#ffb800',
  brown: '#704200',
  cream: '#fff7ed',
  line: '#e5cfae',
  muted: '#6f6254',
};

type VendorStatus = 'pending' | 'approved' | 'rejected';

export default function VendorPendingScreen() {
  const { vendorId } = useLocalSearchParams<{ vendorId: string }>();
  const [status, setStatus] = useState<VendorStatus>('pending');
  const [rejectReason, setRejectReason] = useState('');
  const [checking, setChecking] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fade in on mount
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    startPulse();
  }, []);

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  };

  const checkStatus = async () => {
    if (!vendorId) return;
    setChecking(true);
    try {
      const res = await fetch(ENDPOINTS.vendorStatus(vendorId));
      const data = await res.json();
      setStatus(data.status);
      if (data.rejectReason) setRejectReason(data.rejectReason);
    } catch {
      // Ignorer l'erreur réseau, garder le statut actuel
    } finally {
      setChecking(false);
    }
  };

  // Auto-check every 30 seconds
  useEffect(() => {
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [vendorId]);

  const statusConfig = {
    pending: {
      icon: 'clock-outline' as const,
      color: colors.amber,
      bg: '#fff8e1',
      title: 'Dossier en cours de vérification',
      sub: 'Notre équipe examine vos documents. Vous serez notifié dans les 24 à 72 heures.',
    },
    approved: {
      icon: 'check-circle-outline' as const,
      color: '#22c55e',
      bg: '#f0fdf4',
      title: 'Boutique approuvée !',
      sub: 'Félicitations ! Votre boutique est maintenant visible sur Chezroi. Commencez à ajouter vos produits.',
    },
    rejected: {
      icon: 'close-circle-outline' as const,
      color: '#ef4444',
      bg: '#fef2f2',
      title: 'Dossier rejeté',
      sub: rejectReason || 'Votre dossier n\'a pas été approuvé. Vous pouvez soumettre à nouveau avec des documents valides.',
    },
  };

  const cfg = statusConfig[status];

  return (
    <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#15110c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statut de ma boutique</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.body}>
        {/* Status icon */}
        <Animated.View
          style={[
            styles.iconCircle,
            { backgroundColor: cfg.bg, transform: [{ scale: status === 'pending' ? pulseAnim : 1 }] },
          ]}
        >
          <MaterialCommunityIcons name={cfg.icon} size={72} color={cfg.color} />
        </Animated.View>

        {/* Status text */}
        <Text style={[styles.statusTitle, { color: cfg.color }]}>{cfg.title}</Text>
        <Text style={styles.statusSub}>{cfg.sub}</Text>

        {/* ID de la demande */}
        {vendorId && (
          <View style={styles.idBox}>
            <Text style={styles.idLabel}>Numéro de dossier</Text>
            <Text style={styles.idValue}>#{vendorId.slice(0, 8).toUpperCase()}</Text>
          </View>
        )}

        {/* Steps checklist */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Étapes de validation</Text>
          {[
            { label: 'Dossier reçu', done: true },
            { label: 'Vérification des documents', done: status !== 'pending' },
            { label: 'Validation par l\'équipe', done: status === 'approved' },
            { label: 'Boutique activée', done: status === 'approved' },
          ].map((s, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[styles.stepCheck, s.done && styles.stepCheckDone]}>
                {s.done
                  ? <MaterialIcons name="check" size={14} color="#fff" />
                  : <Text style={styles.stepNum}>{i + 1}</Text>
                }
              </View>
              <Text style={[styles.stepText, s.done && styles.stepTextDone]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* CTA buttons */}
        <View style={styles.actions}>
          {status === 'pending' && (
            <TouchableOpacity
              style={[styles.btnPrimary, checking && styles.btnDisabled]}
              onPress={checkStatus}
              disabled={checking}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons name="refresh" size={20} color="#050505" />
              <Text style={styles.btnPrimaryText}>{checking ? 'Vérification...' : 'Actualiser le statut'}</Text>
            </TouchableOpacity>
          )}

          {status === 'approved' && (
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => router.replace('/vendor/shop')}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons name="store" size={20} color="#050505" />
              <Text style={styles.btnPrimaryText}>Gérer ma boutique</Text>
            </TouchableOpacity>
          )}

          {status === 'rejected' && (
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => router.replace('/vendor/register')}
              activeOpacity={0.85}
            >
              <MaterialIcons name="refresh" size={20} color="#050505" />
              <Text style={styles.btnPrimaryText}>Re-soumettre mon dossier</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.7}
          >
            <Text style={styles.btnSecondaryText}>Retour à l'accueil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f7f1e8' },
  header: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: colors.cream,
    borderBottomColor: colors.line,
    borderBottomWidth: 2,
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '800', color: '#15110c' },
  body: { flex: 1, alignItems: 'center', padding: 24, gap: 20 },
  iconCircle: {
    width: 140, height: 140, borderRadius: 70,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 12, elevation: 6,
  },
  statusTitle: { fontSize: 22, fontWeight: '900', textAlign: 'center' },
  statusSub: { fontSize: 14, color: colors.muted, textAlign: 'center', lineHeight: 21, maxWidth: 300 },
  idBox: {
    backgroundColor: '#fff',
    borderRadius: 10, borderWidth: 1, borderColor: colors.line,
    paddingVertical: 10, paddingHorizontal: 20,
    alignItems: 'center',
  },
  idLabel: { fontSize: 11, color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  idValue: { fontSize: 18, fontWeight: '900', color: colors.brown, marginTop: 2 },
  stepsCard: {
    width: '100%', backgroundColor: '#fff',
    borderRadius: 14, padding: 16, gap: 14,
    borderWidth: 1, borderColor: colors.line,
  },
  stepsTitle: { fontSize: 14, fontWeight: '800', color: '#15110c', marginBottom: 4 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepCheck: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: '#e5cfae',
    alignItems: 'center', justifyContent: 'center',
  },
  stepCheckDone: { backgroundColor: colors.brown },
  stepNum: { fontSize: 12, fontWeight: '700', color: colors.muted },
  stepText: { fontSize: 14, color: colors.muted },
  stepTextDone: { color: '#15110c', fontWeight: '600' },
  actions: { width: '100%', gap: 10, marginTop: 4 },
  btnPrimary: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: colors.amber, borderRadius: 12, height: 52,
  },
  btnDisabled: { opacity: 0.6 },
  btnPrimaryText: { fontSize: 15, fontWeight: '800', color: '#050505' },
  btnSecondary: { alignItems: 'center', paddingVertical: 12 },
  btnSecondaryText: { fontSize: 14, color: colors.muted, fontWeight: '600' },
});
