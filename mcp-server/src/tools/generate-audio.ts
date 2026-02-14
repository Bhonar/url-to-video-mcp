import axios from 'axios';
import { detectBeats } from '../utils/beat-detection.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
// ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface AudioGenerationParams {
  musicStyle: string;
  narrationScript: string;
  duration: number;
}

interface AudioResult {
  music: {
    url: string;
    localPath: string;
    staticPath: string; // Path relative to remotion-project/public/ for staticFile()
    duration: number;
  };
  narration: {
    url: string;
    localPath: string;
    staticPath: string; // Path relative to remotion-project/public/ for staticFile()
    timecodes: Array<{ start: number; end: number; text: string }>;
  };
  beats: number[];
  warnings: string[]; // Diagnostic messages surfaced to agent
}

export async function generateAudio(params: AudioGenerationParams): Promise<AudioResult> {
  console.error(`Generating audio: ${params.musicStyle} style, ${params.duration}s`);

  const { musicStyle, narrationScript, duration } = params;
  const warnings: string[] = [];

  // Generate background music (instrumental with structural lyrics)
  const music = await generateMusic(musicStyle, duration, warnings);

  // Generate narration (text-to-speech with intelligent voice selection)
  const narration = await generateNarration(narrationScript, warnings);

  // Detect beats from music for transition sync
  const beats = music.localPath
    ? await detectBeats(music.localPath)
    : createPlaceholderBeats(duration);

  if (!music.localPath) {
    warnings.push('Using placeholder beats (no music file for beat detection)');
  }

  console.error(`✓ Generated audio: ${beats.length} beats detected, ${warnings.length} warnings`);

  return {
    music,
    narration,
    beats,
    warnings,
  };
}

function createPlaceholderBeats(duration: number): number[] {
  const beats: number[] = [];
  for (let i = 1.0; i < duration; i += 1.2) {
    beats.push(i);
  }
  return beats;
}

async function generateMusic(style: string, duration: number, warnings: string[]): Promise<AudioResult['music']> {
  console.error('Generating background music...');

  // Strategy 1: Try ElevenLabs (free tier available)
  const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
  if (elevenLabsKey) {
    try {
      const result = await generateMusicElevenLabs(style, duration, elevenLabsKey, warnings);
      if (result) return result;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error('ElevenLabs music failed:', msg);
      warnings.push(`ElevenLabs music failed: ${msg}`);
    }
  }

  // Strategy 2: Try MiniMax
  const minimaxKey = process.env.MINIMAX_API_KEY;
  if (minimaxKey) {
    try {
      const result = await generateMusicMiniMax(style, duration, minimaxKey, warnings);
      if (result) return result;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error('MiniMax music failed:', msg);
      warnings.push(`MiniMax music failed: ${msg}`);
    }
  }

  if (!elevenLabsKey && !minimaxKey) {
    warnings.push('No music API key configured. Set ELEVENLABS_API_KEY (free tier) or MINIMAX_API_KEY in .env');
  }

  warnings.push('Music generation skipped — video will have no background music');
  return { url: '', localPath: '', staticPath: '', duration };
}

async function generateMusicElevenLabs(
  style: string,
  duration: number,
  apiKey: string,
  warnings: string[],
): Promise<AudioResult['music'] | null> {
  const prompt = createMusicPrompt(style, duration);
  const durationMs = duration * 1000;

  console.error(`Using ElevenLabs Music (${style}, ${duration}s)...`);

  const response = await axios.post(
    'https://api.elevenlabs.io/v1/music',
    {
      prompt,
      model_id: 'music_v1',
      music_length_ms: durationMs,
      force_instrumental: true,
      output_format: 'mp3_44100_128',
    },
    {
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      responseType: 'arraybuffer',
      timeout: 120000, // Music generation can take longer
    }
  );

  const buffer = Buffer.from(response.data);
  if (buffer.length < 1000) {
    const text = buffer.toString('utf-8');
    console.error('⚠️  ElevenLabs returned non-audio response:', text.substring(0, 200));
    warnings.push(`ElevenLabs music returned non-audio response (${buffer.length} bytes): ${text.substring(0, 100)}`);
    return null;
  }

  const { localPath, staticPath } = await saveAudioBuffer(buffer, 'music');

  console.error(`✓ ElevenLabs music saved (${(buffer.length / 1024).toFixed(0)} KB)`);

  return {
    url: '',
    localPath,
    staticPath,
    duration,
  };
}

