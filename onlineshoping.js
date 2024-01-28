class Customer {
  account = null;
  constructor(id, address, phone, email) {
    this.id = id;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
  setAccount(account) {
    this.account = account;
  }
}

class WebUser {
  customer = null;
  shoppingCart = null;
  constructor(login_id, password, state) {
    this.login_id = login_id;
    this.password = password;
    this.state = state;
  }
  setCustomer(customer) {
    this.customer = customer;
  }
  setShoppingCart(shoppingCart) {
    this.shoppingCart = shoppingCart;
  }
}

class ShoppingCart {
  linItems = [];
  constructor(created) {
    this.created = created;
  }
  addLineItem(linItem) {
    this.linItems = linItem;
  }
}

//userstate

class Account {
  shoppingCart = null;
  payments = [];
  orders = [];
  constructor(id, billing_address, is_closed, open, closed) {
    this.id = id;
    this.billing_address = billing_address;
    this.is_closed = is_closed;
    this.open = open;
    this.closed = closed;
  }
  setShoppingCart(shoppingCart) {
    this.shoppingCart = shoppingCart;
  }
  addPayment(payment) {
    this.payments.push(payment);
  }
  addOrder(order) {
    this.orders.push(order);
  }
}

class Payment {
  constructor(id, paid, total, details) {
    this.id = id;
    this.paid = paid;
    this.total = total;
    this.details = details;
  }
}

class Order {
  lineItems = [];
  payment = null;
  total = 0;
  shipped = "";
  constructor(number, ordered, shipped, ship_to, status, total) {
    this.number = number;
    this.order = ordered;
    this.shipped = shipped;
    this.ship_to = ship_to;
    this.status = status;
    this.total = total;
  }
  setPayment(payment) {
    this.payment = payment;
  }
  addLineItem(linItem) {
    this.lineItems.push(linItem);
  }
  setTotal() {
    let total = 0;
    for (let i = 0; i < this.lineItems.length; i++) {
      total += this.lineItems[i].quantity * this.lineItems[i].price;
    }
    this.total = total;
  }
  setShippedDate(date) {
    this.shipped = date;
  }
}

//orderstate

class LineItem {
  product = null;
  constructor(quantity, price) {
    this.quantity = quantity;
    this.price = price;
  }
  setProduct(product) {
    this.product = product;
  }
}

class Product {
  constructor(id, name, supplier) {
    this.id = id;
    this.name = name;
    this.supplier = supplier;
  }
}

//Enumeration (enum)
class UserState {
  static NEW = new UserState("new_user");
  static ACTIVE = new UserState("new_user");
  static BLOCKED = new UserState("new_user");
  static BANNED = new UserState("new_user");
  constructor(name) {
    this.name = name;
  }
}

class OrderStatus {
  static NEW = new OrderStatus("new");
  static HOLD = new OrderStatus("new");
  static SHIPPED = new OrderStatus("new");
  static DELIVERED = new OrderStatus("new");
  static CLOSED = new OrderStatus("new");
  constructor(name) {
    this.name = name;
  }
}

const main = () => {
  //create User webuser
  const user1 = new WebUser("user1", "123456", UserState.NEW);
  const user2 = new WebUser("user2", "465642", UserState.NEW);
  console.log(user1.state);
  //createProduct
  const rubber = new Product("01", "rubber", "Punsan");
  const pen = new Product("02", "pen", "flow");
  const pencil = new Product("03", "pencil", "Bank");
  const bag = new Product("04", "bag", "Tinny");
  const redpen = new Product("05", "redpen", "Tanny");

  //create lineItem
  const lineItem1 = new LineItem(10, 15);
  lineItem1.setProduct(pen);
  const lineItem2 = new LineItem(10, 6);
  lineItem2.setProduct(rubber);
  const lineItem3 = new LineItem(2, 17);
  lineItem3.setProduct(pencil);

  //create Order
  const order1 = new Order(
    "01",
    "15/02/2567",
    "London",
    OrderStatus.CLOSED,
    ""
  );
  const order2 = new Order(
    "01",
    "19/02/2567",
    "Amelica",
    OrderStatus.SHIPPED,
    ""
  );
  const order3 = new Order("01", "22/02/2567", "EU", OrderStatus.SHIPPED, "");

  //Add to order
  order1.addLineItem(lineItem1);
  order1.addLineItem(lineItem2);
  order1.addLineItem(lineItem3);

  order3.setTotal();

  order1.setShippedDate("30/01/2567");

  const payment1 = new Payment(
    "p01",
    "22/01/2567",
    order1.total,
    " จ่ายแล้วนะจ๊ะ"
  );
  order1.setPayment(payment1);
  console.log(order1);

  //create Add Cart
  const shoppingCart = new ShoppingCart("28/01/2567");

  //เพิ่ม lineItems to cart
  shoppingCart.addLineItem(lineItem2);
  shoppingCart.addLineItem(lineItem1);

  const account = new Account("acc01", "EU", "close", "10:30AM", "11:00AM");

  //Add Cart to account
  account.setShoppingCart(shoppingCart);

  const customer = new Customer(
    "C01",
    "Thailand",
    "0922932011",
    "c01@gmail.com"
  );

  //Add account to customer
  customer.setAccount(account);

  //Add customer to webuser
  user1.setCustomer(customer);
  //Add shoppingCart to Webuser
  user1.setShoppingCart(shoppingCart);

  console.log(user1.shoppingCart);

  //Display
};
main();
