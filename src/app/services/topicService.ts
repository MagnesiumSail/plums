import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchAllTopics() {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        notes: true,
        images: true,
        attachments: true
      }
    });
    console.log(topics);
    return topics;
  } catch (error) {
    console.error("Error fetching topics:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

// Call the function to fetch topics
fetchAllTopics().then(topics => {
  console.log("Fetched Topics:", topics);
}).catch(error => {
  console.error("An error occurred:", error);
});
