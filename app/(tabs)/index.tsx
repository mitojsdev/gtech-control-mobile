import { View, Text, StyleSheet } from 'react-native';
import { AnimatedLogo } from '@/components/AnimatedLogo'; // caminho certo depende da sua estrutura
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <AnimatedLogo source={require('@/assets/images/gtech_logo_app.png')} size={180} />

      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
        Bem-vindo ao Gtech Control
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
