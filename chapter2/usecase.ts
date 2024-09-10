type Product = 'Shampoo' | 'Book'

export interface IStore {
	hasEnoughInventory: (product: Product, quantity: number) => boolean
	removeInventory: (product: Product, quantity: number) => void
	addInventory: (product: Product, quantity: number) => void
	getInventory: (product: Product) => number
}

export class Store implements IStore {
	private readonly inventory = new Map<Product, number>()

	hasEnoughInventory(product: Product, quantity: number): boolean {
		return this.getInventory(product) >= quantity
	}

	removeInventory(product: Product, quantity: number): void {
		const obtainQuantity = this.inventory.get(product)

		if (!this.hasEnoughInventory(product, quantity) || obtainQuantity == null) {
			throw new Error('Not enough inventory')
		}
		
		this.inventory.set(product, obtainQuantity - quantity)
	}

	addInventory(product: Product, quantity: number): void {
		const obtainQuantity = this.inventory.get(product)
		if (this.inventory.has(product) && obtainQuantity != null) {
			this.inventory.set(product, obtainQuantity + quantity)
		} else {
			this.inventory.set(product, quantity)
		}
	}

	getInventory(product: Product): number {
		const obtainNum = this.inventory.get(product)
		return obtainNum != null ? obtainNum : 0
	}
}

export class Customer {
	purchase(store: IStore, product: Product, quantity: number) {
		if(!store.hasEnoughInventory(product, quantity)) {
			return false
		}

		store.removeInventory(product, quantity)

		return true
	}
}
