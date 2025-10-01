import Category from "./Category.js";
import { article, h3, img, ul } from "./elements.js";
import { setSearchParams } from "./script.ts";

type ArticleData = {
  index: number;
  title: string;
  author: string;
  categories: string[];
  date: string;
  image: string;
  summary: string;
  source: string;
};

function ArticleCard({
  data,
  title,
  imageSource,
  categories = [],
  className = "",
}: {
  data: ArticleData;
  title: string;
  imageSource: string;
  categories: string[];
  className?: string;
}) {
  // Wrapper
  const card = article({ className: "article-card" });

  // Image
  const cardImg = img({
    src: imageSource,
    alt: title,
  });

  // Title
  const cardTitle = h3();
  cardTitle.textContent = title;

  const categoryList = ul();

  categories?.forEach((category) => {
    const listItem = Category(category, () =>
      setSearchParams({ key: "category", value: category })
    );
    categoryList.appendChild(listItem);
  });

  // Hierarchy
  card.appendChild(cardImg);
  card.appendChild(cardTitle);
  card.appendChild(categoryList);

  card.addEventListener("click", () =>
    setSearchParams({ key: "news", value: `${data.index}` })
  );

  return card;
}

export default ArticleCard;
