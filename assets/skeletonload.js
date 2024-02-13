document.addEventListener("DOMContentLoaded", function () {
  var skeletonLoader = document.querySelector(".skeleton-loader");
  var actualImage = document.querySelector(".actual-image");

  setTimeout(function () {
    skeletonLoader.style.display = "none";
    actualImage.style.display = "block";
  }, 3000);
});
