import chai from 'chai'
import { expect } from 'chai'
import * as F from '../src/index'
import { inventoryList } from './mock-data'

describe('Store Inventory', () => {
    it('exists', () => {
        expect(inventoryList).to.exist
    })
    it('has the correct keys', () => {
        expect(inventoryList[0]).to.be.an('object').includes.keys("itemName", "itemPrice", "itemMarkdown", "itemSpecial")
        expect(inventoryList[0].itemMarkdown).include.keys("decrease", "limit")
        expect(inventoryList[0].itemSpecial).include.keys("type", "limit")
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

describe('Helper Function to better access arrays', () => {
    it('pulls the correct index using an id', () => {
        expect(inventoryList.find(item => item.itemName === "chips").itemMarkdown.decrease).to.equal(1)

        expect(inventoryList.find(item => item.itemName === "whole wheat bread").itemMarkdown.limit).to.equal(5)
    })
})