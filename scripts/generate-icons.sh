#!/bin/bash

# Favicon and PWA Icon Generation Script
# Requires ImageMagick (brew install imagemagick)

set -e

echo "🎨 Generating optimized favicons and PWA icons..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is required but not installed."
    echo "Install with: brew install imagemagick"
    exit 1
fi

# Check if source logo exists
SOURCE_LOGO="public/images/final_logo.png"
if [[ ! -f "$SOURCE_LOGO" ]]; then
    echo "❌ Source logo not found at $SOURCE_LOGO"
    exit 1
fi

# Create output directory
mkdir -p public/icons

# Generate standard favicons
echo "📱 Generating standard favicons..."
convert "$SOURCE_LOGO" -resize 16x16 public/favicon-16x16.png
convert "$SOURCE_LOGO" -resize 32x32 public/favicon-32x32.png
convert "$SOURCE_LOGO" -resize 48x48 public/favicon-48x48.png

# Generate Apple touch icons
echo "🍎 Generating Apple touch icons..."
convert "$SOURCE_LOGO" -resize 180x180 public/apple-touch-icon.png
convert "$SOURCE_LOGO" -resize 152x152 public/apple-touch-icon-152x152.png
convert "$SOURCE_LOGO" -resize 144x144 public/apple-touch-icon-144x144.png
convert "$SOURCE_LOGO" -resize 120x120 public/apple-touch-icon-120x120.png
convert "$SOURCE_LOGO" -resize 114x114 public/apple-touch-icon-114x114.png
convert "$SOURCE_LOGO" -resize 76x76 public/apple-touch-icon-76x76.png
convert "$SOURCE_LOGO" -resize 72x72 public/apple-touch-icon-72x72.png
convert "$SOURCE_LOGO" -resize 60x60 public/apple-touch-icon-60x60.png
convert "$SOURCE_LOGO" -resize 57x57 public/apple-touch-icon-57x57.png

# Generate PWA icons
echo "📱 Generating PWA icons..."
convert "$SOURCE_LOGO" -resize 192x192 public/icons/icon-192x192.png
convert "$SOURCE_LOGO" -resize 512x512 public/icons/icon-512x512.png
convert "$SOURCE_LOGO" -resize 384x384 public/icons/icon-384x384.png
convert "$SOURCE_LOGO" -resize 256x256 public/icons/icon-256x256.png
convert "$SOURCE_LOGO" -resize 128x128 public/icons/icon-128x128.png
convert "$SOURCE_LOGO" -resize 96x96 public/icons/icon-96x96.png
convert "$SOURCE_LOGO" -resize 72x72 public/icons/icon-72x72.png
convert "$SOURCE_LOGO" -resize 48x48 public/icons/icon-48x48.png

# Generate maskable icons (with padding for Android)
echo "🎭 Generating maskable icons..."
convert "$SOURCE_LOGO" -resize 160x160 -background transparent -gravity center -extent 192x192 public/icons/maskable-icon-192x192.png
convert "$SOURCE_LOGO" -resize 420x420 -background transparent -gravity center -extent 512x512 public/icons/maskable-icon-512x512.png

# Generate Windows tiles
echo "🪟 Generating Windows tiles..."
convert "$SOURCE_LOGO" -resize 144x144 public/icons/mstile-144x144.png
convert "$SOURCE_LOGO" -resize 70x70 public/icons/mstile-70x70.png
convert "$SOURCE_LOGO" -resize 150x150 public/icons/mstile-150x150.png
convert "$SOURCE_LOGO" -resize 310x150 -background transparent -gravity center public/icons/mstile-310x150.png
convert "$SOURCE_LOGO" -resize 310x310 public/icons/mstile-310x310.png

# Generate ICO file for legacy browsers
echo "🔧 Generating ICO file..."
convert public/favicon-16x16.png public/favicon-32x32.png public/favicon-48x48.png public/favicon.ico

# Optimize PNG files
echo "🗜️ Optimizing PNG files..."
if command -v pngquant &> /dev/null; then
    find public -name "*.png" -exec pngquant --force --ext .png {} \;
    echo "✅ PNG optimization complete"
else
    echo "⚠️ pngquant not found. Install with: brew install pngquant"
fi

# Generate WebP versions for modern browsers
echo "🌐 Generating WebP versions..."
if command -v cwebp &> /dev/null; then
    find public/icons -name "*.png" -exec sh -c 'cwebp -q 80 "$1" -o "${1%.png}.webp"' _ {} \;
    echo "✅ WebP generation complete"
else
    echo "⚠️ cwebp not found. Install with: brew install webp"
fi

echo "✅ Icon generation complete!"
echo "📊 Generated files:"
find public -name "*.png" -o -name "*.ico" -o -name "*.webp" | sort