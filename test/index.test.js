import chai from 'chai'
import { expect } from 'chai'
import * as F from '../src/index'
import { inventoryList } from './mock-data'

describe('Store Inventory', ()=> {
    it('has invidual item information', () => {
        expect(inventoryList).to.exist
    })
})