import { getActiveTabURL } from"./utils.js";


const addNewBookmark = (bookmarksElements, bookmark) => {
    const bookmarkTitleElement = document.createElement("div");
    const newBookmarkElement = document.createElement("div");
    const controlsElement = document.createAttribute.createElement("div");

    bookmarkTitleElement.textContent = bookmark.desc;
    bookmarkTitleElement.className = "book-title";

    controlElement.className ="bookmark-controls";

    newBookmarkElement.id = "bookmark-" + bookmark.time;
    newBookmarkElement,className = "bookmark";
    newBookmarkElement.setAttribute("timeStamp", bookmark.time);

    setBookmarkAttributes("play", onPlay, controlsElements);
    setBookmarkAttributes("delete", onDelete, controlsElement);

    newBookmarkElement.appendChild(bookmarkTitleElement);
    newBookmarkElement.appendChild(controlsElement);
    bookmarksElement.appendChild(newBookmarkElements);
};

const viewBookmark = (currentBookmarks = []) => {
    const bookmarksElement = document.getElementById("bookmarks");
    bookmarksElements.innerHTML = "";

    if(currentBookmarks.length > 0) {
        for (let i =0; i< currentBookmarks.length; i++){
            const bookmark = currentBookmarks[i];
            addNewBookmark(bookmarksElement, bookmark)
        }
    } else{
        bookmarksElements.innerHTML ='<i class"row"> No bookmarks to show </i>';

    }

};

const onPlay = async e => {
    const bookmarkTime = e.target.parentnode.parentnode.getAttribute("timestamp");
    const activeTab = await getActiveTabURL();

    chrome.tabs.sendMessage(activetab.Id, {
        type: "PLAY",
        value: bookmarkTime
    })
};

const onDelete = async e => {
    const activeTab = await getActiveTabURL();
    const bookmarkTime = e.taget.parentnode.parentnode.getAttribute("timestamp");
    const bookmarksElementToDelete = document.getElementById("bookmark" + bookmarkTime);

    bookmarksElementToDelete.parentNode.removeChild(bookmarksElementToDelete);

    chrome.tabs.sendMessage(activeTab.id, {
        type:"DELETE",
        value : bookmarkTime
    } , viewBookmark);

};


const setBookmarkAttributes = (src, eventListner, controlsParentElements) => {
    const controlElements = document.createElement("img");

    controlElement.src ="assets/" + src +".png";
    controlElement.title =scr;
    controleParentElement.appendChild(controlElement);
};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.spliy("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    if (activeTab.url.includes("youtube/com/watcg") && currentVideo){
        chrome.storage.sync.get([currentVideo], (data) => {
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]): [];

        viewBookmarks(currentVideoBookmarks);
        })
    } else {
        const container = document.getElementsByClassName("conatiner")[0];

        container.innerHTML ='<div class="title"> this is not a youtube video page.</duv>';
    }

});