/**
 * 古典学派の単体テスト(pp.32)
 */

import { Customer, Store } from "../usecase"

test('在庫（quantity）が十分にある場合、購入は成功することのテスト', () => {
	const store = new Store()
	store.addInventory('Shampoo', 10)
	const customer = new Customer()

	expect(customer.purchase(store, 'Shampoo', 5)).toBe(true)
	expect(store.getInventory('Shampoo')).toBe(5)
})

test('在庫（quantity）が十分にない場合、購入は失敗する', () => {
	const store = new Store()
	store.addInventory('Shampoo', 10)
	const customer = new Customer()

	expect(customer.purchase(store, 'Shampoo', 15)).toBe(false)
	expect(store.getInventory('Shampoo')).toBe(10)
})
