export interface ItemObj{
  id: number,
  image: string,
  anime: string,
  name: string,
  rating: number,
  price: number,
  color: string,
  material: string,
  sizes: string[],
}

export interface OrderItem extends ItemObj{
    name: string,
    quantity: number,
}

export interface CartItem{
  object: ItemObj,
  count: number,
}