import chai from 'chai'
import { expect } from 'chai'
import * as F from '../src/index'
import { inventoryList, inventoryListA, scannedItems, scannedItemsA, inventoryListB } from './mock-data'

describe('Store Inventory', () => {
    it('exists', () => {
        expect(inventoryList).to.exist
    })
    it('has the correct keys', () => {
        expect(inventoryList[0]).to.be.an('object').includes.keys("itemName", "itemPrice", "itemMarkdown", "itemSpecial")
        expect(inventoryList[1].itemMarkdown).include.keys("decrease", "limit")
        expect(inventoryList[2].itemSpecial).include.keys("type", "limit")
    })
    it('added an item', () => {
        expect(F.addItemToInventory(inventoryList, "chips", 1.99, null, null, null, null)).to.be.an('array')
        expect(inventoryList.find(item => item.itemName === "chips").itemName).to.include("chips")
    })
})

describe('Functions that edit the store inventory', () => {
    it('Item edited', () => {
        expect(F.editItem(inventoryList, "bread", "itemPrice", 10.99)).to.be.an('array')
        expect(inventoryList.find(item => item.itemName === "bread").itemPrice).to.equal(10.99)

        F.editItem(inventoryList, "bread", "itemName", "whole wheat bread")
        expect(inventoryList.find(item => item.itemName === "whole wheat bread")).to.not.be.undefined

        F.editItem(inventoryList, "chips", "itemPrice", 2.99)
        expect(inventoryList.find(item => item.itemName === "chips").itemPrice).to.equal(2.99)
    })
    it('Edited the nested keys', () => {
        F.editItem(inventoryList, "chips", "itemMarkdown.decrease", 1)
        expect(inventoryList.find(item => item.itemName === "chips").itemMarkdown.decrease).to.equal(1)

        F.editItem(inventoryList, "whole wheat bread", "itemMarkdown.limit", 5)
        expect(inventoryList.find(item => item.itemName === "whole wheat bread").itemMarkdown.limit).to.equal(5)
    })
})

describe('Scanned Items', () => {
    it('exists', () => {
        expect(scannedItems).to.exist
    })
    it('has the correct keys', () => {
        expect(scannedItems[0, 1, 2]).to.be.an('object').include.keys("itemName", "quantity", "weight")
    })
})

describe('Calculate the Total', () => {
    it('returns the correct total using quantity and weight', () => {
        expect(F.checkoutTotal(inventoryListA, scannedItems)).to.equal(17.44)
        expect(F.checkoutTotal(inventoryListA, scannedItemsA)).to.equal(32.44)
    })
    it('returns the total using markdowns', () => {
        expect(F.checkoutTotal(inventoryListB, scannedItems)).to.equal(15.94)
    })
})