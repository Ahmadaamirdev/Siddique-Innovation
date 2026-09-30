import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables from .env if present
function loadEnv() {
  const envPath = path.join(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnv();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

if (!cloudName || (!uploadPreset && (!apiKey || !apiSecret))) {
  console.error('\n❌ Missing Cloudinary Configuration!');
  console.error('Please configure your credentials in .env:\n');
  console.error('Option A (API Key & Secret):');
  console.error('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
  console.error('  CLOUDINARY_API_KEY=your_api_key');
  console.error('  CLOUDINARY_API_SECRET=your_api_secret\n');
  console.error('Option B (Unsigned Preset):');
  console.error('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
  console.error('  CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset\n');
  process.exit(1);
}

const assetsToUpload = [
  // Core branding
  { localPath: 'src/assets/logo.png', id: 'logo', type: 'image' },
  { localPath: 'src/assets/brand_logo.png', id: 'brand_logo', type: 'image' },
  // Hero & background images
  { localPath: 'src/assets/hero_bg.png', id: 'hero_bg', type: 'image' },
  { localPath: 'src/assets/hero.png', id: 'hero', type: 'image' },
  { localPath: 'src/assets/contact_hero_bg.jpg', id: 'contact_hero_bg', type: 'image' },
  // Showcase & Project images
  { localPath: 'src/assets/dwatson_furniture.png', id: 'dwatson_furniture', type: 'image' },
  { localPath: 'src/assets/dwatson_storefront.jpg', id: 'dwatson_storefront', type: 'image' },
  { localPath: 'src/assets/ai_automation_workflow.jpg', id: 'ai_automation_workflow', type: 'image' },
  { localPath: 'src/assets/seo_growth_dashboard.jpg', id: 'seo_growth_dashboard', type: 'image' },
  // Videos
  { localPath: 'public/videos/testimonial-1.mp4', id: 'testimonial_1', type: 'video' },
  { localPath: 'public/videos/testimonial-2.mp4', id: 'testimonial_2', type: 'video' },
  { localPath: 'public/videos/testimonial-3.mp4', id: 'testimonial_3', type: 'video' },
];

function generateSignature(params, secret) {
  const sortedKeys = Object.keys(params).sort();
  const paramString = sortedKeys.map((key) => `${key}=${params[key]}`).join('&');
  return crypto.createHash('sha1').update(paramString + secret).digest('hex');
}

async function uploadFile(asset) {
  const absolutePath = path.join(rootDir, asset.localPath);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`⚠️ File not found, skipping: ${asset.localPath}`);
    return null;
  }

  const resourceType = asset.type === 'video' ? 'video' : 'image';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const timestamp = Math.floor(Date.now() / 1000);
  const formData = new FormData();
  const fileBlob = new Blob([fs.readFileSync(absolutePath)]);

  formData.append('file', fileBlob, path.basename(absolutePath));

  if (uploadPreset) {
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'siddiqui-innovations');
    formData.append('public_id', asset.id);
  } else {
    const paramsToSign = {
      folder: 'siddiqui-innovations',
      public_id: asset.id,
      timestamp: timestamp,
    };
    const signature = generateSignature(paramsToSign, apiSecret);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('folder', 'siddiqui-innovations');
    formData.append('public_id', asset.id);
    formData.append('signature', signature);
  }

  console.log(`⏳ Uploading ${asset.localPath} to Cloudinary [${asset.id}]...`);
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to upload ${asset.localPath}: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const result = await response.json();
  console.log(`✅ Uploaded: ${result.secure_url}`);
  return {
    id: asset.id,
    localPath: asset.localPath,
    secureUrl: result.secure_url,
    publicId: result.public_id,
    format: result.format,
    bytes: result.bytes,
    resourceType: result.resource_type,
  };
}

async function main() {
  console.log(`🚀 Starting Cloudinary Asset Upload for "${cloudName}"...`);
  const results = {};

  for (const asset of assetsToUpload) {
    try {
      const res = await uploadFile(asset);
      if (res) {
        results[asset.id] = res;
      }
    } catch (err) {
      console.error(`❌ Error uploading ${asset.id}:`, err.message);
    }
  }

  // Generate TypeScript asset catalog
  const outputPath = path.join(rootDir, 'src', 'data', 'cloudinaryAssets.ts');
  const tsContent = `/**
 * Cloudinary Optimized Asset Mapping
 * Auto-generated by scripts/upload-to-cloudinary.mjs
 */

export const CLOUDINARY_BASE = 'https://res.cloudinary.com/${cloudName}';

// Helper to append auto-format and auto-quality transformations
export const getOptimizedMediaUrl = (publicId: string, options: { width?: number; quality?: string; format?: string; resourceType?: 'image' | 'video' } = {}) => {
  const { width, quality = 'auto', format = 'auto', resourceType = 'image' } = options;
  const transforms = ['f_' + format, 'q_' + quality];
  if (width) transforms.push('w_' + width);
  return \`\${CLOUDINARY_BASE}/\${resourceType}/upload/\${transforms.join(',')}/\${publicId}\`;
};

export const CLOUDINARY_ASSETS = {
${Object.entries(results)
  .map(([key, val]) => `  ${key}: {
    url: '${val.secureUrl}',
    publicId: '${val.publicId}',
    resourceType: '${val.resourceType}',
  },`)
  .join('\n')}
} as const;
`;

  fs.writeFileSync(outputPath, tsContent, 'utf-8');
  console.log(`\n🎉 Upload complete! Asset dictionary written to: src/data/cloudinaryAssets.ts`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
