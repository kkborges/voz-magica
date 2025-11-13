import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/Button';
import { RootStackParamList } from '../../App';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    emoji: '🎤',
    title: 'Bem-vindo ao Voz Mágica!',
    description: 'Um jeito divertido de aprender a falar novas palavras!',
  },
  {
    emoji: '🗣️',
    title: 'Fale as Palavras',
    description: 'Ouça a palavra e tente repetir! O app vai ouvir você.',
  },
  {
    emoji: '⭐',
    title: 'Ganhe Estrelas',
    description: 'Quanto melhor você falar, mais estrelas vai ganhar!',
  },
  {
    emoji: '🎯',
    title: 'Vamos Começar!',
    description: 'Prepare-se para se divertir aprendendo!',
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace('Home');
    }
  };

  const handleSkip = () => {
    navigation.replace('Home');
  };

  const step = onboardingSteps[currentStep];

  return (
    <LinearGradient
      colors={['#FF6B9D', '#FFA07A', '#FFD93D']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.emoji}>{step.emoji}</Text>
          <Text style={styles.title}>{step.title}</Text>
          <Text style={styles.description}>{step.description}</Text>

          <View style={styles.dotsContainer}>
            {onboardingSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentStep && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title={currentStep === onboardingSteps.length - 1 ? 'Começar!' : 'Próximo'}
            onPress={handleNext}
            style={styles.button}
          />

          {currentStep < onboardingSteps.length - 1 && (
            <Button
              title="Pular"
              onPress={handleSkip}
              variant="outline"
              style={styles.skipButton}
            />
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emoji: {
    fontSize: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 30,
  },
  buttonsContainer: {
    paddingBottom: 40,
  },
  button: {
    marginBottom: 15,
  },
  skipButton: {
    borderColor: '#fff',
  },
});
