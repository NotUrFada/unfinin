document.documentElement.classList.add("js");

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const reveal = () => {
  if (prefersReduced) return;

  const nodes = document.querySelectorAll(
    ".steps li, .scrap, .why-card, .modes li, .gallery figure, .device-copy, .ipad, .close"
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach((el) => io.observe(el));
  setTimeout(() => {
    nodes.forEach((el) => el.classList.add("in"));
  }, 900);
};

const notes = [
  ["Johnny", "posted a new idea", "43 sec"],
  ["Swapt", "added a take", "2 min"],
  ["Vins", "posted a new idea", "6 min"],
  ["Bunir", "completed a concept", "11 min"],
];

const cycleNotes = () => {
  const cards = document.querySelectorAll(".live-stack .note");
  if (!cards.length) return;
  let i = 0;
  const paint = () => {
    cards.forEach((card, idx) => {
      const item = notes[(i + idx) % notes.length];
      card.querySelector("p").innerHTML = `<strong>${item[0]}</strong> ${item[1]}`;
      card.querySelector("time").textContent = item[2];
    });
    i = (i + 1) % notes.length;
  };
  paint();
  if (!prefersReduced) setInterval(paint, 7000);
};

reveal();
cycleNotes();
