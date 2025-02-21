import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
console.log("🔄 Seeding database...");

// Vérification des catégories existantes avant de les ajouter
const existingCategories = await prisma.category.findMany();
const existingCategoryLabels = existingCategories.map(categ => categ.label);

// Définir les catégories à ajouter
const categoriesToCreate = [
  { label: "Adventure" },
  { label: "Travel" },
  { label: "Fitness" },
  { label: "Learning" },
  { label: "Music" },
  { label: "Technology" },
  { label: "Food" },
  { label: "Books" },
  { label: "Art" },
  { label: "Movies" }
].filter(category => !existingCategoryLabels.includes(category.label)); 

// Ajouter les catégories qui n'existent pas encore
if (categoriesToCreate.length > 0) {
  await prisma.category.createMany({
    data: categoriesToCreate,
  });
  console.log(`✅ ${categoriesToCreate.length} nouvelles catégories ajoutées`);
} else {
  console.log("🔄 Aucune nouvelle catégorie à ajouter (toutes existent déjà)");
}

// Récupération des catégories mises à jour
const categories = await prisma.category.findMany();
if (categories.length === 0) {
  throw new Error("❌ Aucune catégorie trouvée dans la base de données !");
}
console.log(`✅ ${categories.length} catégories disponibles`);


// ID utilisateur fictif (à remplacer par un vrai ID si nécessaire)
const userId = "user123";

const collectionLabels = [
    "Adventures & Travel",
    "Personal Challenges",
    "Professional Projects",
    "Sports & Well-being",
    "Culture & Leisure"
];

const collections = await Promise.all(
    collectionLabels.map((label) =>
      prisma.collection.create({
        data: {
          label,
          isPrivate: Math.random() > 0.5, // 50% de collections privées
          userId,
        },
      })
    )
  );

console.log(`✅ ${collections.length} collections créées`);

// Liste d'objectifs (goals) à insérer
const goalsData = [
    "Visit Japan",
    "Learn a new language",
    "Write a book",
    "Go skydiving",
    "Run a marathon",
    "Watch the 100 greatest movies of all time",
    "Create an open-source project",
    "Travel solo to a foreign country",
    "Go on a van road trip",
    "Learn to code in TypeScript",
    "Swim with dolphins",
    "Launch my startup",
    "Meditate daily for 30 days",
    "Learn to cook gourmet dishes",
    "Take dance lessons",
    "Go on a mountain trek",
    "Visit all continents",
    "Create a blog and post regularly",
    "Disconnect from social media for a month",
    "Read 50 books in a year"
];

// Générer des objectifs pour chaque collection
const goals = [];
for (const collection of collections) {
  for (let i = 0; i < 6; i++) { // 6 objectifs par collection
    const randomGoal = goalsData[Math.floor(Math.random() * goalsData.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    goals.push({
      label: randomGoal,
      description: `Description de l'objectif : ${randomGoal}`,
      isAccomplished: Math.random() > 0.7, // 30% d'objectifs accomplis
      priority: Math.floor(Math.random() * 5) + 1, // Priorité entre 1 et 5
      collectionId: collection.id,
      categoryId: randomCategory.id,
    });
  }
}

  await prisma.goal.createMany({
    data: goals,
  });


}

main()
  .catch(error => {
    console.error("❌ Erreur lors du seed :", error);
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

