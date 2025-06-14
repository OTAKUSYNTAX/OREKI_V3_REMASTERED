const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { randomUUID } = require('crypto');
const { tmpdir } = require('os');  // Make sure this is imported
const Crypto = require('crypto');  // Ensure Crypto is imported
const fluentFfmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

// Set FFmpeg path
fluentFfmpeg.setFfmpegPath(ffmpegPath);

// Function to run FFmpeg with provided arguments
function runFFmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, '../lib', Date.now() + '.' + ext);
      let out = tmp + '.' + ext2;
      
      // Write the buffer to the temp file
      await fs.promises.writeFile(tmp, buffer);

      spawn('ffmpeg', [
        '-y',
        '-i', tmp,
        ...args,
        out
      ])
        .on('error', reject)
        .on('close', async (code) => {
          try {
            await fs.promises.unlink(tmp);
            if (code !== 0) return reject(new Error(`FFmpeg exited with code ${code}`));
            
            const result = await fs.promises.readFile(out);
            await fs.promises.unlink(out);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}

// Convert audio to WhatsApp-compatible audio (MP3)
function toAudio(buffer, ext) {
  return runFFmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3'
  ], ext, 'mp3');
}

// Convert audio to WhatsApp PTT format (Opus)
function toPTT(buffer, ext) {
  return runFFmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus');
}

// Convert WebP sticker to video (MP4)
function webpToVideo(buffer) {
  return new Promise(async (resolve, reject) => {
    try {
      const inputPath = path.join(__dirname, `../lib/${randomUUID()}.webp`);
      const outputPath = path.join(__dirname, `../lib/${randomUUID()}.mp4`);
      
      // Write the WebP buffer to disk
      await fs.promises.writeFile(inputPath, buffer);

      fluentFfmpeg(inputPath)
        .videoCodec('libx264')
        .outputOptions([
          '-crf 28',
          '-preset veryfast',
          '-pix_fmt yuv420p'
        ])
        .on('end', async () => {
          try {
            const data = await fs.promises.readFile(outputPath);
            await fs.promises.unlink(inputPath);
            await fs.promises.unlink(outputPath);
            resolve(data);
          } catch (err) {
            reject(err);
          }
        })
        .on('error', async (err) => {
          await fs.promises.unlink(inputPath).catch(() => {});
          reject(err);
        })
        .save(outputPath);
    } catch (err) {
      reject(err);
    }
  });
}

// Export the functions for use in other files
module.exports = {
  toAudio,
  toPTT,
  webpToVideo,
  ffmpeg: runFFmpeg
};