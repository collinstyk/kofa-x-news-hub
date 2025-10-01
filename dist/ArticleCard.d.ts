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
declare function ArticleCard({ data, title, imageSource, categories, className, }: {
    data: ArticleData;
    title: string;
    imageSource: string;
    categories: string[];
    className?: string;
}): HTMLElement;
export default ArticleCard;
//# sourceMappingURL=ArticleCard.d.ts.map