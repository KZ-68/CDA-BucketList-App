import ProgressBar from "./ProgressBar";

interface CategoriesProgress {
    categoryId: string;
    categoryName: string;
    goalsCompleted: number;
    totalGoals: number;
    progress: string;
}

interface RenderCategoriesProgressProps {
    categories: CategoriesProgress[]
}

const RenderCategoriesProgress: React.FC<RenderCategoriesProgressProps> = ({categories}: RenderCategoriesProgressProps) => {
    return(
        <section className="my-2">
            <h3 className="text-2xl font-bold my-4">Categories Stats</h3>
            <div className="flex flex-col gap-3">
                {categories.map((category:CategoriesProgress) =>
                    <div key={category.categoryId}>
                        <h4 className="text-xl font-bold">{category.categoryName} - {category.goalsCompleted} / {category.totalGoals}</h4>
                        <ProgressBar bg_color={"bg-accentColor"} progress={category.progress} />
                    </div>
                )}
            </div>
        </section>
    )
}

export default RenderCategoriesProgress