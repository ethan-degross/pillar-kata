export function addItemToInventory(inventory, itemName, itemPrice, itemMarkdownDecrease, itemMarkdownLimit, itemSpecialType, itemSpecialLimit) {
    
    let item = {
    "itemName":itemName,
    "itemPrice":itemPrice,
    "itemMarkdown":{
        "decrease":itemMarkdownDecrease,
        "limit":itemMarkdownLimit
    },
    "itemSpecial":{
        "type":itemSpecialType,
        "limit":itemSpecialLimit
    }}
    inventory.unshift(item)
    return inventory
}

export function editItem(inventory, itemNameToSearch, key, newValue){
    inventory.forEach(function (element) {
        if(element.itemName == itemNameToSearch){
            if(key == "itemMarkdown.decrease") {
                element.itemMarkdown.decrease = newValue
            } else if (key == "itemMarkdown.limit") {
                element.itemMarkdown.limit = newValue
            } else if (key == "itemSpecial.type") {
                element.itemSpecial.type = newValue
            } else if (key == "itemSpecial.limit") {
                element.itemSpecial.limit = newValue
            } else {
                element[key] = newValue
            }
        }
    })
    return inventory
}

export function checkoutTotal(inventory, scannedItems){
    let currentItemFromInventory
    let total = 0
    let receipt = []
    let receiptIndex = 0

    function search(nameKey, myArray){
        for (var i = 0; i < myArray.length; i++){
            if (myArray[i].itemName === nameKey) {
                return i
            }
        }
    }
    //to mimic the scanning/updating feature, "everything" must happen in the loop below
    scannedItems.forEach(function(element) {

        for(let i = 1; i <= element.quantity; i++){

        
        receiptIndex = search(element.itemName, receipt)//uses search function to determine what place(index) the scanned item matches
        
        currentItemFromInventory = inventory.find(x => x.itemName === element.itemName)//searches the inventory and matches the scanned item with the inventory item of the same name

        if(receiptIndex === undefined && element.weight != null){
            receipt.push({
                "itemName":currentItemFromInventory.itemName, 
                "itemPrice": currentItemFromInventory.itemPrice,
                "totalItemQuantity":1, 
                "itemWeight":element.weight, 
                "markdown":currentItemFromInventory.itemMarkdown.decrease, 
                "markdownLimit":currentItemFromInventory.itemMarkdown.limit,
                "special":currentItemFromInventory.itemSpecial.type,
                "specialLimit":currentItemFromInventory.itemSpecial.limit,
                "totalItemPrice":(currentItemFromInventory.itemPrice - currentItemFromInventory.itemMarkdown.decrease) * element.weight
            })
        } else if(receiptIndex === undefined ){
            receipt.push({
                "itemName":currentItemFromInventory.itemName, 
                "itemPrice": currentItemFromInventory.itemPrice,
                "totalItemQuantity":1, 
                "itemWeight":element.weight, 
                "markdown":currentItemFromInventory.itemMarkdown.decrease, 
                "markdownLimit":currentItemFromInventory.itemMarkdown.limit,
                "special":currentItemFromInventory.itemSpecial.type,
                "specialLimit":currentItemFromInventory.itemSpecial.limit,
                "totalItemPrice":currentItemFromInventory.itemPrice - currentItemFromInventory.itemMarkdown.decrease
            })
        } else if(element.weight != null && receipt[receiptIndex].markdownLimit != null && receipt[receiptIndex].totalItemQuantity >= receipt[receiptIndex].markdownLimit){
            receipt[receiptIndex].totalItemQuantity += 1
            receipt[receiptIndex].itemWeight += element.weight
            receipt[receiptIndex].totalItemPrice += currentItemFromInventory.itemPrice * element.weight
        } else if(element.weight != null){
            receipt[receiptIndex].totalItemQuantity += 1
            receipt[receiptIndex].itemWeight += element.weight
            receipt[receiptIndex].totalItemPrice += (currentItemFromInventory.itemPrice - currentItemFromInventory.itemMarkdown.decrease) * element.weight
        } else if(receipt[receiptIndex].markdownLimit != null && receipt[receiptIndex].totalItemQuantity >= receipt[receiptIndex].markdownLimit){
            receipt[receiptIndex].totalItemQuantity += 1
            receipt[receiptIndex].itemWeight += element.weight
            receipt[receiptIndex].totalItemPrice += currentItemFromInventory.itemPrice
        } else {
            receipt[receiptIndex].totalItemQuantity += 1
            receipt[receiptIndex].itemWeight += element.weight
            receipt[receiptIndex].totalItemPrice += currentItemFromInventory.itemPrice - currentItemFromInventory.itemMarkdown.decrease 
        } 
    }//end of each "element itemQuantity" for-loop
    })//end of scannedItems ForEach

    for(let i = 0; i < receipt.length; i++){
        total += receipt[i].totalItemPrice
    }
    //console.log(receipt)
    return Math.round(total * 1e2) / 1e2
}



