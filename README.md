# CDA-BucketList-App

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
