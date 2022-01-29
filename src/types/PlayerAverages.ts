export type PlayerAverages = Partial<{
  data: [
    {
      games_played: null | number;
      player_id: null | number;
      season: null | number;
      min: null | string;
      fgm: null | number;
      fga: null | number;
      fg3m: null | number;
      fg3a: null | number;
      ftm: null | number;
      fta: null | number;
      oreb: null | number;
      dreb: null | number;
      reb: null | number;
      ast: null | number;
      stl: null | number;
      blk: null | number;
      turnover: null | number;
      pf: null | number;
      pts: null | number;
      fg_pct: null | number;
      fg3_pct: null | number;
      ft_pct: null | number;
    }
  ];
}>;