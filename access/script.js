/** @format */

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgAudio");
  const toggleBtn = document.getElementById("musicToggle");

  // Cập nhật biểu tượng nút
  function updateIcon() {
    toggleBtn.textContent = audio.muted ? "🔇" : "🔊";
    toggleBtn.classList.toggle("muted", audio.muted);
  }

  // Cố gắng phát ngay khi load
  async function forceAutoplay() {
    try {
      await audio.play();
      console.log("Autoplay thành công");
    } catch (e) {
      console.warn("Autoplay bị chặn, sẽ thử lại khi người dùng tương tác.");
    }
  }

  // Khi người dùng có tương tác lần đầu → bật tiếng luôn
  function enableSound() {
    audio.muted = false;
    audio.play().catch(() => {});
    updateIcon();

    // Sau khi đã bật, gỡ listener để không lặp lại
    document.removeEventListener("click", enableSound);
    document.removeEventListener("touchstart", enableSound);
  }

  // Nút toggle
  toggleBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    if (!audio.muted) audio.play().catch(() => {});
    updateIcon();
  });

  // === CHẶN CHUỘT PHẢI ===
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // === CHẶN PHÍM DEVTOOLS ===
  document.addEventListener("keydown", (e) => {
    // F12
    if (e.key === "F12") e.preventDefault();

    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
    if (
      (e.ctrlKey && e.shiftKey && ["I", "J"].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && ["U", "S"].includes(e.key.toUpperCase()))
    ) {
      e.preventDefault();
    }
  });
    
  // Thử tự phát (mute)
  forceAutoplay();

  // Đợi tương tác đầu tiên để bật tiếng
  document.addEventListener("click", enableSound);
  document.addEventListener("touchstart", enableSound);

  updateIcon();
});
