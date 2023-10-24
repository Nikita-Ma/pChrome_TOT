export function getLocalStorage(key: string): Promise<Object | boolean | string> {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, (result) => {
            const value = result[key];
            if (value !== undefined) {
                resolve(value);
            } else {
                console.log(`Key '${key}' not found in local storage.`);
                resolve(false);
            }
        });
    });
}
