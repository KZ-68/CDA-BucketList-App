interface GoalType {
    id: string;
    label: string;
    collection: CollectionType
    category: CategoryType
}
 
interface CollectionType {
    id: string;
    label: string
    goals: GoalType[]
}
 
interface CategoryType {
    id: string;
    label: string
    goals: GoalType[]
}