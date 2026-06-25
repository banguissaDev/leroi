import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
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

const CATEGORIES = [
  'Électronique', 'Mode & Vêtements', 'Maison & Déco', 'Alimentation',
  'Beauté & Soins', 'Bijoux', 'Sport & Loisirs', 'Livres & Ebooks',
  'Auto & Moto', 'Jouets & Enfants', 'Services', 'Autre',
];

type DocFile = { name: string; uri: string; type: string } | null;

export default function VendorRegisterScreen() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1 — Boutique
  const [shopName, setShopName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  // Step 2 — Gérant
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [cityResults, setCityResults] = useState<{nom: string, departement?: {nom: string}}[]>([]);
  const [searchingCity, setSearchingCity] = useState(false);

  const searchCity = async (text: string) => {
    setCity(text);
    if (text.length < 2) {
      setCityResults([]);
      return;
    }
    setSearchingCity(true);
    try {
      const res = await fetch(`https://geo.api.gouv.fr/communes?nom=${text}&fields=departement&boost=population&limit=5`);
      const data = await res.json();
      setCityResults(data);
    } catch {
      // Ignorer l'erreur réseau
    } finally {
      setSearchingCity(false);
    }
  };

  // Step 3 — Documents
  const [idDoc, setIdDoc] = useState<DocFile>(null);
  const [registreDoc, setRegistreDoc] = useState<DocFile>(null);

  const progressAnim = useRef(new Animated.Value(0.33)).current;

  const animateProgress = (toValue: number) => {
    Animated.spring(progressAnim, { toValue, useNativeDriver: false, friction: 8 }).start();
  };

  const goNext = () => {
    if (step === 1) {
      if (!shopName.trim() || !category || !description.trim()) {
        Alert.alert('Champs manquants', 'Veuillez remplir tous les champs de la boutique.');
        return;
      }
      animateProgress(0.66);
      setStep(2);
    } else if (step === 2) {
      if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim()) {
        Alert.alert('Champs manquants', 'Veuillez remplir tous les champs.');
        return;
      }
      if (!email.includes('@')) {
        Alert.alert('Email invalide', 'Veuillez entrer un email valide.');
        return;
      }
      animateProgress(1);
      setStep(3);
    }
  };

  const goBack = () => {
    if (step === 2) { animateProgress(0.33); setStep(1); }
    if (step === 3) { animateProgress(0.66); setStep(2); }
  };

  const pickDocument = async (setter: (f: DocFile) => void) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        setter({ name: asset.name, uri: asset.uri, type: asset.mimeType ?? 'application/octet-stream' });
      }
    } catch {
      Alert.alert('Erreur', "Impossible d'accéder aux fichiers.");
    }
  };

  const handleSubmit = async () => {
    if (!idDoc || !registreDoc) {
      Alert.alert('Documents manquants', 'Veuillez uploader la pièce d\'identité et le registre de commerce.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('shopName', shopName);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('city', city);
      formData.append('idDocument', { name: idDoc.name, uri: idDoc.uri, type: idDoc.type } as any);
      formData.append('registreDocument', { name: registreDoc.name, uri: registreDoc.uri, type: registreDoc.type } as any);

      const response = await fetch(ENDPOINTS.vendorRegister, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      });

      if (!response.ok) throw new Error('Erreur serveur');
      const data = await response.json();
      router.replace({ pathname: '/vendor/pending', params: { vendorId: data.id } });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de soumettre la demande. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 1 ? goBack() : router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#15110c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ouvrir ma boutique</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Stepper */}
      <View style={styles.stepperWrap}>
        <View style={styles.stepperTrack}>
          <Animated.View style={[styles.stepperFill, { width: progressWidth }]} />
        </View>
        <View style={styles.stepLabels}>
          {['Boutique', 'Gérant', 'Documents'].map((label, i) => (
            <View key={label} style={styles.stepLabelItem}>
              <View style={[styles.stepDot, step > i && styles.stepDotDone, step === i + 1 && styles.stepDotActive]}>
                {step > i + 1 ? (
                  <MaterialIcons name="check" size={13} color="#fff" />
                ) : (
                  <Text style={[styles.stepDotText, step === i + 1 && styles.stepDotTextActive]}>{i + 1}</Text>
                )}
              </View>
              <Text style={[styles.stepLabel, step === i + 1 && styles.stepLabelActive]}>{label}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>

        {/* STEP 1 — Infos boutique */}
        {step === 1 && (
          <View style={styles.formSection}>
            <Text style={styles.stepTitle}>Informations de votre boutique</Text>
            <Text style={styles.stepSub}>Ces infos seront visibles par les acheteurs.</Text>

            <View style={styles.field}>
              <Text style={styles.label}>Nom de la boutique *</Text>
              <View style={styles.inputWrap}>
                <MaterialCommunityIcons name="store-outline" size={20} color={colors.muted} />
                <TextInput
                  style={styles.input}
                  placeholder="ex: TechPro Store"
                  placeholderTextColor="#bba88a"
                  value={shopName}
                  onChangeText={setShopName}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Catégorie principale *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.chip, category === cat && styles.chipActive]}
                    onPress={() => setCategory(cat)}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Description de la boutique *</Text>
              <TextInput
                style={[styles.inputWrap, styles.textarea]}
                placeholder="Décrivez votre boutique, vos produits, ce qui vous différencie..."
                placeholderTextColor="#bba88a"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        )}

        {/* STEP 2 — Infos gérant */}
        {step === 2 && (
          <View style={styles.formSection}>
            <Text style={styles.stepTitle}>Informations du gérant</Text>
            <Text style={styles.stepSub}>Ces infos sont confidentielles et servent à la vérification.</Text>

            {[
              { label: 'Nom complet *', icon: 'account-outline' as const, value: fullName, setter: setFullName, placeholder: 'Prénom et nom de famille' },
              { label: 'Email professionnel *', icon: 'email-outline' as const, value: email, setter: setEmail, placeholder: 'contact@maboutique.com', keyboard: 'email-address' as const },
              { label: 'Téléphone *', icon: 'phone-outline' as const, value: phone, setter: setPhone, placeholder: '+33 6 XX XX XX XX', keyboard: 'phone-pad' as const },
            ].map((f) => (
              <View key={f.label} style={styles.field}>
                <Text style={styles.label}>{f.label}</Text>
                <View style={styles.inputWrap}>
                  <MaterialCommunityIcons name={f.icon} size={20} color={colors.muted} />
                  <TextInput
                    style={styles.input}
                    placeholder={f.placeholder}
                    placeholderTextColor="#bba88a"
                    value={f.value}
                    onChangeText={f.setter}
                    keyboardType={f.keyboard ?? 'default'}
                    autoCapitalize={f.keyboard ? 'none' : 'words'}
                  />
                </View>
              </View>
            ))}

            <View style={styles.field}>
              <Text style={styles.label}>Ville *</Text>
              <View style={styles.inputWrap}>
                <MaterialCommunityIcons name="city-variant-outline" size={20} color={colors.muted} />
                <TextInput
                  style={styles.input}
                  placeholder="Paris, Lyon..."
                  placeholderTextColor="#bba88a"
                  value={city}
                  onChangeText={searchCity}
                />
                {searchingCity && <ActivityIndicator size="small" color={colors.amber} />}
              </View>
              {cityResults.length > 0 && (
                <View style={styles.cityDropdown}>
                  {cityResults.map((c, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.cityItem}
                      onPress={() => {
                        setCity(`${c.nom} (${c.departement?.nom || ''})`);
                        setCityResults([]);
                      }}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons name="location-on" size={16} color={colors.brown} />
                      <Text style={styles.cityItemText}>{c.nom} <Text style={styles.cityItemSub}>- {c.departement?.nom}</Text></Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {/* STEP 3 — Documents */}
        {step === 3 && (
          <View style={styles.formSection}>
            <Text style={styles.stepTitle}>Documents officiels</Text>
            <Text style={styles.stepSub}>Formats acceptés : PDF, JPG, PNG. Ces documents sont vérifiés par notre équipe.</Text>

            <View style={styles.docNotice}>
              <MaterialCommunityIcons name="shield-check-outline" size={22} color={colors.amber} />
              <Text style={styles.docNoticeText}>Vos documents sont chiffrés et conservés en sécurité. Ils ne seront jamais partagés.</Text>
            </View>

            {[
              { label: "Pièce d'identité (CNI, Passeport) *", icon: 'card-account-details-outline' as const, doc: idDoc, setter: setIdDoc },
              { label: 'Registre de commerce *', icon: 'file-document-outline' as const, doc: registreDoc, setter: setRegistreDoc },
            ].map((d) => (
              <View key={d.label} style={styles.field}>
                <Text style={styles.label}>{d.label}</Text>
                <TouchableOpacity
                  style={[styles.uploadBox, d.doc && styles.uploadBoxDone]}
                  onPress={() => pickDocument(d.setter)}
                  activeOpacity={0.8}
                >
                  {d.doc ? (
                    <>
                      <MaterialIcons name="check-circle" size={28} color={colors.success} />
                      <View style={styles.uploadMeta}>
                        <Text style={styles.uploadFileName} numberOfLines={1}>{d.doc.name}</Text>
                        <Text style={styles.uploadFileHint}>Appuyer pour changer</Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <MaterialCommunityIcons name={d.icon} size={28} color={colors.muted} />
                      <View style={styles.uploadMeta}>
                        <Text style={styles.uploadText}>Appuyer pour sélectionner</Text>
                        <Text style={styles.uploadHint}>PDF, JPG ou PNG</Text>
                      </View>
                      <MaterialIcons name="upload-file" size={22} color={colors.brown} />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.termsBox}>
              <MaterialCommunityIcons name="information-outline" size={16} color={colors.muted} />
              <Text style={styles.termsText}>
                En soumettant votre dossier, vous acceptez nos{' '}
                <Text style={styles.termsLink}>Conditions Vendeurs</Text> et notre{' '}
                <Text style={styles.termsLink}>Politique de confidentialité</Text>.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer buttons */}
      <View style={styles.footer}>
        {step < 3 ? (
          <TouchableOpacity style={styles.nextBtn} onPress={goNext} activeOpacity={0.85}>
            <Text style={styles.nextBtnText}>Continuer</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#050505" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.nextBtn, loading && styles.nextBtnDisabled]}
            onPress={handleSubmit}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#050505" />
            ) : (
              <>
                <Text style={styles.nextBtnText}>Soumettre mon dossier</Text>
                <MaterialIcons name="send" size={20} color="#050505" />
              </>
            )}
          </TouchableOpacity>
        )}
        {step > 1 && (
          <TouchableOpacity style={styles.backBtnFooter} onPress={goBack} activeOpacity={0.7}>
            <Text style={styles.backBtnFooterText}>Retour</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
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
  stepperWrap: { backgroundColor: '#fff5ec', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  stepperTrack: { height: 6, backgroundColor: '#e5cfae', borderRadius: 99, overflow: 'hidden', marginBottom: 12 },
  stepperFill: { height: '100%', backgroundColor: colors.amber, borderRadius: 99 },
  stepLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  stepLabelItem: { alignItems: 'center', gap: 4 },
  stepDot: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: '#e5cfae',
    alignItems: 'center', justifyContent: 'center',
  },
  stepDotActive: { backgroundColor: colors.amber },
  stepDotDone: { backgroundColor: colors.brown },
  stepDotText: { fontSize: 12, fontWeight: '700', color: colors.muted },
  stepDotTextActive: { color: '#050505' },
  stepLabel: { fontSize: 11, color: colors.muted },
  stepLabelActive: { color: colors.brown, fontWeight: '700' },
  body: { flex: 1 },
  bodyContent: { padding: 20, paddingBottom: 40 },
  formSection: { gap: 20 },
  stepTitle: { fontSize: 22, fontWeight: '900', color: '#15110c' },
  stepSub: { fontSize: 13, color: colors.muted, lineHeight: 19, marginTop: -12 },
  field: { gap: 8 },
  label: { fontSize: 13, fontWeight: '700', color: '#15110c' },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1.5, borderColor: colors.line, borderRadius: 10,
    backgroundColor: '#fffaf4', paddingHorizontal: 14, height: 50,
  },
  input: { flex: 1, fontSize: 15, color: '#241b11' },
  cityDropdown: {
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: colors.line,
    borderRadius: 10, marginTop: 4, overflow: 'hidden',
  },
  cityItem: {
    flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12,
    borderBottomWidth: 1, borderBottomColor: '#f3e8d4',
  },
  cityItemText: { fontSize: 14, color: '#15110c', fontWeight: '600' },
  cityItemSub: { fontSize: 13, color: colors.muted, fontWeight: '400' },
  textarea: {
    height: 110, alignItems: 'flex-start', paddingTop: 12,
    fontSize: 15, color: '#241b11', paddingHorizontal: 14,
  },
  chipRow: { gap: 8, paddingVertical: 4 },
  chip: {
    borderWidth: 1.5, borderColor: colors.line, borderRadius: 999,
    paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#fffaf4',
  },
  chipActive: { backgroundColor: colors.amber, borderColor: colors.amber },
  chipText: { fontSize: 13, color: colors.muted, fontWeight: '600' },
  chipTextActive: { color: '#050505' },
  docNotice: {
    flexDirection: 'row', gap: 10, alignItems: 'flex-start',
    backgroundColor: '#1a0e00', borderRadius: 12, padding: 14,
  },
  docNoticeText: { flex: 1, fontSize: 13, color: '#c9a87a', lineHeight: 19 },
  uploadBox: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 2, borderColor: colors.line, borderStyle: 'dashed',
    borderRadius: 12, padding: 16, backgroundColor: '#fffaf4',
  },
  uploadBoxDone: { borderColor: colors.success, borderStyle: 'solid', backgroundColor: '#f0fdf4' },
  uploadMeta: { flex: 1 },
  uploadText: { fontSize: 14, fontWeight: '600', color: '#15110c' },
  uploadHint: { fontSize: 12, color: colors.muted, marginTop: 2 },
  uploadFileName: { fontSize: 14, fontWeight: '600', color: '#15110c' },
  uploadFileHint: { fontSize: 12, color: colors.success, marginTop: 2 },
  termsBox: {
    flexDirection: 'row', gap: 8, backgroundColor: '#fff5ec',
    borderRadius: 10, padding: 12, alignItems: 'flex-start',
  },
  termsText: { flex: 1, fontSize: 12, color: colors.muted, lineHeight: 18 },
  termsLink: { color: colors.brown, fontWeight: '700' },
  footer: { padding: 16, gap: 10, borderTopColor: colors.line, borderTopWidth: 1, backgroundColor: colors.bg },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: colors.amber, borderRadius: 12, height: 52,
  },
  nextBtnDisabled: { opacity: 0.6 },
  nextBtnText: { fontSize: 16, fontWeight: '800', color: '#050505' },
  backBtnFooter: { alignItems: 'center', paddingVertical: 10 },
  backBtnFooterText: { fontSize: 14, color: colors.muted, fontWeight: '600' },
});
