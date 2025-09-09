import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';


function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}



const getRandomPrompt = (prompt) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];
  if (randomPrompt === prompt) return getRandomPrompt(prompt);
  return randomPrompt;
};

export { getRandomPrompt };

export async function downloadImage(photo, prompt = 'image') {
  const slug = slugify(prompt);
  const filename = `${slug || 'image'}.jpg`;

  if (photo.startsWith('http://')) {
    photo = photo.replace('http://', 'https://');
  }

  try {
    const response = await fetch(photo, { mode: 'cors' });
    if (!response.ok) throw new Error('Network response was not ok');

    const blob = await response.blob();
    FileSaver.saveAs(blob, filename);
  } catch (error) {
    console.error('Download failed:', error);
  }
}







