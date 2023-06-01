async function getProductData() {
  try {
    const response = await fetch("products.json");
    const data = await response.json();
    const products = data.products;

    const productContainer = document.querySelector(
      ".category__container__main"
    );

    function populateProducts(products) {
      products.forEach((product) => {
        const { id, title, rating, price } = product;

        const listItem = document.createElement("li");
        listItem.classList.add("glide__slide");

        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const headerDiv = document.createElement("div");
        headerDiv.classList.add("product__header");

        const imageElement = document.createElement("img");
        imageElement.src = product.image;
        imageElement.alt = "product";

        headerDiv.appendChild(imageElement);

        const footerDiv = document.createElement("div");
        footerDiv.classList.add("product__footer");

        const titleElement = document.createElement("h3");
        titleElement.textContent = title;

        const ratingDiv = document.createElement("div");
        ratingDiv.classList.add("rating");

        for (let i = 0; i < 5; i++) {
          const starSvg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          const useElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "use"
          );
          useElement.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "xlink:href",
            "./images/sprite.svg#icon-star-full"
          );
          starSvg.appendChild(useElement);
          ratingDiv.appendChild(starSvg);
        }

        const priceDiv = document.createElement("div");
        priceDiv.classList.add("product__price");

        const priceElement = document.createElement("h4");
        priceElement.textContent = `$${price}`;

        const addToCartButton = document.createElement("a");
        addToCartButton.href = `detail2.html?id=${id}`;
        //detail2.html --- add to cart

        const addButton = document.createElement("button");
        addButton.type = "submit";
        addButton.classList.add("product__btn");
        addButton.textContent = "Add To Cart";

        addToCartButton.appendChild(addButton);

        const ulElement = document.createElement("ul");
        ulElement.classList.add("product__actions");

        // Tạo phần tử li (Quick View)
        const quickViewLi = document.createElement("li");
        const quickViewLink = document.createElement("a");
        // ? =================== Link Href ================
        quickViewLink.href = `detail2.html?id=${id}`;
        //quick-view
        // ! ==============================================
        quickViewLink.dataset.tip = "Quick View";
        quickViewLink.dataset.place = "left";

        //lay id cua tung trang

        const quickViewSvg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        const quickViewUse = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "use"
        );
        quickViewUse.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          "./images/sprite.svg#icon-eye"
        );

        quickViewSvg.appendChild(quickViewUse);
        quickViewLink.appendChild(quickViewSvg);
        quickViewLi.appendChild(quickViewLink);

        // Tạo phần tử li (Add To Wishlist)
        const wishlistLi = document.createElement("li");
        const wishlistLink = document.createElement("a");
        wishlistLink.href = `detail.html?id=${id}`;
        wishlistLink.dataset.tip = "Add To Wishlist";
        wishlistLink.dataset.place = "left";

        const wishlistSvg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        const wishlistUse = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "use"
        );
        wishlistUse.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          "./images/sprite.svg#icon-heart-o"
        );

        wishlistSvg.appendChild(wishlistUse);
        wishlistLink.appendChild(wishlistSvg);
        wishlistLi.appendChild(wishlistLink);

        const compareLi = document.createElement("li");
        const compareLink = document.createElement("a");
        compareLink.href = "compare/comparison.html";
        compareLink.dataset.tip = "Add To Compare";
        compareLink.dataset.place = "left";

        const compareSvg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        const compareUse = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "use"
        );
        compareUse.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          "./images/sprite.svg#icon-loop2"
        );

        compareSvg.appendChild(compareUse);
        compareLink.appendChild(compareSvg);
        compareLi.appendChild(compareLink);

        ulElement.appendChild(quickViewLi);
        ulElement.appendChild(wishlistLi);
        ulElement.appendChild(compareLi);

        footerDiv.appendChild(titleElement);
        footerDiv.appendChild(ratingDiv);
        priceDiv.appendChild(priceElement);
        footerDiv.appendChild(priceDiv);
        footerDiv.appendChild(addToCartButton);

        productDiv.appendChild(headerDiv);
        productDiv.appendChild(footerDiv);
        productDiv.appendChild(ulElement);

        listItem.appendChild(productDiv);

        productContainer.appendChild(listItem);

        listItem.addEventListener("click", () => {
          handleProductClick(id);
        });
      });
    }

    function filterProducts(category) {
      productContainer.innerHTML = "";
      if (category === "All Products") {
        populateProducts(products);
      } else {
        const filteredProducts = products.filter(
          (product) => product.category === category
        );
        populateProducts(filteredProducts);
      }

      const activeBtn = document.querySelector(".filter-btn.active");
      activeBtn.classList.remove("active");
      const clickedBtn = document.querySelector(
        `.filter-btn[data-id="${category}"]`
      );
      clickedBtn.classList.add("active");
    }

    populateProducts(products);

    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-id");
        filterProducts(category);
      });
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

getProductData();
