import { copyFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const workspaceRoot = process.cwd();
const sourceFile = path.resolve(workspaceRoot, 'src/gamesData.jsx');
const backupFile = path.resolve(workspaceRoot, 'src/gamesData.backup.jsx');

copyFileSync(sourceFile, backupFile);

const moduleUrl = pathToFileURL(sourceFile).href;
const mod = await import(moduleUrl);
const CATEGORY_META = mod.CATEGORY_META;
const RAW_GAMES = mod.RAW_GAMES;
const categoryOrder = CATEGORY_META.map(({ key }) => key);

const gameMap = new Map();
for (const category of categoryOrder) {
  const items = Array.isArray(RAW_GAMES?.[category]) ? RAW_GAMES[category] : [];
  for (const game of items) {
    const title = typeof game?.title === 'string' ? game.title.trim() : '';
    if (!title) continue;
    const key = title.toLowerCase();
    const existing = gameMap.get(key);
    if (!existing) {
      gameMap.set(key, {
        title,
        genre: game.genre,
        price: game.price,
        poster: game.poster,
        categories: [category],
      });
    } else if (!existing.categories.includes(category)) {
      existing.categories.push(category);
    }
  }
}

const gameLibrary = Array.from(gameMap.values());
const lines = [];

lines.push('export const CATEGORY_META = [');
for (const meta of CATEGORY_META) {
  lines.push(`  { "key": ${JSON.stringify(meta.key)}, "accent": ${JSON.stringify(meta.accent)} },`);
}
lines.push('];');
lines.push('');
lines.push('// Optimized dataset: duplicate titles are merged while preserving category assignment.');
lines.push('const GAME_LIBRARY = [');
for (const game of gameLibrary) {
  lines.push(`  { "title": ${JSON.stringify(game.title)}, "genre": ${JSON.stringify(game.genre)}, "price": ${JSON.stringify(game.price)}, "poster": ${JSON.stringify(game.poster)}, "categories": ${JSON.stringify(game.categories)} },`);
}
lines.push('];');
lines.push('');
lines.push('export const RAW_GAMES = Object.fromEntries(');
lines.push('  CATEGORY_META.map(({ key }) => [key, GAME_LIBRARY.filter((game) => game.categories.includes(key)).map(({ categories, ...rest }) => rest)])');
lines.push(');');
lines.push('');

writeFileSync(sourceFile, lines.join('\n'));
console.log(`unique_games=${gameLibrary.length}`);
console.log(`categories=${categoryOrder.join(', ')}`);
console.log(`backup=${backupFile}`);
