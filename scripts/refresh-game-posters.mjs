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

const buildSteamHeaderUrl = (appId) =>
  `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const probeImageUrl = async (url) => {
  if (!url) return false;
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    });
    const contentType = response.headers.get('content-type') || '';
    return response.ok && contentType.startsWith('image/');
  } catch {
    return false;
  }
};

const resolveSteamAppId = async (title) => {
  const query = encodeURIComponent(title.trim());
  const url = `https://store.steampowered.com/api/storesearch/?term=${query}&l=english&cc=us`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    const app = data?.items?.find((item) => item?.type === 'app' && item?.id);
    return app?.id ?? null;
  } catch {
    return null;
  }
};

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

const titleCache = new Map();
const updatedGames = [];
const totalGames = Object.values(cleanedGames).reduce((sum, games) => sum + games.length, 0);

let processed = 0;

for (const [category, games] of Object.entries(cleanedGames)) {
  for (const game of games) {
    const currentPoster = typeof game?.poster === 'string' ? game.poster : '';
    if (currentPoster) {
      const isValid = await probeImageUrl(currentPoster);
      if (isValid) {
        updatedGames.push(game);
        processed += 1;
        continue;
      }
    }

    const title = typeof game?.title === 'string' ? game.title.trim() : '';
    let appId = null;

    if (titleCache.has(title)) {
      appId = titleCache.get(title);
    } else {
      appId = await resolveSteamAppId(title);
      titleCache.set(title, appId);
      await sleep(120);
    }

    if (appId) {
      game.poster = buildSteamHeaderUrl(appId);
    }

    updatedGames.push(game);
    processed += 1;
  }
}

const rebuiltGames = Object.fromEntries(
  Object.entries(cleanedGames).map(([category, games]) => [category, games])
);

const serializeGame = (game) => {
  const properties = Object.entries(game).map(([key, value]) => `${JSON.stringify(key)}: ${JSON.stringify(value)}`);
  return `{ ${properties.join(', ')} }`;
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

const output = [
  formatCategoryMeta(result.CATEGORY_META ?? []),
  '',
  formatRawGames(rebuiltGames),
  '',
].join('\n');

fs.writeFileSync(filePath, output, 'utf8');
console.log(`Checked ${processed}/${totalGames} games and refreshed poster links where needed.`);
