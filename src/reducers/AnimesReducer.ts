import { IAnime, IAnimes } from "../models/Anime";

export enum AnimesActionType {
  SET_ANIMES,
  TOP_ANIMES,
}

export interface IAnimesReducer {
  type: AnimesActionType;
  animes: IAnimes;
}

export const animesReducer = (state: IAnimes, action: IAnimesReducer) => {
  switch (action.type) {
    case AnimesActionType.SET_ANIMES:
      const populares = getPopularAnimes(action.animes.animes?.slice());
      return {
        ...state,
        animes: action.animes.animes,
        populares,
        status: action.animes.status,
      };
    case AnimesActionType.TOP_ANIMES:
      return { ...state, top: action.animes.top, status: action.animes.status };
    default:
      return state;
  }
};

const getPopularAnimes = (animes: IAnime[] = []) => {
  let threePopular = Array(3).fill({ popularidad: 0 });
  for (const anime of animes) {
    checkIfShouldUpdatePopulares(anime, threePopular);
  }
  threePopular.reverse();
  return threePopular;
};

const checkIfShouldUpdatePopulares = (anime: IAnime, array: IAnime[]) => {
  if (anime.popularidad) {
    if (anime.popularidad > array[2].popularidad!) {
      updateAndShift(anime, array, 2);
    } else if (anime.popularidad > array[2].popularidad!) {
      updateAndShift(anime, array, 1);
    } else if (anime.popularidad > array[2].popularidad!) {
      updateAndShift(anime, array, 0);
    }
  }
};

const checkIfShouldUpdateTop = (anime: IAnime, array: IAnime[]) => {
  if (anime.ranking) {
    if (anime.ranking > array[2].ranking!) {
      updateAndShift(anime, array, 2);
    } else if (anime.ranking > array[2].ranking!) {
      updateAndShift(anime, array, 1);
    } else if (anime.ranking > array[2].ranking!) {
      updateAndShift(anime, array, 0);
    }
  }
};

const updateAndShift = (anime: IAnime, array: IAnime[], index: number) => {
  for (let i = 0; i <= index; i++) {
    if (i === index) {
      array[i] = anime;
    } else {
      array[i] = array[i + 1];
    }
  }
};
