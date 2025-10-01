function createNewsPage({
  title,
  author,
  image,
  date,
  source,
  summary,
  categories = [],
}: {
  title: string;
  author: string;
  image: string;
  date: string;
  source: string;
  summary: string;
  categories: string[];
}) {
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
          ${categories.map(
            (category) => `<li>
            <p>${category}</p>
          </li>`
          )}
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
  if (news) content?.removeChild(news);
}

export default function navigateToNewsPage(data: {
  title: string;
  author: string;
  categories: string[];
  date: string;
  image: string;
  summary: string;
  source: string;
}) {
  const { title, author, categories, date, image, summary, source } = data;

  const content = document.querySelector("#content");

  const home = document.querySelector("#home");
  if (home) content?.removeChild(home);

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
