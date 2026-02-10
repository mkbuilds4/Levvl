import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../lib/theme-context';
import { spacing, radii, typography } from '../../lib/theme';
import { Button, Text } from '../../components';

export default function AuthLanding() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    screen: { backgroundColor: colors.background },
    iconBox: {
      backgroundColor: colors.surface,
      borderRadius: radii.xl,
      width: 64,
      height: 64,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: { color: colors.muted },
    frame: {
      backgroundColor: colors.background,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.surface,
      width: 200,
      height: 120,
      padding: spacing.lg,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    chartBar1: { width: 12, height: 24, backgroundColor: colors.muted, borderRadius: 2, marginHorizontal: 2 },
    chartBar2: { width: 14, height: 32, backgroundColor: colors.muted, borderRadius: 2, marginHorizontal: 2 },
    chartBar3: { width: 16, height: 28, backgroundColor: colors.muted, borderRadius: 2, marginHorizontal: 2 },
    chartBar4: { width: 18, height: 44, backgroundColor: colors.muted, borderRadius: 2, marginHorizontal: 2 },
    chartBar5: { width: 20, height: 56, backgroundColor: colors.muted, borderRadius: 2, marginHorizontal: 2 },
    secondaryButton: {
      borderColor: colors.surface,
    },
    secondaryButtonText: {
      color: colors.text,
    },
  });

  return (
    <View style={[styles.screen, dynamicStyles.screen, { paddingTop: insets.top }]}>
      <View style={styles.top}>
        <View style={[styles.iconWrap, dynamicStyles.iconBox]}>
          <Ionicons name="rocket-outline" size={28} style={dynamicStyles.icon} />
        </View>
        <Text variant="subtitle" style={styles.welcomeLabel}>
          Welcome to
        </Text>
        <Text variant="cardTitle" style={styles.brandTitle}>
          Levvl
        </Text>
        <View style={[styles.illustration, dynamicStyles.frame]}>
          <View style={styles.chartRow}>
            <View style={dynamicStyles.chartBar1} />
            <View style={dynamicStyles.chartBar2} />
            <View style={dynamicStyles.chartBar3} />
            <View style={dynamicStyles.chartBar4} />
            <View style={dynamicStyles.chartBar5} />
          </View>
        </View>
        <Text variant="body" style={styles.body}>
          Where creators and audiences connect through daily tasks and short courses. Sign in or create an account to get started.
        </Text>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => router.push('/(auth)/sign-in')}
          accessibilityLabel="Log in"
          accessibilityHint="Open sign in screen"
          style={styles.primaryButton}
        >
          Log in
        </Button>
        <Button
          variant="secondary"
          onPress={() => router.push('/(auth)/sign-up')}
          accessibilityLabel="Create account"
          accessibilityHint="Open sign up screen"
          style={[dynamicStyles.secondaryButton, styles.secondaryButton]}
          textStyle={dynamicStyles.secondaryButtonText}
        >
          Create account
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  iconWrap: {
    marginBottom: spacing.lg,
  },
  welcomeLabel: {
    marginBottom: spacing.xs,
    fontSize: 20,
    fontWeight: typography.body.fontWeight,
  },
  brandTitle: {
    marginBottom: spacing.xl,
    fontSize: 32,
    fontWeight: typography.title.fontWeight,
  },
  illustration: {
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 56,
  },
  body: {
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
    fontSize: 18,
    lineHeight: 26,
  },
  buttons: {
    width: '100%',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  primaryButton: {
    borderRadius: radii.xl,
  },
  secondaryButton: {
    borderRadius: radii.xl,
  },
});
