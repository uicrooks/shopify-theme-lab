const productIngredients = document.querySelector(".product-ingredients");
const selectedProduct = document.querySelector(
  ".product_wraping.selectest_product1.Active"
);
const initialIngredients = selectedProduct.getAttribute("ingredients");

productIngredients.innerHTML = initialIngredients;

const reviews = Array.from(document.querySelector(".product_review").children);

document.addEventListener("click", (event) => {
  if (
    event.target.closest(
      ".product_main_wraper .content_side_wwrp .product_wraping"
    )
  ) {
    const productWraping = event.target.closest(".product_wraping"); 
    const productMain = document.querySelector(".main-product .product_main");
    const productDescriptions = Array.from(
      productMain.querySelectorAll(".product-info__description")
    );
    const shippingInfo = productMain.querySelector(".delevery_section-info");
    const shippingTime = productMain.querySelector(".delevery_section-time");

    const product_id = productWraping.getAttribute("product_id");
    const description = productWraping.getAttribute("description");
    const shipping_info = productWraping.getAttribute("shipping_info");
    const shipping_time = productWraping.getAttribute("shipping_time");
    const ingredients = productWraping.getAttribute("ingredients");

    productDescriptions.forEach((productDescription) => {
      productDescription.innerHTML = description;
    });
    shippingInfo.textContent = shipping_info;
    shippingTime.textContent = shipping_time;
    productIngredients.innerHTML = ingredients;

    reviews.forEach((review) => {
      review.classList.add("hidden");
      if (product_id === review.dataset.id) {
        review.classList.remove("hidden");
      }
    });

    $(".accordian_tabber_content div:first").css("display", "block");

    //
    $(".accordian_tabber_content h3").click(function () {
      $(this).next().slideToggle(500);
      $(".accordian_tabber_content div").not($(this).next()).slideUp(500);

      // how to rotate the icon JUST h3>i
      // $("i").css({'transform':'rotate(180deg)'});
    });
  }
});
