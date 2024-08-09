// Function to fetch JSON data
async function fetchData() {
    try {
        const response = await fetch('product.json');
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}

// Function to display data in the table
function displayData(data) {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = ''; // Clear existing content

    data.forEach(product => {
        const row = document.createElement('tr');
        // Set an onclick attribute or event listener
        row.setAttribute('onclick', `handleRowClick('${product.ProductName}')`);
        row.innerHTML = `
            <td><img src="${product.Image}" id="productImage"/></td>
            <td>${product.ProductID}</td>
            <td>${product.ProductName}</td>
          
            <td>${product.BrandName}</td>
            <td>${product.MSRP}</td>
            <td>${product.MaterialsUsed}</td>
           <td id="tagtable">
           ${(Array.isArray(product.Size) && product.Size.length > 1) 
            ? `<ul>${product.Size.map(size => `<li id="tagLi">${size}</li>`).join('')}</ul>` 
            : Array.isArray(product.Size) 
            ?  `<li id="tagLi">${product.Size.join(', ')}</li>`
            :  `<li id="tagLi">${product.Size}</li>`}
           </td>`;
        tableBody.appendChild(row);
    });
}


function handleRowClick(styleNo) {
    // Redirect to the product details page with the StyleNo as a URL parameter
    window.location.href = `product-details.html?styleNo=${encodeURIComponent(styleNo)}`;
}



// Function to display product details in a hidden section
// function showProductDetails(product) {
//     document.getElementById('mainProduct').style.display = 'none';
//     document.getElementById('product-details').style.display = 'block';

//     document.getElementById('product-id').textContent = product.StyleNo;
//     document.getElementById('product-name').textContent = product.ProductName;
//     document.getElementById('product-brand').textContent = product.BrandName;
//     document.getElementById('product-price').textContent = product.MSRP;
//     document.getElementById('product-materials').textContent = product.MaterialsUsed;
//     document.getElementById('product-size').textContent = product.Size;


// Function to go back to the main product list
// document.getElementById('back-to-products').addEventListener('click', () => {
//     document.getElementById('product-details').style.display = 'none';
//     document.getElementById('mainProduct').style.display = 'block';
// });

// Function to search for products
// function searchProduct() {
//     const searchQuery = document.getElementById('search-box').value.toLowerCase();
//     async function fetchDatasearch() {
//         try {
//             const response = await fetch('product.json');
//             const data = await response.json();
//             const filteredProducts = data.filter(product => {
//                 return product.ProductName.toLowerCase().includes(searchQuery) || product.StyleNo.toLowerCase().includes(searchQuery);});
//             displayData(filteredProducts); 
//             } catch (error) {
//             console.error('Error fetching JSON data:', error);
//         }
//     }

//     fetchDatasearch()
    
    
    
// }


document.getElementById('search-box').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchProduct();  // Call the search function when Enter is pressed
    }
});

function searchProduct() {
    const searchQuery = document.getElementById('search-box').value.toLowerCase();

    async function fetchDatasearch() {
        try {
            const response = await fetch('product.json');
            const data = await response.json();

            // Separate products that match the search query from those that don't
            const matchingProducts = data.filter(product => {
                return product.ProductName.toLowerCase().includes(searchQuery) || product.StyleNo.toLowerCase().includes(searchQuery);
            });

            const nonMatchingProducts = data.filter(product => {
                return !product.ProductName.toLowerCase().includes(searchQuery) && !product.StyleNo.toLowerCase().includes(searchQuery);
            });

            // Combine matching products first, followed by non-matching ones
            const reorderedProducts = [...matchingProducts, ...nonMatchingProducts];

            // Display the reordered list
            displayData(reorderedProducts);
        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }
    }

    fetchDatasearch();
}


// Fetch data when the page loads
fetchData();
