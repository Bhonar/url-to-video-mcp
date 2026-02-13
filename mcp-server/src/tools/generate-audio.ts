import axios from 'axios';
import { detectBeats } from '../utils/beat-detection.js';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

interface AudioGenerationParams {
  musicStyle: string;
  narrationScript: string;
  duration: number;
}

interface AudioResult {
  music: {
    url: string;
    localPath: string;
    duration: number;
  };
  narration: {
    url: string;
    localPath: string;
    timecodes: Array<{ start: number; end: number; text: string }>;
  };
  beats: number[];
}

export async function generateAudio(params: AudioGenerationParams): Promise<AudioResult> {
  console.error(`Generating audio: ${params.musicStyle} style, ${params.duration}s`);

  const { musicStyle, narrationScript, duration } = params;

  // Generate background music (instrumental only, no singing!)
  const music = await generateMusic(musicStyle, duration);

  // Generate narration (text-to-speech)
  const narration = await generateNarration(narrationScript);

  // Detect beats from music for transition sync
  const beats = await detectBeats(music.localPath);

  console.error(`✓ Generated audio: ${beats.length} beats detected`);

  return {
    music,
    narration,
    beats,
  };
}

async function generateMusic(style: string, duration: number): Promise<AudioResult['music']> {
  const apiKey = process.env.MINIMAX_API_KEY;
  const groupId = process.env.MINIMAX_GROUP_ID; // Optional

  if (!apiKey) {
    throw new Error('MINIMAX_API_KEY must be set');
  }

  // Create prompt for instrumental music (NO SINGING!)
  const prompt = createMusicPrompt(style, duration);

  console.error(`Generating ${style} music: "${prompt}"`);

  // Call MiniMax Music API
  const headers: Record<string, string> = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  // Add Group ID only if provided (optional)
  if (groupId) {
    headers['X-Group-Id'] = groupId;
  }

  const response = await axios.post(
    'https://api.minimax.chat/v1/music/generation',
    {
      model: 'music-2.5',
      prompt,
      duration,
      // Ensure no vocals/singing
      instrumental: true,
    },
    { headers }
  );

  const audioUrl = response.data.audio_url;

  // Download to local temp directory
  const localPath = await downloadAudio(audioUrl, 'music');

  return {
    url: audioUrl,
    localPath,
    duration,
  };
}

async function generateNarration(script: string): Promise<AudioResult['narration']> {
  const apiKey = process.env.MINIMAX_API_KEY;
  const groupId = process.env.MINIMAX_GROUP_ID; // Optional

  if (!apiKey) {
    throw new Error('MINIMAX_API_KEY must be set');
  }

  console.error('Generating narration...');

  // Call MiniMax Speech API (TTS)
  const headers: Record<string, string> = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  // Add Group ID only if provided (optional)
  if (groupId) {
    headers['X-Group-Id'] = groupId;
  }

  const response = await axios.post(
    'https://api.minimax.chat/v1/text_to_speech',
    {
      model: 'speech-2.5-hd',
      text: script,
      voice_id: 'professional-neutral', // or make this configurable
      speed: 1.0,
    },
    { headers }
  );

  const audioUrl = response.data.audio_url;

  // Download to local temp directory
  const localPath = await downloadAudio(audioUrl, 'narration');

  // Parse timecodes from response (if available)
  // For now, create simple timecodes based on script length
  const timecodes = createNarrationTimecodes(script);

  return {
    url: audioUrl,
    localPath,
    timecodes,
  };
}

function createMusicPrompt(style: string, duration: number): string {
  const stylePrompts: Record<string, string> = {
    'pop': 'upbeat pop instrumental background music, catchy melody, energetic',
    'hip-hop': 'hip-hop instrumental beat, rhythmic drums, bass-heavy, modern',
    'rap': 'rap instrumental beat, strong drums, urban vibe, no vocals',
    'jazz': 'smooth jazz instrumental, piano and saxophone, sophisticated',
    'lo-fi': 'lo-fi chill beats, mellow and relaxing, study music vibe',
    'ambient': 'ambient atmospheric background music, ethereal and calming',
    'cinematic': 'cinematic orchestral instrumental, dramatic and epic',
    'rock': 'rock instrumental background, electric guitar driven, energetic',
  };

  const basePrompt = stylePrompts[style.toLowerCase()] || stylePrompts['lo-fi'];

  return `${basePrompt}, instrumental only, no singing, no vocals, no lyrics, ${duration} seconds`;
}

function createNarrationTimecodes(script: string): Array<{ start: number; end: number; text: string }> {
  // Simple word-based timing (approximately 150 words per minute)
  const words = script.split(/\s+/);
  const wordsPerSecond = 150 / 60; // 2.5 words per second
  const timecodes: Array<{ start: number; end: number; text: string }> = [];

  let currentTime = 0;
  const sentences = script.split(/[.!?]+/).filter(s => s.trim());

  for (const sentence of sentences) {
    const sentenceWords = sentence.trim().split(/\s+/);
    const durationSeconds = sentenceWords.length / wordsPerSecond;

    timecodes.push({
      start: currentTime,
      end: currentTime + durationSeconds,
      text: sentence.trim(),
    });

    currentTime += durationSeconds + 0.5; // Add pause between sentences
  }

  return timecodes;
}

async function downloadAudio(url: string, prefix: string): Promise<string> {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data);

  // Save to temp directory
  const tempDir = os.tmpdir();
  const fileName = `${prefix}-${Date.now()}.mp3`;
  const filePath = path.join(tempDir, fileName);

  await fs.writeFile(filePath, buffer);

  console.error(`✓ Downloaded ${prefix} to: ${filePath}`);

  return filePath;
}
