/**
 * ロンドン学派の単体テスト（pp.33）
 */

import { Customer, IStore } from "../usecase"


afterEach(() => {
	jest.clearAllMocks()
})

test('在庫（quantity）が十分にある場合、購入は成功することのテスト', () => {
	const MockStore = jest.fn<IStore, []>().mockImplementation(() => ({
		hasEnoughInventory: jest.fn().mockReturnValue(true),
		removeInventory: jest.fn().mockImplementation(() => {}),
		addInventory: jest.fn(),
		getInventory: jest.fn()
	}))

	const store = new MockStore()
	const customer = new Customer()
	const result = customer.purchase(store, 'Shampoo', 5)

	expect(result).toBe(true)
	expect(store.removeInventory).toHaveBeenCalledTimes(1)
})

test('在庫（quantity）が十分にない場合、購入は失敗する', () => {
	const MockStore = jest.fn<IStore, []>().mockImplementation(() => ({
		hasEnoughInventory: jest.fn().mockReturnValue(false),
		removeInventory: jest.fn().mockImplementation(() => {}),
		addInventory: jest.fn(),
		getInventory: jest.fn()
	}))

	const store = new MockStore()	
	const customer = new Customer()
	const result = customer.purchase(store, 'Shampoo', 15)

	expect(result).toBe(false)
	expect(store.removeInventory).not.toHaveBeenCalled()

})
