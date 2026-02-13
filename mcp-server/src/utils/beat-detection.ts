import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';
import path from 'path';

const execAsync = promisify(exec);

/**
 * Detect beats from audio file using essentia.js or aubio
 * Returns array of beat timecodes in seconds
 */
export async function detectBeats(audioPath: string): Promise<number[]> {
  console.error(`Detecting beats in: ${audioPath}`);

  try {
    // Method 1: Try using Python aubio (if available)
    const beats = await detectBeatsWithAubio(audioPath);
    if (beats.length > 0) {
      console.error(`✓ Detected ${beats.length} beats using aubio`);
      return beats;
    }
  } catch (error) {
    console.error('Aubio not available, trying alternative method...');
  }

  try {
    // Method 2: Try using FFmpeg analysis
    const beats = await detectBeatsWithFFmpeg(audioPath);
    if (beats.length > 0) {
      console.error(`✓ Detected ${beats.length} beats using FFmpeg`);
      return beats;
    }
  } catch (error) {
    console.error('FFmpeg analysis failed, using heuristic method...');
  }

  // Method 3: Fallback to tempo-based heuristic
  console.error('Using heuristic beat detection (120 BPM)');
  return generateHeuristicBeats(120, 60); // 120 BPM for 60 seconds
}

/**
 * Use aubio beat detection (Python library)
 */
async function detectBeatsWithAubio(audioPath: string): Promise<number[]> {
  // Check if aubio is installed
  try {
    await execAsync('which aubio');
  } catch {
    throw new Error('aubio not installed');
  }

  // Run aubio beat detection
  const { stdout } = await execAsync(`aubio beat "${audioPath}"`);

  // Parse output (format: timestamp in seconds, one per line)
  const beats = stdout
    .trim()
    .split('\n')
    .map(line => parseFloat(line))
    .filter(beat => !isNaN(beat) && beat > 0);

  return beats;
}

/**
 * Use FFmpeg to analyze audio and detect beats
 */
async function detectBeatsWithFFmpeg(audioPath: string): Promise<number[]> {
  // Check if ffmpeg is installed
  try {
    await execAsync('which ffmpeg');
  } catch {
    throw new Error('ffmpeg not installed');
  }

  // Extract audio features using FFmpeg silencedetect
  // This is a simple heuristic - detect silence gaps, assume beats are between them
  const { stderr } = await execAsync(
    `ffmpeg -i "${audioPath}" -af silencedetect=noise=-30dB:d=0.1 -f null - 2>&1`
  );

  // Parse silence detection output
  const silenceRegex = /silence_end: ([\d.]+)/g;
  const beats: number[] = [];
  let match;

  while ((match = silenceRegex.exec(stderr)) !== null) {
    beats.push(parseFloat(match[1]));
  }

  return beats;
}

/**
 * Generate beats based on BPM (fallback method)
 */
function generateHeuristicBeats(bpm: number, durationSeconds: number): number[] {
  const beats: number[] = [];
  const interval = 60 / bpm; // seconds per beat

  for (let time = 0; time < durationSeconds; time += interval) {
    beats.push(parseFloat(time.toFixed(2)));
  }

  return beats;
}

/**
 * Advanced: Detect BPM from audio file
 */
export async function detectBPM(audioPath: string): Promise<number> {
  try {
    // Try using aubio tempo
    const { stdout } = await execAsync(`aubio tempo "${audioPath}"`);
    const bpm = parseFloat(stdout.trim());
    if (!isNaN(bpm) && bpm > 0) {
      return bpm;
    }
  } catch (error) {
    console.error('BPM detection failed, using default 120 BPM');
  }

  // Default to 120 BPM
  return 120;
}

/**
 * Simple beat detection using Web Audio API approach
 * This can be enhanced with actual signal processing
 */
export async function detectBeatsSimple(
  audioBuffer: ArrayBuffer,
  sampleRate: number = 44100
): Promise<number[]> {
  // Convert buffer to samples
  const samples = new Float32Array(audioBuffer);
  const beats: number[] = [];

  // Simple energy-based beat detection
  const windowSize = Math.floor(sampleRate * 0.05); // 50ms window
  const hopSize = Math.floor(windowSize / 2);
  const threshold = 1.5; // Energy threshold multiplier

  let previousEnergy = 0;

  for (let i = 0; i < samples.length - windowSize; i += hopSize) {
    // Calculate energy in current window
    let energy = 0;
    for (let j = 0; j < windowSize; j++) {
      energy += samples[i + j] * samples[i + j];
    }
    energy = Math.sqrt(energy / windowSize);

    // Detect beat if energy spike
    if (energy > previousEnergy * threshold && previousEnergy > 0.01) {
      const timeSeconds = i / sampleRate;
      beats.push(parseFloat(timeSeconds.toFixed(2)));
    }

    previousEnergy = energy;
  }

  // Remove duplicates that are too close (within 0.1s)
  const filteredBeats: number[] = [];
  for (let i = 0; i < beats.length; i++) {
    if (i === 0 || beats[i] - beats[i - 1] > 0.1) {
      filteredBeats.push(beats[i]);
    }
  }

  return filteredBeats;
}
