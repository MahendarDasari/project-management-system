import { FETCH_CATEGORIES } from '../actions/categoryActions';
import { Category } from '../types';

const initialState: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    subcategories: [
      {
        id: 1,
        name: 'TV',
        category_id: 1,
      },
      {
        id: 2,
        name: 'Mobile',
        category_id: 1,
      },
      {
        id: 3,
        name: 'Refrigerator',
        category_id: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'Apparel',
    subcategories: [
      {
        id: 4,
        name: "Men's Cloth",
        category_id: 2,
      },
      {
        id: 5,
        name: "Women's Cloth",
        category_id: 2,
      },
    ],
  },
  {
    id: 3,
    name: 'Footwear',
    subcategories: [
      {
        id: 6,
        name: "Men's Footwear",
        category_id: 3,
      },
      {
        id: 7,
        name: "Kid's Footwear",
        category_id: 3,
      },
    ],
  },
];

const categoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return state;
    default:
      return state;
  }
};

export default categoryReducer;
