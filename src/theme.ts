export const handleTheme = () => {
  // Dark theme
  const body = document.querySelector<HTMLBodyElement>("body")!;
  const modeSwitcher =
    document.querySelector<HTMLDivElement>(".mode-switcher")!;
  const colorMode = localStorage.getItem("bip-color-mode");
  if (colorMode === "dark") {
    body.classList.add("dark");
    modeSwitcher.classList.add("animation900");
  } else {
    modeSwitcher.classList.add("animation0");
  }
  modeSwitcher.addEventListener("click", function () {
    if (modeSwitcher.classList.contains("animation900")) {
      modeSwitcher.classList.remove("animation900");
      setTimeout(function () {
        modeSwitcher.classList.add("animation0");
      }, 100);
    } else if (modeSwitcher.classList.contains("animation0")) {
      modeSwitcher.classList.remove("animation0");
      setTimeout(function () {
        modeSwitcher.classList.add("animation900");
      }, 100);
    } else {
      setTimeout(function () {
        modeSwitcher.classList.add("animation900");
      }, 100);
    }
  });

  modeSwitcher.addEventListener("animationend", () => {
    if (modeSwitcher.classList.contains("animation900")) {
      localStorage.setItem("bip-color-mode", "dark");
      body.classList.add("dark");
    } else {
      localStorage.setItem("bip-color-mode", "light");
      body.classList.remove("dark");
    }
  });
};
