import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { enableTailwind } from '@remotion/tailwind';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import fs from 'fs/promises';

// ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RenderParams {
  inputProps: Record<string, any>;
  outputFileName: string;
}

interface RenderResult {
  videoPath: string;
  duration: number;
  fileSize: number;
  thumbnailUrl?: string;
}

export async function renderVideo(params: RenderParams): Promise<RenderResult> {
  // Always use the Generated composition (dynamically created by Claude)
  const compositionId = 'Generated';
  console.error(`Rendering video: ${compositionId}`);

  const { inputProps, outputFileName } = params;

  // Get Remotion project path
  const remotionProjectPath = process.env.REMOTION_PROJECT_PATH || path.join(__dirname, '../../../remotion-project');
  const outputDir = process.env.REMOTION_OUTPUT_PATH || path.join(os.homedir(), 'Videos', 'url-to-video');

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Output path
  const outputPath = path.join(outputDir, `${outputFileName}.mp4`);

  console.error(`Project: ${remotionProjectPath}`);
  console.error(`Output: ${outputPath}`);

  // Step 1: Bundle Remotion project
  console.error('Bundling Remotion project...');
  const bundleLocation = await bundle({
    entryPoint: path.join(remotionProjectPath, 'src/index.ts'),
    // CRITICAL: Apply Tailwind webpack override for CSS processing
    webpackOverride: (config) => enableTailwind(config),
  });

  console.error(`✓ Bundled to: ${bundleLocation}`);

  // Step 2: Select composition
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
    inputProps,
  });

  console.error(`✓ Composition: ${composition.id} (${composition.width}x${composition.height}, ${composition.durationInFrames} frames = ${(composition.durationInFrames / composition.fps).toFixed(1)}s)`);

  // Step 3: Render video
  console.error('Rendering video...');
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: outputPath,
    inputProps,
    onProgress: ({ progress }) => {
      console.error(`Rendering: ${(progress * 100).toFixed(1)}%`);
    },
  });

  console.error(`✓ Video rendered: ${outputPath}`);

  // Get file size
  const stats = await fs.stat(outputPath);
  const fileSize = stats.size;

  // Calculate duration
  const duration = composition.durationInFrames / composition.fps;

  return {
    videoPath: outputPath,
    duration,
    fileSize,
  };
}
