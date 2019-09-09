
//look into using spread syntax
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

export function salePrice(currentItemFromInventory){
  let salePrice = currentItemFromInventory.itemPrice - currentItemFromInventory.itemMarkdown.decrease
  return salePrice
}
export function addToReceipt(receipt, currentItemFromInventory, element){
  receipt.push({
      "itemName":currentItemFromInventory.itemName,
      "itemPrice": currentItemFromInventory.itemPrice,
      "totalItemQuantity":1,
      "itemWeight":element.weight,
      "markdown":currentItemFromInventory.itemMarkdown.decrease,
      "markdownLimit":currentItemFromInventory.itemMarkdown.limit,
      "special":currentItemFromInventory.itemSpecial.type,
      "specialLimit":currentItemFromInventory.itemSpecial.limit,
      "totalItemPrice": Math.abs(salePrice(currentItemFromInventory) * element.weight)
  })
}



export function main(inventory, scannedItems, specialsList){
    let currentItemFromInventory
    let total = 0
    let receipt = []
    let receiptIndex = 0
    let specialFound

    function search(nameKey, myArray){
        for (var i = 0; i < myArray.length; i++){
            if (myArray[i].itemName === nameKey) {
                return i
            }
        }
    }


    //to "mimic" the scanning/updating feature, "everything" must happen in the loop below
    //in the real world it would be on trigger(scanner read)
    //which would make this O(n), not squared O(n^2)
    scannedItems.forEach(function(element) {

    for(let i = 1; i <= element.quantity; i++){

        receiptIndex = search(element.itemName, receipt)//uses search function to determine what place(index) the scanned item matches

        currentItemFromInventory = inventory.find(x => x.itemName === element.itemName)//searches the inventory and matches the scanned item with the inventory item of the same name

        specialFound = specialsList.find(x => x.specialName === currentItemFromInventory.itemSpecial.type)

        //console.log(specialFound)
        /*
        if(specialFound != undefined){
            console.log(specialFound.specialName, specialFound.A, specialFound.B, specialFound.C)
        }
        */

        //logic below would benefit from some object destructuring and using array.reduce() and also apply()method
        //orders.reduce((accumulatedValue, currentValue) => accumulatedValue  + currentValue)
        if(receiptIndex === undefined){
            addToReceipt(receipt, currentItemFromInventory, element)
        } else if(specialFound != undefined && receipt[receiptIndex].totalItemQuantity <= receipt[receiptIndex].specialLimit){
            receipt[receiptIndex].totalItemQuantity += 1
            receipt[receiptIndex].itemWeight += element.weight
            //logic to determine the special price
            if(specialFound.type === "discount" && receipt[receiptIndex].totalItemQuantity % specialFound.A === 0){
                receipt[receiptIndex].totalItemPrice = ((receipt[receiptIndex].totalItemPrice + currentItemFromInventory.itemPrice) - (specialFound.A * currentItemFromInventory.itemPrice)) + specialFound.B
                //console.log(receipt[receiptIndex].totalItemPrice, "itemCount is " , receipt[receiptIndex].totalItemQuantity)
            } else if(specialFound.type === "bogo" && receipt[receiptIndex].totalItemQuantity % (specialFound.A + specialFound.B) === 0){
                receipt[receiptIndex].totalItemPrice += currentItemFromInventory.itemPrice - (specialFound.B * currentItemFromInventory.itemPrice) * (specialFound.C/100)
                //console.log(receipt[receiptIndex].totalItemPrice)
            } else {
                receipt[receiptIndex].totalItemPrice += currentItemFromInventory.itemPrice
                //console.log(receipt[receiptIndex].totalItemPrice)
            }
        } else if(element.weight != -1 && receipt[receiptIndex].markdownLimit != null && receipt[receiptIndex].totalItemQuantity >= receipt[receiptIndex].markdownLimit){
            receipt[receiptIndex].totalItemQuantity += 1
            receipt[receiptIndex].itemWeight += element.weight
            receipt[receiptIndex].totalItemPrice += currentItemFromInventory.itemPrice * element.weight
        } else if(element.weight != -1){
            receipt[receiptIndex].totalItemQuantity += 1
            receipt[receiptIndex].itemWeight += element.weight
            receipt[receiptIndex].totalItemPrice += salePrice(currentItemFromInventory) * element.weight
        } else if(receipt[receiptIndex].markdownLimit != null && receipt[receiptIndex].totalItemQuantity >= receipt[receiptIndex].markdownLimit){
            receipt[receiptIndex].totalItemQuantity += 1
            receipt[receiptIndex].itemWeight += element.weight
            receipt[receiptIndex].totalItemPrice += currentItemFromInventory.itemPrice
        } else {
            receipt[receiptIndex].totalItemQuantity += 1
            receipt[receiptIndex].itemWeight += element.weight
            receipt[receiptIndex].totalItemPrice += salePrice(currentItemFromInventory)
            //console.log(receipt[receiptIndex].totalItemPrice)

        }

    }//end of each "element itemQuantity" for-loop
    })//end of scannedItems ForEach

    for(let i = 0; i < receipt.length; i++){
        total += receipt[i].totalItemPrice
    }
    //console.log(receipt)
    return Math.round(total * 1e2) / 1e2
}
