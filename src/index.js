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

