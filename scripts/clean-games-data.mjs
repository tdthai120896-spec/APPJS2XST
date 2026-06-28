import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, '..');
const filePath = path.resolve(workspaceRoot, 'src/gamesData.jsx');
const content = fs.readFileSync(filePath, 'utf8');

const normalizeTitle = (title = '') =>
  title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const dedupeAndSortGames = (games = []) => {
  const seen = new Set();
  const result = [];

  for (const game of games) {
    const title = typeof game?.title === 'string' ? game.title.trim() : '';
    const key = normalizeTitle(title);

    if (!title || !key || seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(game);
  }

  return result.sort((a, b) =>
    normalizeTitle(a.title).localeCompare(normalizeTitle(b.title), 'vi', { sensitivity: 'base' })
  );
};

const scriptContent = content.replace(/export const /g, 'const ');

const context = { console };
vm.createContext(context);
vm.runInContext(`${scriptContent}\n__RESULT__ = { CATEGORY_META, RAW_GAMES };`, context, { filename: filePath });

const result = context.__RESULT__ || {};
const rawGames = result.RAW_GAMES || {};
const cleanedGames = Object.fromEntries(
  Object.entries(rawGames).map(([category, games]) => [category, dedupeAndSortGames(games)])
);

const totalGames = Object.values(cleanedGames).reduce((sum, games) => sum + games.length, 0);

const serializeGame = (game) => {
  const properties = Object.entries(game).map(([key, value]) => `${JSON.stringify(key)}: ${JSON.stringify(value)}`);
  return `{ ${properties.join(', ')} }`;
};

const formatRawGames = (gamesByCategory) => {
  const lines = ['export const RAW_GAMES = {'];
  const categories = Object.entries(gamesByCategory);

  categories.forEach(([category, games], categoryIndex) => {
    lines.push(`  ${JSON.stringify(category)}: [`);

    games.forEach((game, gameIndex) => {
      const comma = gameIndex < games.length - 1 ? ',' : '';
      lines.push(`    ${serializeGame(game)}${comma}`);
    });

    lines.push(`  ]${categoryIndex < categories.length - 1 ? ',' : ''}`);
  });

  lines.push('};');
  return lines.join('\n');
};

const formatCategoryMeta = (meta = []) => {
  const lines = ['export const CATEGORY_META = ['];

  meta.forEach((item, index) => {
    const comma = index < meta.length - 1 ? ',' : '';
    lines.push(`  { "key": ${JSON.stringify(item.key)}, "accent": ${JSON.stringify(item.accent)} }${comma}`);
  });

  lines.push('];');
  return lines.join('\n');
};

const output = [
  formatCategoryMeta(result.CATEGORY_META ?? []),
  '',
  formatRawGames(cleanedGames),
  '',
].join('\n');

fs.writeFileSync(filePath, output, 'utf8');
console.log(`Cleaned ${totalGames} unique games across ${Object.keys(cleanedGames).length} categories.`);
