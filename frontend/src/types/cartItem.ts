export interface cartItem {
  bookID: number;
  title: string;
  price: number;
  quantity: number; // new addition because we need to count how many books there are in quantity and define the type
}
