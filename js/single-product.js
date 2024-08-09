/* Smeena: Additional JS and json data retrieval */

// AJAX Request to Fetch the JSON Data
const xhr = new XMLHttpRequest();
xhr.open('GET', '../js/fashion_items.json', true); // Replace with the correct path to your JSON file

xhr.onload = function () {
    if (xhr.status === 200) {
        const fashionItems = JSON.parse(xhr.responseText);
        displayRandomFashionItem(fashionItems.fashion_items);
    } else {
        console.error('Failed to load JSON data');
    }
};

xhr.send();

// Function to Display a Random Fashion Item
function displayRandomFashionItem(items) {
    const container = document.getElementById('fashion-item-container');

    // Get a random index
    const randomIndex = Math.floor(Math.random() * items.length);
    const item = items[randomIndex];

    // Generate HTML for the random item
    container.innerHTML = `
    <div class="product-section"><div class="left-column">
    <div class="product-info">
    <h2>${item.product_creation.name} </h2>
      </div>
      <div class="qr-code">
        <img src="../images/QR.png" alt="QR Code">
      </div>
    </div>
    <div class="product-image">
    <img src="${item.product_creation.thumbnail}" alt="${item.product_creation.name}">
        </div>
    <div class="right-column">
      <div class="double-sided-arrow"></div>
      <div class="product-lifestyle">
        <h1 class='left'><strong>Product Life Cycle</strong></h1>

       <div class='product-history'>
        <p class='resold-heading left'><strong>ORIGINAL PURCHASE</strong><br>
        <span class='resold-text left'> ${item.purchase.year} ${item.purchase.season} in ${item.purchase.location}</span></p>
    
       
            ${item.resold.map(resold => `
                <div class='resold-box'>
                 <p class='resold-heading'>RESOLD</p>
                    <p class='resold-price'> £${resold.price}</p>
                    <p class='resold-text'> ${resold.location}</p>
                    <p class='resold-text'> ${resold.year}</p>
                
                </div>
            `).join('')}
            
            <p class='resold-heading left royalty product-history'>ROYALTY</p>
            <p class='resold-text left product-history'> ${item.royalty.percentage}%</p>
    </div>
      </div>
    </div>


       
            
            
            `;
}
