document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div");
  trail.className = "trail";
  trail.style.left = `${e.pageX - 5}px`;
  trail.style.top = `${e.pageY - 5}px`;
  document.body.appendChild(trail);

  setTimeout(() => trail.remove(), 1000);
});
