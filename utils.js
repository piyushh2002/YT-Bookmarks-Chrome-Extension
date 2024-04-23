export async function  getActiveTabURL() {
    let queryoptions = {active: true, currentWindow: true};
    let [tab] = await chrome.tabs.query(queryoptions);
    return tab;

}