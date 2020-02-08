function formatPrice(price) {
  let _price = price.toLocaleString("zh-TW", {
    style: "currency",
    currency: "TWD"
  });

  return _price;
}

const Helper={formatPrice:formatPrice};

export default Helper;