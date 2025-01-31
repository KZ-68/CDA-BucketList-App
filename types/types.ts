export interface GoalType {
    id: string;
    label: string;
    collection: CollectionType;
    category: CategoryType;
}
 
export interface CollectionType {
    id: string;
    label: string;
    isPrivate: boolean;
    goals: GoalType[];
}
 
export interface CategoryType {
    id: string;
    label: string;
    goals: GoalType[];
}