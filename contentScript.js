(() =>{
    let youLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks =[];

    chrome.runtime.onMessage.addListener((obj, sender, response) =>{
        const {type, value, videoId } = obj;

        if(type ==="NEW") {
            currentVideo = videoId;
            newVideoLoaded();

        } else if (type === "PLAY") {
            youtubePlayer.currentTime = value;
            
        } else if (type === "DELETE"){
            currentVideoBookmarks = currentVideoBookmarks.filter((b) => b.time != value);
            chrome.storage.sync.set({[currentVideo]:JSON.stringify (currentVideoBookmarks)});

            response(currentVideoBookmarks);
        }

    });

    const fetchBookmarks =() => {
        return new Promise((resolve) => {
            chrome.stroage.sync.get([currentVideo], (obj) => {
                resolve(obj [currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            });
        });
    }

    const newVideoLoaded = async() => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        currentVideoBookmarks = await fetchBookmarks();
        if (!bookmarkBtnExists) {
            const bookmarkbtn = document.createElement("img");

            bookmarkbtn.scr = chrome.runtime.getURL("assests/bookmark.png");
            bookmarkbtn.className = "ytp-button" + "bookmark-btn";
            bookmarkbtn.title = "click to bookmakr current timestamp";

            youLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            youLeftControls.appendChild(bookmarkbtn);
            bookmarkbtn.addEventListener("click", addNewBookmarkEventListner);


        }

    }
      const addNewBookmarkEventListner = async() => {
        const currentTime = youtubePlayer.currentTime;
        const newBook = {
            time: currentTime,
            desc: "bookmark at" + getTime(currentTime),

        };

        currentVideoBookmarks = await fetchBookmarks();
        chrome.strong.sync.set({
         [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort ((a,b) => a.time -b.time))
        });
      }
})();

const getTime = t =>{
    var date = new Date(0);
    date.setSeconds(t);
    return date.toISOString().substr(11,8);
    
};




