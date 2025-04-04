# CDA-BucketList-App

This project is an application for creating collections of goals to be achieved before DYING.

What you can do:
- Create an account and access your list of collections
- Create a collection
- Create a goal and add it to a collection
- View your list of collections and respective goals
- Filter on the most recent collections, the oldest...
- Filter on the collections with the most completed goals, or those with the least completed 
- Filter on the status of collections, whether all goals are completed or not...
- Filter on collections with the most or fewest likes
- Perform multiple searches in collections
- View another user's collection
- Bookmark (like) another user's collection

# Project folder Structure :

├── app  
|  ├── (client)  
|  └── api  
├── components  
├── lib  
├── prisma  
|  └── schema  
├── public  
|  └── prority  
├── services  
└── types

# API Documentation

The data arer sent under this format : 
```
{
  data: données de l'objet,
  message: le message de succès ou d'erreur,
  success: le status de la requête : false (erreur) ou true (tout est bon)
}
```

## Collection

### Get All
```
/api/collections
```

### Get One
```
/api/collections/[collectionId]
```

### Create
```
/api/collections
```

## Goal

### Get All
```
/api/goals
```

### Create
```
/api/goals
```

## Category

### Get All
```
/api/categories
```

### Create
```
/api/categories
```
