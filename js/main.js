var productname = document.getElementById("productName");
var productprice = document.getElementById("productPrice");
var productcategory = document.getElementById("productCategory");
var productdescription = document.getElementById("productDescription");
var productimage = document.getElementById("productImage");



// local storage and session storage are used to store data in the browser. Local storage is used to store data that persists even after the browser is closed, while session storage is used to store data that is only available for the duration of the session. In this case, we are using local storage to store the product list so that it can be retrieved and displayed even after the page is refreshed or the browser is closed and reopened.
// refresh and display the products when the page is loaded
// var productlist = [];
// if (localStorage.getItem("productlist") != null) {
//     productlist = JSON.parse(localStorage.getItem("productlist"));
//     displayProducts(); هنا لما اعمل refresh هلاقي ان المنتجات بتاعتي لسه موجودة في local storage و هعرضها تاني
// }
var productlist;
if (localStorage.getItem("productlist") != null) {
    productlist = JSON.parse(localStorage.getItem("productlist"));
} else {
    productlist = [];
}
// displayProducts();

function Addproduct() {
    console.log("Add product function called");
    var product = {
        name: productname.value,
        price: productprice.value,
        category: productcategory.value,
        description: productdescription.value,
        image: productimage.value
    };
    console.log(product);
    productlist.push(product);
    localStorage.setItem("productlist", JSON.stringify(productlist));
    console.log(productlist);
    // Clear the input fields
    clearForm();
    // Display the updated product list
    displayProducts();
}
function clearForm() {
    productname.value = "";
    productprice.value = "";
    productcategory.value = "";
    productdescription.value = "";
    productimage.value = "";
}
function displayProducts() {
    // var rowContainer = document.getElementById("rowContainer");
    // rowContainer.innerHTML = ""; // Clear previous content
    var productCard = "";
    for (var i = 0; i < productlist.length; i++) {
        // var product = productlist[i];
        productCard += ` <div
                                                                    class="col-md-2 col-sm-6 ">
                                                                    <div
                                                                        class="product">
                                                                        <img
                                                                            src="images/banana.jpeg"
                                                                            alt="Product Image"
                                                                            class="product-image w-50">
                                                                        <h3
                                                                            class="product-name fw-bold"> ${productlist[i].name}</h3>
                                                                        <p
                                                                            class="product-price">Price: $${productlist[i].price}</p>
                                                                        <p
                                                                            class="product-category fw-bold ">
                                                                            Category: ${productlist[i].category}</p>
                                                                        <p
                                                                            class="product-description fw-bold">
                                                                            Description: ${productlist[i].description}</p>
                                                                            features.</p>
                                                                    </div>

                                                                </div>`;

        // rowContainer.innerHTML += productCard;
    }
    document.getElementById("rowContainer").innerHTML = productCard;
}
