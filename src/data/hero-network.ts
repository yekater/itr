// Coordenadas deterministas; decoración abstracta sin datos personales.
let seed = 317;
function random() {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
}
export const networkNodes = Array.from({ length: 64 }, (_, index) => {
  const angle = random() * Math.PI * 2;
  const radius = Math.sqrt(random());
  return {
    x: Math.round(320 + Math.cos(angle) * radius * 270),
    y: Math.round(290 + Math.sin(angle) * radius * 245),
    radius: index % 9 === 0 ? 4 : 1.5 + random() * 1.4,
    delay: -(random() * 7),
  };
});
export const networkEdges = networkNodes.flatMap((node, index) =>
  networkNodes
    .map((other, target) => ({ target, distance: Math.hypot(node.x - other.x, node.y - other.y) }))
    .filter(({ target, distance }) => target > index && distance < 150)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2)
    .map(({ target, distance }) => ({ from: index, to: target, opacity: .14 + (1 - distance / 150) * .32 })),
);
