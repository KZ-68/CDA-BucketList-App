export interface GoalType {
    id: string;
    label: string;
    collection: CollectionType
    category: CategoryType
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    isAccomplished: boolean;
    priority?: number;
    collectionId: string;
    categoryId: string;
}
 
export interface CollectionType {
    id: string;
    label: string
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    goals: GoalType[];
}
export interface CategoryType {
    id: string;
    label: string;
    goals: GoalType[];
}

export interface LikeType {
    id: string;
    createdAd : Date;
    userId : string;
    collectionId : string;
}