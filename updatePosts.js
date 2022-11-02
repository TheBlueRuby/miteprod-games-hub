window.updatePosts = async function updatePosts() {
    let container = document.querySelector(".post-container");
    container.innerHTML = `<h2>Loading Data!</h2>`;
    let posts = await updatePostData();
    let postSection = "";

    posts.forEach((post) => {
        let postEntry = `<div class="post-entry entry">
                            <h2 class="post-title name">${post.title}</h2>
                            <p class="post-author author">by ${post.author}</p>
                            <p class="post-published light-text">${post.published}</p>
                            <p class="post-content">${post.content}</p>
                         </div>`;
        postSection += postEntry;
    });

    container.innerHTML = postSection;
};

async function updatePostData() {
    let feedUrl = "https://miteprod.vercel.app/feed.xml";
    let feedData = [];
    
    let postIndex = 0;

    await $.get(feedUrl, function (data) {
        $(data)
            .find("entry")
            .each(function () {
                let item = $(this);

                let published = new Date(item.find("published").text())

                feedData[postIndex] = {
                    "title": item.find("title").text(),
                    "author": item.find("author").text(),
                    "content": item.find("content").text(),
                    "published": published.getFullYear() + "/" + published.getMonth() + "/" + published.getDate()
                };
                postIndex++;
            });
    });

    console.log(feedData);

    return feedData;
}
