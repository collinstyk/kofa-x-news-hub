import ArticleCard from "./ArticleCard.js";
import Category from "./Category.ts";
import { BASE_URL } from "./constants.js";
import navigateToNewsPage from "./navigateToNewsPage.js";

type Article = {
  author: string;
  date: string;
  link: string;
  summary: string;
  timestamp: number;
  source: string;
  title: string;
  image: string;
  categories: string[];
};

export function setSearchParams({
  key,
  value,
}: {
  key: string;
  value: string;
}) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  params.set(key, value);
  let newUrl = window.location.pathname + "?" + params.toString();
  window.location.href = newUrl;
}

function renderCategories(categories: string[]) {
  const categoryList = document.getElementById("categories");

  if (categoryList)
    categories?.forEach((category) => {
      const listItem = Category(category, () =>
        setSearchParams({ key: "category", value: category })
      );
      categoryList.appendChild(listItem);
    });
}

function renderArticles(articles: Article[]) {
  const articleCards = document.querySelector(".article-cards");
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
            .filter((article: Article) => article.categories !== undefined)
            .map((article: Article) => article.categories)
            .reduce(
              (acc: string[], cur: string[]) => (acc = [...acc, ...cur]),
              []
            )
        )
      );

      const filteredArticles = articles.filter((item: Article) => {
        const category = urlParams.get("category");
        if (!category) return item;
        return item.categories.includes(category);
      });

      renderCategories(categories as string[]);

      if (window.location.href.includes("?news")) {
        const newsIndex = Number(urlParams.get("news"));
        const newsArticle = articles[newsIndex];
        navigateToNewsPage(newsArticle);
      } else renderArticles(filteredArticles);

      window.addEventListener("popstate", function () {
        renderArticles(filteredArticles);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

init();
