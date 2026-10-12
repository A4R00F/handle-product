var productname = document.getElementById("productName");
var productprice = document.getElementById("productPrice");
var productcategory = document.getElementById("productCategory");
var productdescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var productSearchInput = document.getElementById("searchinput");
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");



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
    // localStorage.setItem("productlist", JSON.stringify(productlist));

} else {
    productlist = [];
}
displayProducts();

function validateProduct(isUpdate = false) {
    var nameRegex = /^[A-Za-z\u0600-\u06FF][A-Za-z\u0600-\u06FF0-9\s-]*$/;
    var categoryRegex = /^[A-Za-z\u0600-\u06FF][A-Za-z\u0600-\u06FF\s-]*$/;

    if (productname.value.trim() === "") {
        alert("Product name is required");
        return false;
    }

    if (!nameRegex.test(productname.value.trim())) {
        alert("Product name must contain valid letters, numbers, or spaces");
        return false;
    }

    if (productprice.value.trim() === "" ||
        isNaN(productprice.value) ||
        Number(productprice.value) <= 0) {
        alert("Please enter a valid price greater than zero");
        return false;
    }

    if (productcategory.value.trim() === "") {
        alert("Product category is required");
        return false;
    }

    if (!categoryRegex.test(productcategory.value.trim())) {
        alert("Product category must contain valid letters or spaces");
        return false;
    }

    if (productdescription.value.trim() === "") {
        alert("Product description is required");
        return false;
    }

    if (!isUpdate && productImage.files.length === 0) {
        alert("Please select a product image");
        return false;
    }

    return true;
}

function Addproduct() {
    if (!validateProduct()) {
        return;
    }
    console.log("Add product function called");
    var product = {
        name: productname.value,
        price: productprice.value,
        category: productcategory.value,
        description: productdescription.value,
        image: productImage.files[0].name
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
    productImage.value = "";
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
                                                                            src="images/${productlist[i].image}"
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
                                                                        
                                                                           
                                                                            <button onclick="deleteProduct(${i})" type="button" class="btn btn-danger m-1 w-75">Delete <i class="fas fa-trash"></i></button>
                                                                             <button onclick="setForUpdate(${i})" type="button" class="btn btn-warning m-1 w-75">Edit <i class="fas fa-edit"></i></button>
                                                                    </div>

                                                                </div>`;

        // rowContainer.innerHTML += productCard;
    }
    document.getElementById("rowContainer").innerHTML = productCard;
}
// function searchProducts() {
//     var searchValue = productSearchInput.value.toLowerCase();
//     var filteredProducts = productlist.filter(function (product) {
//         return product.name.toLowerCase().includes(searchValue);
//     });
//     displayFilteredProducts(filteredProducts);
// }
// function displayFilteredProducts(filteredProducts) {
//     var productCard = "";
//     for (var i = 0; i < filteredProducts.length; i++) {
//         productCard += ` <div
//                                                                     class="col-md-2 col-sm-6 ">
//                                                                     <div
//                                                                         class="product">
//                                                                         <img
//                                                                             src="images/banana.jpeg"
//                                                                             alt="Product Image"
//                                                                             class="product-image w-50">
//                                                                         <h3
//                                                                             class="product-name fw-bold"> ${filteredProducts[i].name}</h3>
//                                                                         <p
//                                                                             class="product-price">Price: $${filteredProducts[i].price}</p>
//                                                                         <p
//                                                                             class="product-category fw-bold ">
//                                                                             Category: ${filteredProducts[i].category}</p>
//                                                                         <p
//                                                                             class="product-description fw-bold">
//                                                                             Description: ${filteredProducts[i].description}</p>
//                                                                             features.</p>
//                                                                     </div>

//                                                                 </div>`;
//     }
//     document.getElementById("rowContainer").innerHTML = productCard;
// }
function searchProducts() {
    var searchValue = productSearchInput.value;
    var cartona = "";
    for (var i = 0; i < productlist.length; i++) {
        if (productlist[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
            cartona += ` <div
                                                                    class="col-md-2 col-sm-6 ">
                                                                    <div
                                                                        class="product">
                                                                        <img
                                                                            src="images/${productlist[i].image}"
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
                                                                            <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                                                                             <button onclick="setForUpdate(${i})" type="button" class="btn btn-warning m-1 w-75">Edit <i class="fas fa-edit"></i></button>

                                                                    </div>

                                                                </div>`;
        }

    }
    // productlist = JSON.parse(localStorage.getItem("productlist"));

    document.getElementById("rowContainer").innerHTML = cartona;
}
function deleteProduct(index) {
    productlist.splice(index, 1);
    displayProducts();
    localStorage.setItem("productlist", JSON.stringify(productlist));

    // localStorage.setItem("productlist", JSON.stringify(productlist));
    // // Clear the input fields
    // clearForm();
    // // Display the updated product list
    // displayProducts();
}
var indexForUpdate;
// الحرامي global variable to store the index of the product being updated. This variable is used in the setForUpdate function to set the index of the product being updated, and in the updateProduct function to update the product at that index.
function setForUpdate(updateIndex) {
    indexForUpdate = updateIndex;
    updateProductBtn.classList.remove("d-none");
    addProductBtn.classList.add("d-none");
    productname.value = productlist[updateIndex].name;
    productprice.value = productlist[updateIndex].price;
    productcategory.value = productlist[updateIndex].category;
    productdescription.value = productlist[updateIndex].description;
    productImage.value = "";

    // updateProductBtn.onclick = function () {
    //     updateProduct(updateIndex);
    // };

}
function updateProduct() {
    if (!validateProduct(true)) {
        return;
    }
    productlist[indexForUpdate].name = productname.value;
    productlist[indexForUpdate].price = productprice.value;
    productlist[indexForUpdate].category = productcategory.value;
    productlist[indexForUpdate].description = productdescription.value;
    if (productImage.files.length > 0) {
        productlist[indexForUpdate].image = productImage.files[0].name;
    }

    localStorage.setItem("productlist", JSON.stringify(productlist));
    clearForm();
    displayProducts();
    updateProductBtn.classList.add("d-none");
    addProductBtn.classList.remove("d-none");
}
