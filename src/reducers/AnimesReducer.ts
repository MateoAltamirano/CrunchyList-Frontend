import { IAnime, IAnimes } from "../models/Anime";

export enum AnimesActionType {
  SET_ANIMES,
}

export interface IAnimesReducer {
  type: AnimesActionType;
  animes: IAnimes;
}

export const animesReducer = (state: IAnimes, action: IAnimesReducer) => {
  console.log("state2",state)
  switch (action.type) {
    case AnimesActionType.SET_ANIMES:
      const populares = getPopularAnimes(action.animes.animes?.slice());
      const top = getTopAnimes(action.animes.animes?.slice());
      return {
        ...state,
        animes: action.animes.animes,
        populares,
        top,
        status: action.animes.status,
      };
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

const getTopAnimes = (animes: IAnime[] = []) => {
  let topTen = Array(10).fill({ ranking: 0 });
  for (const anime of animes) {
    checkIfShouldUpdateTop(anime, topTen);
  }
  topTen.reverse();
  return topTen;
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
