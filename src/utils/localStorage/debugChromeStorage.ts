export function debugChromeStorage() {
    chrome.storage.local.get(function (result) {
        console.log(result)
    })
}
