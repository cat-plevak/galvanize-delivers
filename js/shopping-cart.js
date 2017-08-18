$(document).ready(() => {
  let cart = [];

  $('.card .btn').click((event) => {
    event.preventDefault()
    // console.log('you clicked', event.target);
    let card = $(event.target).parent()
    let price = card.find('.price').text()
    let title = card.find('.card-title').text()

    // console.log('price is', price)
    // console.log('title is', title)

    addToCart({
      price,
      title
    })

  })

  //remove from cart
  $('#orders').click('.remove', (event) => {
    let title = $(event.target).data("title")
    console.log("title in remove", title)
    removeFromCart(title)
  })

  function removeFromCart(title) {
    let existingItem = findInCart(title)
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity--
    }

    renderCart()
  }

  function addToCart(item) {
    // check if in cart, if so update
    let existingItem = findInCart(item.title)

    if (existingItem) {
      console.log("item exists", existingItem)
      existingItem.quantity++
    } else {
      // else add to cart with qty of 1
      item.quantity = 1
      cart.push(item)
    }

    console.log('cart', cart)

    renderCart()
  }

  function findInCart(title) {
    let existingItem = null
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].title === title) {
        existingItem = cart[i]
      }
    }
    return existingItem
  }




  function renderCart() {
    // find table
    let tbody = $('#orders tbody')

    // clear out all order data
    tbody.children().remove()

    // re-render tbody
    let subtotal = 0
    for (item of cart) {
      let price = parsePrice(item.price)


      if (item.quantity > 0) {
        tbody.append(`<tr>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
          <td>${formatPrice(price)}</td>
          <td><a class="btn btn-primary remove-item" data-title="${item.title}">Remove</a></td>
        </tr>`)
      }
      subtotal += price * +(item.quantity)
    }


    // do calculate
    console.log("subtotal", subtotal)
    $('#subtotal').text(formatPrice(subtotal))
  }

  function parsePrice(price) {
    return parseFloat(price.replace(/\$/, ''))
  }

  function formatPrice(price) {
    console.log("formatPrice price is", price)
    return '$' + price.toFixed(2)
  }


})
