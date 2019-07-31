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