// The onClicked callback function.
function onClickHandler(info, tab) {
    const options = searchWebsite[info["menuItemId"]];
    const word = info["selectionText"];
    const link = options["link"].replace("{word}", word);
    chrome.tabs.create({ url: link });
};

const searchWebsite = {
    "豆瓣电影": {
        "link": "https://search.douban.com/movie/subject_search?search_text={word}"
    },
    "豆瓣读书": {
        "link": "https://search.douban.com/book/subject_search?search_text={word}"
    },
    "豆瓣游戏": {
        "link": "https://www.douban.com/game/explore/?genres=&platforms=&sort=rating&q={word}"
    },
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function () {
    if (Object.keys(searchWebsite).length > 0) {
        var searchId = chrome.contextMenus.create({
            "title": "Search in website", "contexts": ["selection"],
            "id": "search"
        });
        for (const name in searchWebsite) {
            chrome.contextMenus.create({
                "title": name, "contexts": ["selection"],
                "parentId": searchId, "id": name,
            });
        }
    }
});
