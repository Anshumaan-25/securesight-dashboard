const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear old data
  await prisma.incident.deleteMany({});
  await prisma.camera.deleteMany({});

  // Create cameras
  const cameras = await Promise.all([
    prisma.camera.create({ data: { name: "Main Entrance", location: "Building A - Front Door" } }),
    prisma.camera.create({ data: { name: "Parking Lot North", location: "Outdoor - North Parking" } }),
    prisma.camera.create({ data: { name: "Reception Area", location: "Building A - Lobby" } }),
    prisma.camera.create({ data: { name: "Server Room", location: "Building B - Floor 2" } }),
    prisma.camera.create({ data: { name: "Emergency Exit", location: "Building A - Back Exit" } }),
    prisma.camera.create({ data: { name: "Warehouse Loading", location: "Building C - Loading Bay" } }),
    prisma.camera.create({ data: { name: "Cafeteria", location: "Building A - Floor 1" } }),
    prisma.camera.create({ data: { name: "Parking Lot South", location: "Outdoor - South Parking" } })
  ]);

  const now = new Date();
  const types = ["motion", "intrusion", "suspicious_activity", "fire", "vandalism", "unauthorized_access", "loitering", "vehicle_incident"];
  const incidents = [];

  for (let i = 0; i < 15; i++) {
    const hoursAgo = Math.random() * 24;
    const start = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    const end = new Date(start.getTime() + (Math.random() * 10 + 2) * 60 * 1000);

    const camera = cameras[Math.floor(Math.random() * cameras.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const resolved = Math.random() < 0.4;

    incidents.push({
      cameraId: camera.id,
      type,
      tsStart: start,
      tsEnd: end,
      thumbnailUrl: `https://picsum.photos/200/150?random=${i + 1}`,
      resolved
    });
  }

  incidents.sort((a, b) => b.tsStart - a.tsStart);
  await Promise.all(incidents.map(i => prisma.incident.create({ data: i })));

  console.log(`Seed complete! ${cameras.length} cameras, ${incidents.length} incidents`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

