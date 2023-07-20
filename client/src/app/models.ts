  export interface UserInfoProps {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }

  export interface CartItemProps {
    itemId: number;
    itemName: string;
    price: number;
    imgUrl: string;
    quantity: number;
    owner: number
  }

  export interface UserItemProps {
    itemId: number;
    itemName: string;
    price: number;
    imgUrl: string;
    owner?: number;
  }

  export interface UserLocalStorage {
    id: number;
    token: string;
    username: string
  }