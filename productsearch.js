// Function to fetch JSON data
async function fetchData() {
    try {
        const response = await fetch('products.json');
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
        row.innerHTML = 
            `<td><img id='productImage' src="${product.Image}"></td>
            <td>${product.ProductID}</td>
            <td>${product.ProductName}</td>
            <td>${product.BrandName}</td>
            <td>${product.MSRP}</td>
            <td>${product.MaterialsUsed}</td>
            <td id='tagTable'>${product.TagName}</td>
        `;
        tableBody.appendChild(row);
    });
}
function searchProduct() {
    const searchQuery = document.getElementById('search-box').value.toLowerCase();

    async function fetchDatasearch() {
        try {
            const response = await fetch('products.json');
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