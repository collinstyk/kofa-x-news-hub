import ArticleCard from "./ArticleCard.js";
import { BASE_URL } from "./constants.js";
import Category from "./Category.js";
import navigateToNewsPage from "./navigateToNewsPage.js";
export function setSearchParams({ key, value }) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  params.set(key, value);
  let newUrl = window.location.pathname + "?" + params.toString();
  window.location.href = newUrl;
}
function renderCategories(categories) {
  const categoryList = document.getElementById("categories");
  if (categoryList)
    categories?.forEach((category) => {
      const listItem = Category(category, () =>
        setSearchParams({ key: "category", value: category })
      );
      categoryList.appendChild(listItem);
    });
}
function renderArticles(articles) {
  const articleCards = document.querySelector(".article-cards");
  while (articleCards.firstChild) {
    articleCards.removeChild(articleCards.firstChild);
  }
  console.log(articles);
  articles.forEach((item, index) => {
    const { title, image, categories } = item;
    const data = { index, ...item };
    articleCards?.appendChild(
      ArticleCard({ title, imageSource: image, categories, data })
    );
  });
}
async function init() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    const articles = data.data;
    const urlParams = new URLSearchParams(window.location.search);

    if (data) {
      const categories = Array.from(
        new Set(
          articles
            .filter((article) => article.categories !== undefined)
            .map((article) => article.categories)
            .reduce((acc, cur) => (acc = [...acc, ...cur]), [])
        )
      );

      const filteredArticles = articles.filter((item) => {
        const category = urlParams.get("category");
        if (!category) return item;
        return item?.categories?.includes(category);
      });

      renderCategories(categories);

      if (window.location.href.includes("news")) {
        const newsIndex = Number(urlParams.get("news"));
        const newsArticle = articles[newsIndex];
        navigateToNewsPage(newsArticle);
      } else renderArticles(filteredArticles);
    }
  } catch (err) {
    console.error(err);
  }
}
init();
//# sourceMappingURL=script.js.map
