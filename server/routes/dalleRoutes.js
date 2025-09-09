import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello from ClipDrop Image Generator!');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      { prompt },
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer', // Get image as binary
      }
    );

    // Convert to base64
    const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');

    res.status(200).json({ photo: imageBase64 });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

export default router;
