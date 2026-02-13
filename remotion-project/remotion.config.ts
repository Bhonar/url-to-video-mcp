import { Config } from '@remotion/cli/config';
import { enableTailwind } from '@remotion/tailwind';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setCodec('h264');

// Enable Tailwind CSS
Config.overrideWebpackConfig((currentConfiguration) => {
  return enableTailwind(currentConfiguration);
});
