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

interface Voice {
  voice_id: string;
  name?: string;
  language?: string;
  gender?: string;
}

export async function generateAudio(params: AudioGenerationParams): Promise<AudioResult> {
  console.error(`Generating audio: ${params.musicStyle} style, ${params.duration}s`);

  const { musicStyle, narrationScript, duration } = params;

  // Generate background music (instrumental with structural lyrics)
  const music = await generateMusic(musicStyle, duration);

  // Generate narration (text-to-speech with intelligent voice selection)
  const narration = await generateNarration(narrationScript);

  // Detect beats from music for transition sync
  const beats = music.localPath
    ? await detectBeats(music.localPath)
    : createPlaceholderBeats(duration);

  console.error(`✓ Generated audio: ${beats.length} beats detected`);

  return {
    music,
    narration,
    beats,
  };
}

function createPlaceholderBeats(duration: number): number[] {
  const beats: number[] = [];
  for (let i = 1.0; i < duration; i += 1.2) {
    beats.push(i);
  }
  return beats;
}

async function generateMusic(style: string, duration: number): Promise<AudioResult['music']> {
  const apiKey = process.env.MINIMAX_API_KEY;
  const groupId = process.env.MINIMAX_GROUP_ID; // Optional

  if (!apiKey) {
    throw new Error('MINIMAX_API_KEY must be set');
  }

  // Create structural lyrics for instrumental music
  const lyrics = createInstrumentalLyrics(duration);

  // Create prompt for instrumental music (NO SINGING!)
  const prompt = createMusicPrompt(style, duration);

  console.error(`Generating ${style} music with structural guide: "${lyrics.substring(0, 50)}..."`);

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
    'https://api.minimax.io/v1/music_generation',
    {
      model: 'music-2.5',
      lyrics, // Structural lyrics to guide instrumental arrangement
      prompt,
      duration,
      output_format: 'url', // Request URL instead of hex-encoded data
    },
    { headers }
  );

  console.error('Music API Response:', JSON.stringify(response.data, null, 2));

  // Check for errors (like insufficient balance)
  if (response.data.base_resp?.status_code !== 0) {
    const errorMsg = response.data.base_resp?.status_msg || 'Unknown error';
    console.error(`⚠️  Music generation failed: ${errorMsg}. Skipping background music.`);
    return {
      url: '',
      localPath: '',
      duration,
    };
  }

  // Extract audio URL from response
  const audioUrl = response.data.data?.audio || response.data.audio_url || response.data.url;
  if (!audioUrl) {
    console.error('⚠️  No audio URL in response. Skipping background music.');
    return {
      url: '',
      localPath: '',
      duration,
    };
  }

  // Download to local temp directory
  const localPath = await downloadAudio(audioUrl, 'music');

  return {
    url: audioUrl,
    localPath,
    duration,
  };
}

function createInstrumentalLyrics(duration: number): string {
  // Use structural tags to guide instrumental arrangement
  // MiniMax Music 2.5 supports: Intro, Verse, Pre Chorus, Chorus, Interlude, Bridge, Outro, etc.

  if (duration <= 20) {
    return '[Intro][Inst][Build Up][Outro]';
  } else if (duration <= 40) {
    return '[Intro][Verse][Inst][Chorus][Inst][Bridge][Outro]';
  } else {
    return '[Intro][Verse][Inst][Pre Chorus][Chorus][Interlude][Inst][Bridge][Build Up][Outro]';
  }
}

async function generateNarration(script: string): Promise<AudioResult['narration']> {
  const apiKey = process.env.MINIMAX_API_KEY;
  const groupId = process.env.MINIMAX_GROUP_ID; // Optional

  if (!apiKey) {
    throw new Error('MINIMAX_API_KEY must be set');
  }

  console.error('Generating narration...');

  // Select appropriate voice based on script content
  const voiceId = await selectVoice(script, apiKey, groupId);
  console.error(`Selected voice: ${voiceId}`);

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
    'https://api.minimax.io/v1/t2a_v2',
    {
      model: 'speech-2.6-hd',
      text: script,
      voice_id: voiceId,
      speed: 1.0,
      output_format: 'url', // Request URL instead of hex-encoded data
    },
    { headers }
  );

  console.error('TTS API Response structure:', {
    hasData: !!response.data.data,
    hasAudio: !!response.data.data?.audio,
    statusCode: response.data.base_resp?.status_code,
    statusMsg: response.data.base_resp?.status_msg,
  });

  // Check for errors (like insufficient balance)
  if (response.data.base_resp?.status_code !== 0) {
    const errorMsg = response.data.base_resp?.status_msg || 'Unknown error';
    console.error(`⚠️  Narration generation failed: ${errorMsg}. Skipping narration.`);
    return {
      url: '',
      localPath: '',
      timecodes: [],
    };
  }

  // Extract audio URL from response
  const audioUrl = response.data.data?.audio || response.data.audio_url || response.data.url;
  if (!audioUrl) {
    console.error('⚠️  No audio URL in response. Skipping narration.');
    return {
      url: '',
      localPath: '',
      timecodes: [],
    };
  }

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

async function selectVoice(script: string, apiKey: string, groupId?: string): Promise<string> {
  try {
    // Try to get available voices from API
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${apiKey}`,
    };

    if (groupId) {
      headers['X-Group-Id'] = groupId;
    }

    const response = await axios.get('https://api.minimax.io/v1/query/voice', { headers });

    const voices: Voice[] = response.data.data?.voices || response.data.voices || [];

    if (voices.length > 0) {
      // Filter for English professional voices
      const englishVoices = voices.filter(v =>
        v.voice_id?.includes('English') || v.language?.toLowerCase().includes('en')
      );

      const professionalVoices = englishVoices.filter(v =>
        v.voice_id?.toLowerCase().includes('professional') ||
        v.voice_id?.toLowerCase().includes('narrator') ||
        v.voice_id?.toLowerCase().includes('insightful') ||
        v.voice_id?.toLowerCase().includes('speaker')
      );

      if (professionalVoices.length > 0) {
        return professionalVoices[0].voice_id;
      }

      if (englishVoices.length > 0) {
        return englishVoices[0].voice_id;
      }

      return voices[0].voice_id;
    }
  } catch (error) {
    console.error('Failed to query voices, using fallback:', error instanceof Error ? error.message : String(error));
  }

  // Fallback to common professional voices
  const fallbackVoices = [
    'English_Insightful_Speaker',
    'English_Professional_Narrator',
    'English_Male_Narrator',
    'English_Female_Narrator',
  ];

  return fallbackVoices[0];
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
