const CONFIG_KEYS = {
  url: 'f1_datasafe_url',
  apiKey: 'f1_datasafe_api_key',
  appName: 'f1_datasafe_app_name',
};

const RESERVED_KEYS = new Set(Object.values(CONFIG_KEYS));

export const getDataSafeConfig = () => ({
  url: localStorage.getItem(CONFIG_KEYS.url) || '',
  apiKey: localStorage.getItem(CONFIG_KEYS.apiKey) || '',
  appName: localStorage.getItem(CONFIG_KEYS.appName) || '',
});

export const setDataSafeConfig = ({ url, apiKey, appName }) => {
  localStorage.setItem(CONFIG_KEYS.url, url);
  localStorage.setItem(CONFIG_KEYS.apiKey, apiKey);
  localStorage.setItem(CONFIG_KEYS.appName, appName);
};

export const isDataSafeConfigured = (config) =>
  Boolean(config.url && config.apiKey && config.appName);

const collectLocalData = () => {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (RESERVED_KEYS.has(key)) continue;
    const raw = localStorage.getItem(key);
    try {
      data[key] = JSON.parse(raw);
    } catch {
      data[key] = raw;
    }
  }
  return data;
};

const downloadJSON = (data, appName) => {
  const filename = `${appName || 'f1-arcade'}-backup-${Date.now()}.json`;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const exportData = async () => {
  const config = getDataSafeConfig();
  const appData = collectLocalData();

  if (!isDataSafeConfigured(config)) {
    downloadJSON(appData, 'f1-arcade');
    return { mode: 'local' };
  }

  const payload = {
    _datasafe: {
      apiKey: config.apiKey,
      url: config.url,
      appName: config.appName,
    },
    ...appData,
  };

  try {
    const response = await fetch(config.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'X-App-Name': config.appName,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`DataSafe a répondu ${response.status}`);
    }

    const result = await response.json();
    return { mode: 'datasafe', result };
  } catch (error) {
    downloadJSON(payload, config.appName);
    return { mode: 'local-fallback', error };
  }
};
