const SET_REGION = 'SET_REGION';
const SET_REGIONS = 'SET_REGIONS';
const SET_FAVORITE = 'SET_FAVORITE';

const initial_state = {
  region: { id: 'FR', name: 'France' },
  regions: [],
  favourites: []
};

export default function reducer(prev_state = initial_state, action) {
  switch (action.type) {
    case SET_REGION:
      return Object.assign({}, prev_state, {
        region: action.payload.region
      });
      break;
    case SET_REGIONS:
      return Object.assign({}, prev_state, {
        regions: action.payload.regions
      });
      break;
    case SET_FAVORITE:
      return Object.assign({}, prev_state, {
        favourites: action.payload.favs
      });
      break;
    default:
      return prev_state;
      break;
  }
}
