export function setLocalStorage(key: string, value: Object) {

    const data: { [key: string]: Object } = {};
    data[key] = value;

    chrome.storage.local.set(data, () => {
        console.log(`Key '${key}' with value '${value}' set in local storage.`);
    });
}