async function generateMusicMiniMax(
  style: string,
  duration: number,
  apiKey: string,
  warnings: string[],
): Promise<AudioResult['music'] | null> {
  const groupId = process.env.MINIMAX_GROUP_ID;
  const lyrics = createInstrumentalLyrics(duration);
  const prompt = createMusicPrompt(style, duration);

  console.error(`Using MiniMax Music (${style}, ${duration}s)...`);

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  if (groupId) {
    headers['X-Group-Id'] = groupId;
  }

  const response = await axios.post(
    'https://api.minimax.io/v1/music_generation',
    {
      model: 'music-2.5',
      lyrics,
      prompt,
      duration,
      output_format: 'url',
    },
    { headers }
  );

  if (response.data.base_resp?.status_code !== 0) {
    const errorMsg = response.data.base_resp?.status_msg || 'Unknown error';
    console.error(`⚠️  MiniMax music failed: ${errorMsg}`);
    warnings.push(`MiniMax music API error: ${errorMsg}`);
    return null;
  }

  const audioUrl = response.data.data?.audio || response.data.audio_url || response.data.url;
  if (!audioUrl) {
    console.error('⚠️  No audio URL in MiniMax response');
    warnings.push('MiniMax music returned success but no audio URL in response');
    return null;
  }

  const { localPath, staticPath } = await downloadAudio(audioUrl, 'music');

  console.error('✓ MiniMax music saved');

  return {
    url: audioUrl,
    localPath,
    staticPath,
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

async function generateNarration(script: string, warnings: string[]): Promise<AudioResult['narration']> {
  console.error('Generating narration...');

  // Strategy 1: Try ElevenLabs (free tier available, best quality)
  const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
  if (elevenLabsKey) {
    try {
      const result = await generateNarrationElevenLabs(script, elevenLabsKey, warnings);
      if (result) return result;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error('ElevenLabs failed:', msg);
      warnings.push(`ElevenLabs narration failed: ${msg}`);
    }
  }

  // Strategy 2: Try MiniMax
  const minimaxKey = process.env.MINIMAX_API_KEY;
  if (minimaxKey) {
    try {
      const result = await generateNarrationMiniMax(script, minimaxKey, warnings);
      if (result) return result;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error('MiniMax TTS failed:', msg);
      warnings.push(`MiniMax narration failed: ${msg}`);
    }
  }

  // No TTS provider available
  if (!elevenLabsKey && !minimaxKey) {
    warnings.push('No TTS API key configured. Set ELEVENLABS_API_KEY (free tier) or MINIMAX_API_KEY in .env');
  }

  warnings.push('Narration generation skipped — video will have no voiceover');
  return { url: '', localPath: '', staticPath: '', timecodes: [] };
}

async function generateNarrationElevenLabs(
  script: string,
  apiKey: string,
  warnings: string[],
): Promise<AudioResult['narration'] | null> {
  // ElevenLabs premade voices (professional narration)
  const voiceId = process.env.ELEVENLABS_VOICE_ID || 'onwK4e9ZLuTAKqWW03F9'; // Daniel - professional male

  console.error(`Using ElevenLabs TTS (voice: ${voiceId})...`);

  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      text: script,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.6,
        similarity_boost: 0.75,
      },
    },
    {
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      responseType: 'arraybuffer',
      timeout: 60000,
    }
  );

  // ElevenLabs returns binary audio directly
  const buffer = Buffer.from(response.data);
  if (buffer.length < 1000) {
    // Likely an error response, not audio
    const text = buffer.toString('utf-8');
    console.error('⚠️  ElevenLabs returned non-audio response:', text.substring(0, 200));
    warnings.push(`ElevenLabs TTS returned non-audio response (${buffer.length} bytes): ${text.substring(0, 100)}`);
    return null;
  }

  // Save to remotion-project/public/audio/
  const { localPath, staticPath } = await saveAudioBuffer(buffer, 'narration');
  const timecodes = createNarrationTimecodes(script);

  console.error(`✓ ElevenLabs narration saved (${(buffer.length / 1024).toFixed(0)} KB)`);

  return {
    url: '',
    localPath,
    staticPath,
    timecodes,
  };
}

async function generateNarrationMiniMax(
  script: string,
  apiKey: string,
  warnings: string[],
): Promise<AudioResult['narration'] | null> {
  const groupId = process.env.MINIMAX_GROUP_ID;

  console.error('Using MiniMax TTS...');

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
  if (groupId) {
    headers['X-Group-Id'] = groupId;
  }

  const response = await axios.post(
    'https://api.minimax.io/v1/t2a_v2',
    {
      model: 'speech-02-hd',
      text: script,
      voice_setting: {
        voice_id: 'male-qn-qingse',
        speed: 1.0,
      },
      audio_setting: {
        format: 'mp3',
        sample_rate: 32000,
      },
    },
    { headers }
  );

  if (response.data.base_resp?.status_code !== 0) {
    const errorMsg = response.data.base_resp?.status_msg || 'Unknown error';
    console.error(`⚠️  MiniMax TTS failed: ${errorMsg}`);
    warnings.push(`MiniMax TTS API error: ${errorMsg}`);
    return null;
  }

  const audioUrl = response.data.data?.audio || response.data.data?.audio_file?.url;
  if (!audioUrl) {
    console.error('⚠️  No audio URL in MiniMax response');
    warnings.push('MiniMax TTS returned success but no audio URL in response');
    return null;
  }

  const { localPath, staticPath } = await downloadAudio(audioUrl, 'narration');
  const timecodes = createNarrationTimecodes(script);

  console.error('✓ MiniMax narration saved');

  return {
    url: audioUrl,
    localPath,
    staticPath,
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

async function downloadAudio(url: string, prefix: string): Promise<{ localPath: string; staticPath: string }> {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data);
  return saveAudioBuffer(buffer, prefix);
}

async function saveAudioBuffer(buffer: Buffer, prefix: string): Promise<{ localPath: string; staticPath: string }> {
  // Save to remotion-project/public/audio/ so Remotion can access via staticFile()
  const remotionProjectPath = process.env.REMOTION_PROJECT_PATH || path.join(__dirname, '../../../remotion-project');
  const publicAudioDir = path.join(remotionProjectPath, 'public', 'audio');
  await fs.mkdir(publicAudioDir, { recursive: true });

  const fileName = `${prefix}-${Date.now()}.mp3`;
  const localPath = path.join(publicAudioDir, fileName);

  await fs.writeFile(localPath, buffer);

  const staticPath = `audio/${fileName}`; // Relative to public/ for staticFile()

  console.error(`✓ Saved ${prefix} to: ${localPath} (staticPath: ${staticPath})`);

  return { localPath, staticPath };
}
