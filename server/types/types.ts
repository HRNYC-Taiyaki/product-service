export type ProductType = {
    "id": number,
    "campus": string,
    "name": string,
    "slogan": string,
    "description": string,
    "category": string,
    "default_price": string
  }

  export interface Feature {
    feature: string,
    value: string,
  }

  export interface Featured {
    "id": number,
    "campus": string,
    "name": string,
    "slogan": string,
    "description": string,
    "category": string,
    "default_price": string,
    "sale_price": string | null,
    "features": Feature[],
  }

  export const FeaturedExample : Featured = {
    "id": 0,
    "campus": '',
    "name": '',
    "slogan": '',
    "description": '',
    "category": '',
    "default_price": '',
    "sale_price": null,
    "features": [{
        feature: '',
        value: ''
    }],
  }

  export interface SkusObj {
    quantity: number,
    size: string,
  }

  export interface PhotosObj {
    url: string,
    thumbnail_url: string,
  }
  
  export interface Result {
    "style_id": number,
    "name": string,
    "original_price": string,
    "sale_price"?: any,
    "default?": boolean,
    "photos": PhotosObj[],
    "skus": any,
  }
  
  export interface Style {
    "product_id": number,
    "results": Result[],
  }