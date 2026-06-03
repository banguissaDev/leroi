import { StyleSheet, Text, View } from 'react-native';

export default function EbooksScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Ebooks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#704200',
    fontSize: 24,
    fontWeight: '800',
  },
});
