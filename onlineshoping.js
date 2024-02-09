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
//สร้างชื่อ คลาส
class ShoppingCart {
  lineItems = [];
  constructor(created) {
    this.created = created;
  }
  //เป็นการเชื่อมเส้นระหว่าง shoppingCart and lineItem
  addLineItem(lineItem) {
    this.lineItems.push(lineItem);
  }
  //ฟังก์ชัน การคำนวน ราคาสินค้ารวมทั้งหมด
  calcTotal() {
    //กำหนดตัวแปร total ให้เป็น 0 ก่อน
    let total = 0;
    // make loop quantity and ราคาสินค้าใน รายละเอียดรายการสินค้า(lineitem)
    for (let i = 0; i < this.lineItems.length; i++) {
      //เอาจำนวน * ราคา
      total += this.lineItems[i].quantity * this.lineItems[i].price;
    }
    // return ผลรวมออกมา ใส่ไว้ใน total
    return total;
  }
// นี่การปริ้น แสดงสินค้าในตะกร้า
  printShoppingCart() {
    console.log("--------------------------------------")
    // รายการสินค้าแสดงความยาวใน array (.length)
    console.log("มีสินค้าในตะกร้าทั้งหมด " + this.lineItems.length);
    // แสดงรายการสินค้าโดยดึง get detail จาก LineItem
    for(let i = 0; i < this.lineItems.length; i++) {
      console.log(
        // กำหนดให้ i เริ่มต้นที่1 เก็บรายละเอียดเอาไว้ที่ getDetail
        "รายการสินค้าที่ : " + (i + 1) + " " + this.lineItems[i].getDetail()
      );
    }
    // log calcTotal เรียกใช้งานฟังก์ชันเพื่อเรียกผลลัพธ์
    console.log("ราคารวมทั้งสิ้น : " + this.calcTotal() + " บาท ");
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
  printOrderDetail() {
    let TotalOrderPrice = 0;
    for (let i = 0; i < this.orders.length; i++) {
      console.log(" คำสั่งซื้อที่ : " + (i + 1));
      this.orders[i].printDetail();
      TotalOrderPrice += this.orders[i].total;
    }
    console.log(" ค่าใช้จ่ายที่ใช้ไปทั้งหมด : " + TotalOrderPrice + " บาท ");
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
  addLineItem(lineItem) {
    this.lineItems.push(lineItem);
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
  //สร้าง class 
  printDetail() {
    for (let i = 0; i < this.lineItems.length; i++) {
      //คำสั่งซื้อเริ่มต้นจากหนึ่ง+รายละเอียดสินค้า แล้วเก็บไว้ใน getdetail
      console.log("คำสั่งซื้อที่ : " + (i + 1) + " " + this.lineItems[i].getDetail());
    }
    //เรียก setTotal
    this.setTotal();
    //log ราคารวม
    console.log("ราคารวม : " + this.total + " บาท ");
    console.log(
      "ชำระแล้ววันที่ : " +
        this.payment.paid +
        " เป็นจำนวนเงิน : " +
        this.payment.total +
        " บาท "
    );
  }
}

//สร้างคลาส

class LineItem {
  //เชื่อม class product
  product = null;
  constructor(quantity, price) {
    this.quantity = quantity;
    this.price = price;
  }
  setProduct(product) {
    this.product = product;
  }
  //make methods getdetail  
  getDetail() {
    //return ค่าชื่อโปรดัก + จำนวนรายการ + ค่าที่คำนวน calcSubTotal
    return (
      this.product.name +
      " จำนวน " +
      this.quantity +
      " รายการ " +
      " ราคา " +
      this.calcSubTotal() +
      " บาท "
    );
  }
  //สร้าง class 
  calcSubTotal() {
    //return ค่า จำนวนสินค้า * ราคา = calcSubTotal
    return this.quantity * this.price;
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

  const account1 = new Account("Kay", "BanKay", false, "05/01/2567");
  // console.log(user1.state);
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

  order2.addLineItem(lineItem2);
  order2.addLineItem(lineItem3);

  order1.setTotal();
  order2.setTotal();

  order1.setShippedDate("30/01/2567");
  order2.setShippedDate("30/01/2567");

  const payment1 = new Payment(
    "p01",
    "22/01/2567",
    order1.total,
    " จ่ายแล้วนะจ๊ะ "
  );

  //สร้างตัวแปร Payment2 เก็บค่า ID วันที่จัดส่ง ราคารวมของสินค้า ที่อยู่
  const payment2 = new Payment("p02", "27/01/2567", order1.total, " ส่งที่หอ ");
  //เพิ่มออเดอร์เข้าไปที่ Account
  account1.addOrder(order1);
  account1.addOrder(order2);
//set payment เข้าไปใน order1 and order2
  order1.setPayment(payment1);
  order2.setPayment(payment2);

  //สร้างตัวแปร shoppingCart (ตระกร้า) เก็บค่า วันที่จัดส่ง
  const shoppingCart = new ShoppingCart("20/02/67");
  //add LineItem ลงในตระกร้าสินค้า
  shoppingCart.addLineItem(lineItem1);
  shoppingCart.addLineItem(lineItem2);

  //account เชื่อม ShoppingCart
  account1.setShoppingCart(shoppingCart);

  //log ชื่อ และ accountID
  console.log("ชื่อ : " + account1.id);
  //จำนวนคำสั่งซื้อ order ของ account 
  console.log("จำนวนคำสั่งซื้อ : " + account1.orders.length);
  // order1.printDetail();
  // order2.printDetail();


//เรียกใช้ Methods printOrderDetail ของ acount1 ก็เพื่อให้แสดงผลออกมาบนคอนโซล
  account1.printOrderDetail();
//เรียกใช้ Methods printShoppingCart จาก shoppingCart
  account1.shoppingCart.printShoppingCart();

  console.log("------------------------------");
};
main();
