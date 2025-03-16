/**
 * TextToSpeech utility for reading text aloud
 * Provides methods to speak text, stop speaking, and manage mute state
 */

// Store the speech synthesis instance
let speechSynthesis: SpeechSynthesis | null = null;

// Initialize mute state from localStorage or default to false
let isMuted = localStorage.getItem('isMuted') === 'true';

/**
 * Initialize the speech synthesis
 */
export const initSpeech = (): boolean => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    speechSynthesis = window.speechSynthesis;
    return true;
  }
  return false;
};

/**
 * Speak the provided text
 * @param text The text to be spoken
 * @param rate Speech rate (0.1 to 10), default is 1
 * @param pitch Speech pitch (0 to 2), default is 1
 * @param lang Language code, default is 'en-US'
 * @returns True if speech started successfully, false otherwise
 */
export const speak = (
  text: string,
  rate: number = 1,
  pitch: number = 1,
  lang: string = 'en-US'
): boolean => {
  // Don't speak if muted
  if (isMuted) return false;

  // Initialize speech if not already initialized
  if (!speechSynthesis) {
    if (!initSpeech()) return false;
  }

  // Stop any current speech
  stop();

  try {
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = lang;

    // Start speaking
    speechSynthesis?.speak(utterance);
    return true;
  } catch (error) {
    console.error('Error speaking text:', error);
    return false;
  }
};

/**
 * Stop any current speech
 */
export const stop = (): void => {
  if (speechSynthesis) {
    speechSynthesis.cancel();
  }
};

/**
 * Check if speech is currently speaking
 * @returns True if speaking, false otherwise
 */
export const isSpeaking = (): boolean => {
  return speechSynthesis ? speechSynthesis.speaking : false;
};

/**
 * Get the current mute state
 * @returns True if muted, false otherwise
 */
export const getMuteState = (): boolean => {
  return isMuted;
};

/**
 * Toggle the mute state
 * @returns The new mute state
 */
export const toggleMute = (): boolean => {
  isMuted = !isMuted;
  localStorage.setItem('isMuted', isMuted.toString());
  
  // If muting, stop any current speech
  if (isMuted) {
    stop();
  }
  
  return isMuted;
};

/**
 * Set the mute state
 * @param mute True to mute, false to unmute
 */
export const setMute = (mute: boolean): void => {
  isMuted = mute;
  localStorage.setItem('isMuted', isMuted.toString());
  
  // If muting, stop any current speech
  if (isMuted) {
    stop();
  }
};

/**
 * Clean up speech synthesis resources
 */
export const cleanup = (): void => {
  stop();
  speechSynthesis = null;
};

// Initialize speech synthesis on module load
initSpeech(); 