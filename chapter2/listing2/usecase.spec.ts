/**
 * ロンドン学派の単体テスト（pp.33）
 */

import { Customer, Store } from "../usecase"

afterEach(() => {
	jest.restoreAllMocks()
})

test('在庫（quantity）が十分にある場合、購入は成功することのテスト', () => {
	const store = new Store()

	jest.spyOn(store, 'hasEnoughInventory').mockReturnValue(true)
	const mockedRemoveInventory = jest.spyOn(store, 'removeInventory').mockImplementation(() => {})

	const customer = new Customer()
	const result = customer.purchase(store, 'Shampoo', 5)

	expect(result).toBe(true)
	expect(mockedRemoveInventory).toHaveBeenCalled()
})

test('在庫（quantity）が十分にない場合、購入は失敗する', () => {
	const store = new Store()

	jest.spyOn(store, 'hasEnoughInventory').mockReturnValue(false)
	const mockedRemoveInventory = jest.spyOn(store, 'removeInventory').mockImplementation(() => {})
	
	const customer = new Customer()
	const result = customer.purchase(store, 'Shampoo', 15)

	expect(result).toBe(false)
	expect(mockedRemoveInventory).not.toHaveBeenCalled()

})
