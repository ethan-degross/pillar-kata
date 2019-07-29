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
})