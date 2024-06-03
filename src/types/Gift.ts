export type Gift = {
  id: string;
  title: string;
  description: string;
  assetTypeToExchange: string;
  assetAmountToExchange: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};
