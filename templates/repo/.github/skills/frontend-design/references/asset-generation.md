# Asset Processing Workflow

Complete workflow for processing design assets using CLI tools (ImageMagick, FFmpeg, RMBG).

## Processing Workflow

### Step 1: Define Design Context

Before processing, extract from the design brief:
- **Aesthetic direction**: Minimalist? Maximalist? Brutalist? Organic?
- **Color palette**: Primary colors, accent colors, mood
- **Visual tone**: Professional? Playful? Luxury? Raw?
- **Output requirements**: Formats, sizes, optimization targets

### Step 2: Source Assets

Get assets from:
- Client-provided images/videos
- Stock photo services (Unsplash, Pexels)
- Design tools exports (Figma, Sketch)
- Screenshots or captured frames

### Step 3: Process Assets with CLI Tools

Use these CLI tools:

**Image Processing (ImageMagick)**:
```bash
# Resize for web
convert input.png -resize 1920x1080 output.png

# Convert format
convert input.png output.webp

# Apply color adjustments
convert input.png -modulate 100,110,100 output.png

# Add border/padding
convert input.png -bordercolor white -border 20 output.png

# Create thumbnail
convert input.png -thumbnail 300x200 thumbnail.png
```

**Background Removal (RMBG CLI)**:
```bash
# Remove background from image
rmbg input.png output.png

# Batch process directory
rmbg -i ./input/ -o ./output/
```

**Video Processing (FFmpeg)**:
```bash
# Extract frame from video
ffmpeg -i video.mp4 -ss 00:00:05 -frames:v 1 frame.png

# Create thumbnail grid
ffmpeg -i video.mp4 -frames 1 -vf "select=not(mod(n\,100)),scale=200:120,tile=5x3" grid.png

# Convert to web format
ffmpeg -i input.mp4 -c:v libx264 -crf 23 output.mp4

# Create animated GIF
ffmpeg -i video.mp4 -vf "fps=10,scale=480:-1" output.gif
```

### Step 4: Optimize for Web

**Image Optimization**:
```bash
# PNG optimization
pngquant --quality=65-80 input.png -o output.png

# JPEG optimization
convert input.jpg -quality 85 output.jpg

# WebP conversion (smaller file size)
convert input.png -quality 80 output.webp
```

**Responsive Variants**:
```bash
# Create multiple sizes
convert hero.png -resize 1920x output/hero-lg.png
convert hero.png -resize 1280x output/hero-md.png
convert hero.png -resize 768x output/hero-sm.png
convert hero.png -resize 480x output/hero-xs.png
```

### Step 5: Verify Quality

After processing, verify:
- File sizes are optimized (target < 200KB for images)
- Colors match design palette
- Resolution appropriate for use case
- No compression artifacts visible
- Transparent backgrounds work correctly

## Common Asset Tasks

### Background Removal for Product Images
```bash
# Single image
rmbg product.jpg product-nobg.png

# Batch process
for f in products/*.jpg; do rmbg "$f" "output/$(basename "$f" .jpg).png"; done
```

### Hero Image Optimization
```bash
# Full workflow
convert original.png -resize 1920x1080^ -gravity center -extent 1920x1080 hero-lg.png
convert hero-lg.png -quality 85 hero-lg.webp
convert original.png -resize 768x -quality 85 hero-sm.webp
```

### Sprite Sheet Creation
```bash
# Combine multiple images into sprite
convert icon-*.png +append sprite.png

# With grid layout
montage icon-*.png -tile 4x -geometry +0+0 sprite.png
```

### Video Thumbnail
```bash
# Extract best frame (usually around 25% in)
ffmpeg -i video.mp4 -ss 00:00:03 -frames:v 1 thumbnail.jpg
```

## File Format Guidelines

| Format | Use Case | Notes |
|--------|----------|-------|
| WebP | Web images (default) | Best compression, wide support |
| PNG | Images with transparency | Use for icons, logos |
| JPEG | Photos without transparency | Good for large images |
| SVG | Icons, simple graphics | Scalable, smallest for simple shapes |
| MP4 (H.264) | Web video | Universal support |
| WebM | Modern browsers | Better compression than MP4 |
| GIF | Simple animations | Limited colors, larger files |

## Quality vs Size Targets

| Asset Type | Target Size | Quality Setting |
|------------|-------------|-----------------|
| Hero image | < 200KB | 80-85% |
| Thumbnails | < 50KB | 75-80% |
| Icons | < 10KB | PNG or SVG |
| Product images | < 150KB | 80-85% |
| Background patterns | < 100KB | 70-80% |

## Next Steps

- **Verify visual quality**: Compare processed assets to originals
- **Test across devices**: Ensure responsive variants work
- **Document assets**: Keep track of source files and processing steps
