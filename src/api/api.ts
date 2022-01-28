const MAIN = "https://www.balldontlie.io/api/v1/";

export const GET_ALL_PlAYERS_URL = (pageNumber: number): string => {
  return `${MAIN}players?page=${pageNumber}&per_page=30`;
};

export const GET_SEARCHED_PLAYERS_URL = (searchInput: string): string => {
  return `${MAIN}players?search=${searchInput}&per_page=30`;
};

export const GET_PlAYER_STATS_URL = (id: string): string => {
  return `${MAIN}stats?player_ids[]=${id}`;
};
