// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-voice
jest.mock('@react-native-voice/voice', () => ({
  start: jest.fn(),
  stop: jest.fn(),
  destroy: jest.fn(() => Promise.resolve()),
  removeAllListeners: jest.fn(),
  isAvailable: jest.fn(() => Promise.resolve(true)),
}));

// Mock react-native-tts
jest.mock('react-native-tts', () => ({
  getInitStatus: jest.fn(() => Promise.resolve('success')),
  setDefaultLanguage: jest.fn(() => Promise.resolve()),
  setDefaultRate: jest.fn(() => Promise.resolve()),
  setDefaultPitch: jest.fn(() => Promise.resolve()),
  setDefaultVoice: jest.fn(() => Promise.resolve()),
  speak: jest.fn(),
  stop: jest.fn(() => Promise.resolve()),
  voices: jest.fn(() => Promise.resolve([])),
}));

// Mock react-native-sound
jest.mock('react-native-sound', () => {
  const SoundMock = jest.fn().mockImplementation((path, bundle, callback) => {
    if (callback) callback(null);
    return {
      play: jest.fn(),
      stop: jest.fn(),
      release: jest.fn(),
      setVolume: jest.fn(),
    };
  });
  SoundMock.setCategory = jest.fn();
  SoundMock.MAIN_BUNDLE = '';
  return SoundMock;
});
