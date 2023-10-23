export function deleteChromeStorage(key: string) {
    chrome.storage.local.remove(key, function () {
        console.log('Ключ ' + key + ' удален из локального хранилища.');
    });
}


