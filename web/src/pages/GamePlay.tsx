/**
 * Página principal do jogo
 * Onde a criança interage com o reconhecimento de voz
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { geminiService } from '@/services/geminiService';
import { voiceService } from '@/services/voiceService';
import { getWordsByCategory, getRandomWord } from '@/data/words';
import type { Word, WordAttempt } from '@/types';
import Button from '@/components/Button';
import './GamePlay.css';

export default function GamePlay() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { currentProfile, currentSession, startGame, addAttempt, updateStats, endGame } = useAppStore();

  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [showWordIntro, setShowWordIntro] = useState(true);

  // Mapeamento de gameId para categoria
  const gameCategoryMap: Record<string, any> = {
    'mundo-animal': 'ANIMALS',
    'minhas-coisas': 'OBJECTS',
    'cores-magicas': 'COLORS',
    'numeros-divertidos': 'NUMBERS',
    'hora-da-comida': 'FOODS',
  };

  useEffect(() => {
    if (!currentProfile || !gameId) {
      navigate('/');
      return;
    }

    // Inicializa Gemini
    geminiService.initialize();

    // Inicia sessão de jogo
    const category = gameCategoryMap[gameId];
    if (category) {
      startGame(category);
      loadNewWord(category);
    }

    return () => {
      voiceService.stopListening();
      voiceService.stopSpeaking();
    };
  }, [gameId]);

  const loadNewWord = (category: string) => {
    const word = getRandomWord(category as any);
    if (word) {
      setCurrentWord(word);
      setShowWordIntro(true);
      setTranscript('');
      setFeedback(null);

      // Fala a palavra após um delay
      setTimeout(() => {
        speakWord(word.text);
      }, 1000);
    }
  };

  const speakWord = (text: string, options?: any) => {
    voiceService.speak(text, {
      rate: currentProfile?.settings.speechSpeed === 'slow' ? 0.8 :
            currentProfile?.settings.speechSpeed === 'fast' ? 1.2 : 1,
      ...options,
    });
  };

  const handleStartListening = () => {
    if (!currentWord) return;

    setShowWordIntro(false);
    setTranscript('');
    setFeedback(null);

    const success = voiceService.startListening(
      (text, isFinal) => {
        setTranscript(text);

        if (isFinal) {
          handleVoiceResult(text);
        }
      },
      (error) => {
        console.error('Erro no reconhecimento:', error);
        setFeedback({
          result: 'INCORRECT',
          message: '😅 Ops! Não consegui te ouvir. Tente de novo!',
          encouragement: 'Fale um pouquinho mais alto!',
        });
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (success) {
      setIsListening(true);
    }
  };

  const handleVoiceResult = async (spokenText: string) => {
    if (!currentWord || !currentProfile) return;

    setIsListening(false);

    // Análise com Gemini AI
    const analysis = await geminiService.analyzePronunciation(
      currentWord.text,
      spokenText,
      parseInt(currentProfile.ageGroup.split('-')[0]),
      0
    );

    setFeedback(analysis);

    // Registra tentativa
    const attempt: WordAttempt = {
      wordId: currentWord.id,
      wordText: currentWord.text,
      spokenText,
      timestamp: new Date(),
      accuracy: analysis.accuracy,
      result: analysis.result,
      feedbackGiven: analysis.message,
    };

    addAttempt(attempt);

    // Atualiza pontuação
    let points = 0;
    let earnedStars = 0;

    if (analysis.result === 'PERFECT') {
      points = 100;
      earnedStars = 1;
    } else if (analysis.result === 'GOOD') {
      points = 75;
    } else if (analysis.result === 'CLOSE') {
      points = 50;
    }

    setScore(prev => prev + points);
    setStars(prev => prev + earnedStars);

    // Celebra acerto perfeito
    if (analysis.result === 'PERFECT') {
      celebratePerfect();
    }

    // Fala o feedback
    setTimeout(() => {
      speakWord(analysis.message);
    }, 500);
  };

  const celebratePerfect = () => {
    // Efeito de confetes (simulado com emojis)
    const celebration = document.createElement('div');
    celebration.className = 'celebration-confetti';
    celebration.innerHTML = '🎉🌟✨🎊💫⭐🎈';
    document.body.appendChild(celebration);

    setTimeout(() => {
      celebration.remove();
    }, 3000);
  };

  const handleNextWord = () => {
    if (!currentWord) return;

    const category = gameCategoryMap[gameId!];
    setWordsCompleted(prev => prev + 1);
    loadNewWord(category);
  };

  const handleTryAgain = () => {
    setFeedback(null);
    setTranscript('');
    setShowWordIntro(true);

    setTimeout(() => {
      if (currentWord) {
        speakWord(currentWord.text);
      }
    }, 500);
  };

  const handleHearWord = () => {
    if (currentWord) {
      speakWord(currentWord.text);
    }
  };

  const handleHint = () => {
    if (currentWord?.hint) {
      speakWord(currentWord.hint);
    }
  };

  const handleSyllables = () => {
    if (currentWord?.syllables) {
      const syllablesText = currentWord.syllables.join(' - ');
      speakWord(syllablesText, { rate: 0.7 });
    }
  };

  const handleEndGame = () => {
    if (currentSession) {
      updateStats(stars, score);
      endGame();
    }
    navigate('/');
  };

  if (!currentWord || !currentProfile) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="gameplay">
      {/* Header com pontuação */}
      <header className="gameplay__header">
        <Button variant="secondary" size="sm" onClick={handleEndGame}>
          ← Voltar
        </Button>

        <div className="gameplay__score">
          <div className="gameplay__score-item">
            <span className="gameplay__score-label">Pontos</span>
            <span className="gameplay__score-value">{score}</span>
          </div>
          <div className="gameplay__score-item">
            <span className="gameplay__score-label">Estrelas</span>
            <span className="gameplay__score-value">⭐ {stars}</span>
          </div>
          <div className="gameplay__score-item">
            <span className="gameplay__score-label">Palavras</span>
            <span className="gameplay__score-value">{wordsCompleted}</span>
          </div>
        </div>
      </header>

      {/* Área principal do jogo */}
      <main className="gameplay__main">
        {/* Card da palavra */}
        <div className="gameplay__word-card">
          {/* Imagem (placeholder por enquanto) */}
          <div className="gameplay__word-image">
            <div className="gameplay__word-image-placeholder">
              {currentWord.text.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Palavra */}
          <h2 className="gameplay__word-text">{currentWord.text.toUpperCase()}</h2>

          {/* Sílabas (se mostradas) */}
          {feedback?.syllableBreakdown && (
            <div className="gameplay__syllables">
              {feedback.syllableBreakdown.map((syllable: string, idx: number) => (
                <span key={idx} className="gameplay__syllable">
                  {syllable}
                </span>
              ))}
            </div>
          )}

          {/* Dica */}
          {currentWord.hint && (
            <p className="gameplay__hint">💡 {currentWord.hint}</p>
          )}
        </div>

        {/* Área de interação com voz */}
        <div className="gameplay__voice-area">
          {showWordIntro && !feedback && (
            <div className="gameplay__intro animate-fadeIn">
              <h3 className="gameplay__intro-title">
                🎤 Você consegue dizer <strong>{currentWord.text}</strong>?
              </h3>
              <p className="gameplay__intro-subtitle">
                Clique no botão e fale no microfone!
              </p>
            </div>
          )}

          {/* Botão do microfone */}
          {!feedback && (
            <button
              className={`gameplay__mic-button ${isListening ? 'gameplay__mic-button--listening' : ''}`}
              onClick={handleStartListening}
              disabled={isListening}
            >
              <span className="gameplay__mic-icon">🎤</span>
              <span className="gameplay__mic-text">
                {isListening ? 'Estou ouvindo...' : 'Clique para falar'}
              </span>
            </button>
          )}

          {/* Transcript parcial */}
          {transcript && !feedback && (
            <div className="gameplay__transcript animate-fadeIn">
              <p>Você disse: <strong>"{transcript}"</strong></p>
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div className={`gameplay__feedback gameplay__feedback--${feedback.result.toLowerCase()} animate-scaleIn`}>
              <div className="gameplay__feedback-icon">
                {feedback.result === 'PERFECT' && '🎉'}
                {feedback.result === 'GOOD' && '😊'}
                {feedback.result === 'CLOSE' && '🌟'}
                {feedback.result === 'INCORRECT' && '💪'}
              </div>

              <h3 className="gameplay__feedback-message">{feedback.message}</h3>
              <p className="gameplay__feedback-encouragement">{feedback.encouragement}</p>

              {feedback.suggestions && feedback.suggestions.length > 0 && (
                <div className="gameplay__feedback-suggestions">
                  {feedback.suggestions.map((suggestion: string, idx: number) => (
                    <p key={idx} className="gameplay__feedback-suggestion">
                      💡 {suggestion}
                    </p>
                  ))}
                </div>
              )}

              <div className="gameplay__feedback-actions">
                {(feedback.result === 'CLOSE' || feedback.result === 'INCORRECT') && (
                  <Button variant="primary" size="lg" onClick={handleTryAgain}>
                    🔄 Tentar Novamente
                  </Button>
                )}

                {(feedback.result === 'PERFECT' || feedback.result === 'GOOD') && (
                  <Button variant="success" size="lg" onClick={handleNextWord}>
                    ➡️ Próxima Palavra
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Botões de ajuda */}
        <div className="gameplay__help-buttons">
          <Button variant="secondary" size="md" onClick={handleHearWord} icon="🔊">
            Ouvir Novamente
          </Button>
          <Button variant="secondary" size="md" onClick={handleSyllables} icon="📖">
            Sílabas
          </Button>
          <Button variant="secondary" size="md" onClick={handleHint} icon="💡">
            Dica
          </Button>
        </div>
      </main>
    </div>
  );
}
