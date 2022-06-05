// teammember item
export type member = {
  image: string;
  title: string;
  content: string;
};

// roadmap item
export type itemRoadmap = {
  period: string;
  content: string[];
};

// nft setting
export type nftSetting = {
  mintStep: number;
  salePrice: number;
  totalLimit: number;
  currentMint: number;
  mintLimit: number;
};

// nft status
export type nftStatus = {
  presaleCount: number;
  publicsaleCount: number;
};
