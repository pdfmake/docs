import fs from 'node:fs/promises';

export function resolveVersion(config, requested = config.current) {
  if (new URL(config.origin).protocol !== 'https:') throw new Error('Documentation origin must use HTTPS');
  const ids = new Set();
  for (const release of config.releases) {
    if (!/^\d+\.\d+$/.test(release.id) || ids.has(release.id)) throw new Error('Invalid or duplicate documentation version');
    if (!['current', 'supported', 'legacy', 'preview'].includes(release.status)) throw new Error('Invalid version status');
    ids.add(release.id);
  }
  if (!ids.has(config.current) || !/^\d+\.\d+$/.test(config.sourceVersion)) throw new Error('Invalid current/source version');
  const release = config.releases.find(item => item.id === requested);
  if (!release?.managed) throw new Error(`No managed documentation snapshot for version ${requested}`);
  if (!release.ref || !new RegExp(`^${release.id.replace('.', '\\.')}\\.\\d+(?:-[\\w.-]+)?$`).test(release.libraryVersion)) throw new Error('Library version must match the documentation series');
  const basePath = `/docs/${release.id}/`;
  return { ...release, basePath, baseURL: new URL(basePath, config.origin).href, sourceBasePath: `/docs/${config.sourceVersion}/` };
}

export const versionConfig = JSON.parse(await fs.readFile(new URL('../versions.json', import.meta.url), 'utf8'));
export const activeVersion = resolveVersion(versionConfig, process.env.DOCS_VERSION || versionConfig.current);
export const basePath = activeVersion.basePath;
export const baseURL = activeVersion.baseURL;
export function versionTargets(page, config = versionConfig) {
  return config.releases.map(release => {
    const sameVersion = release.id === page.version;
    const sameChapter = sameVersion || release.chapters?.includes(page.translationKey);
    const language = sameVersion || release.languages?.includes(page.language) ? page.language : 'en';
    const prefix = language === 'en' ? '' : `${language}/`;
    const chapter = sameChapter && page.translationKey !== 'index' ? `${page.translationKey}/` : '';
    return { id: release.id, label: release.label, current: sameVersion, sameChapter: !!sameChapter,
      url: release.managed ? `/docs/${release.id}/${prefix}${chapter}` : new URL(`/docs/${release.id}/${prefix}${chapter}`, config.origin).href };
  });
}
// Authored links remain relative to their source snapshot; code/API examples are never rewritten.
export function rebaseLinks(text, version = activeVersion) {
  let closingFence;
  return text.split('\n').map(line => {
    if (closingFence) {
      if (closingFence.test(line)) closingFence = undefined;
      return line;
    }
    const opening = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (opening) {
      const fence = opening[1];
      closingFence = new RegExp(`^ {0,3}${fence[0]}{${fence.length},}[ \\t\\r]*$`);
      return line;
    }
    return line.replaceAll(version.sourceBasePath, version.basePath);
  }).join('\n');
}
