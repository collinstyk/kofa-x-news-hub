function createNewsPage({ title, author, image, date, source, summary, categories = [], }) {
    const year = date.split(",")[1]?.trim();
    const news = `<main id="news">
      <!-- author and year -->
      <h4>
        ${author || source || "ACJ UNIBEN"},
        ${year}
      </h4>
      <article>
        <!-- title -->
        <h1>
          ${title}
        </h1>
        <img
          src=${image}
          alt=${title}
        />

        <!-- categories -->
        <ul>
          ${categories.map((category) => `<li>
            <p>${category}</p>
          </li>`)}
        </ul>
        <section>
          <div>
            <h3>${date}</h3>
            <h3 class="source">Source: ${source}</h3>
          </div>

          <!-- summary -->
          <p>
            ${summary}
          </p>
        </section>
      </article>
    </main>`;
    return news;
}
function navigateBack() {
    const content = document.querySelector("#content");
    const news = document.querySelector("#news");
    if (news)
        content?.removeChild(news);
}
export default function navigateToNewsPage(data) {
    const { title, author, categories, date, image, summary, source } = data;
    const content = document.querySelector("#content");
    const home = document.querySelector("#home");
    if (home)
        content?.removeChild(home);
    const news = createNewsPage({
        title,
        author,
        image,
        categories,
        date,
        summary,
        source,
    });
    content?.insertAdjacentHTML("afterbegin", news);
}
//# sourceMappingURL=navigateToNewsPage.js.map