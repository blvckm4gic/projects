{/* <div class="post">
<div class="info">
    <div class="author">
        <img src="img/avatar.png" alt="" class="avatar">
        <div class="author-text">Authors name <span class="in">in</span> Topics Name · <span class="july">7 July</span></div>
    </div>
    <div class="title">7 Practical CSS Tips</div>
    <div class="title-text-2">
        Recently, I’ve been automating tasks more than often due to my lack of time. Thanks to that I have 5 new projects that I classified as beginner, intermediate, and advanced.
        You’ll find links to the full scripts and tutorials to solve each project. Also, I’m leaving a challenge to each of them to test your Python skills.To make things easier, I already created a template for a cover letter. Here’s how the template we’ll use looks...
    </div>
    <div class="under-panel">
        <div class="under-panel-buttons">
            <div class="javascript">Java Script</div>
            <div class="min">12 min read</div>
            <div> · </div>
            <div class="selected">Selected for you</div>
        </div>
        <div class="box">
            <div class="color-box"></div>
            <div class="color-box"></div>
            <div class="color-box"></div>
        </div>
    </div>
</div>

<div class="photo">
    <img src="img/3.png" alt="" class="photo3">
</div>
</div> */}


document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
  });
  
  async function loadPosts() {
    try {
      const response = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=xnTBQUNTE6hxNFT5jfAqxd4lhYLkNeGp');
      const data = await response.json(); // получаем всё
      const posts = data.response.docs;   // достаём массив статей
  
      console.log(data);
  
      const container = document.getElementById('posts-container');
      posts.forEach((post,index) => {
        // Проверяем, есть ли мультимедиа (изображения)
        const imageUrl = post.multimedia?.thumbnail?.url 
        ? post.multimedia.thumbnail.url 
        : null;
        
        
        console.log(imageUrl)

        console.log("Multimedia:", post.multimedia);
  
        const postElement = document.createElement('div');
        console.log(post); // Логируем весь пост для отладки

        const publishDate = new Date(post.pub_date);
        const formattedDate = publishDate.toLocaleDateString();
        
        postElement.classList.add('post')
        postElement.innerHTML = `
            <div class="info">
                <div class="author">
                    <img src="img/avatar.png" alt="" class="avatar">
                    <div class="author-text">${post.byline.original}<span class="in">in</span> ${post.news_desk} · <span class="july">${formattedDate}</span></div>
                </div>
                <div class="title clickable">${post.headline.main}</div>
                <div class="title-text-2">
                    ${post.snippet}
                </div>
                <div class="under-panel">
                    <div class="under-panel-buttons">
                        <div class="javascript">${post.section_name}</div>
                        <div class="min">${Math.floor(post.word_count / 200)} min read</div>
                        <div> · </div>
                        <div class="selected">Selected for you</div>
                    </div>
                    <div class="box">
                        <div class="color-box"></div>
                        <div class="color-box"></div>
                        <div class="color-box"></div>
                    </div>
                </div>
            </div>
              <div class="photo">   
            ${imageUrl 
            ? `<img src="${imageUrl}" alt="Article image" class="photo1" style="max-width: 300px;">` 
            : `<div style="width: 300px; height: 200px; background-color: gray;">No image available</div>`}
                </div>
            </div>
          </div>
        `;
        
        container.appendChild(postElement);
        const hr = document.createElement('hr');
        container.appendChild(hr);
        

        const title = postElement.querySelector('.title.clickable')
        title.addEventListener('click', () => {
            console.log('Title clicked!');
            window.location.href = `../second/index.html?post=${index}&imageUrl=${encodeURIComponent(imageUrl)}`;
        })
      });
    } catch (error) {
      console.error("Ошибка загрузки постов:", error);
    }
  }
  


