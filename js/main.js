const productTable = document.getElementById('product-table');

productTable.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const sku = event.target.dataset.sku;
    const product = event.target.dataset.product;
    const price = parseFloat(event.target.dataset.price);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItem = cart.find((item) => item.sku === sku);
    if (cartItem) {
      cartItem.quantity++;
      cartItem.total = cartItem.quantity * price;
    } else {
      cartItem = {
        sku: sku,
        product: product,
        price: price,
        quantity: 1,
        total: price,
      };
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTable();
  }
});

function updateCartTable() {
  const cartTableBody = document.getElementById('cart-table-body');

  cartTableBody.innerHTML = '';

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.forEach((item) => {
    const row = document.createElement('tr');

    const skuCell = document.createElement('td');
    skuCell.textContent = item.sku;

    const productCell = document.createElement('td');
    productCell.textContent = item.product;

    const priceCell = document.createElement('td');
    priceCell.textContent = '$' + item.price.toFixed(2);

    const quantityCell = document.createElement('td');
    quantityCell.textContent = item.quantity;

    const totalCell = document.createElement('td');
    totalCell.textContent = '$' + item.total.toFixed(2);
    row.appendChild(skuCell);
    row.appendChild(productCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(totalCell);

    cartTableBody.appendChild(row);
  });

  const cartTotal = document.getElementById('cart-total');

  let total = cart.reduce((acc, item) => {
    console.log(acc.total + item.total);
    return acc.total + item.total;
  });
  cartTotal.textContent = '$' + total.toFixed(2);
}

const buyBtn = document.getElementById('buy-btn');
buyBtn.addEventListener('click', function (event) {
  localStorage.removeItem('cart');
  updateCartTable();
});
