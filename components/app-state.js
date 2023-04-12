class AppState {
  static user = {
    username: null,
    logged: false,
  };

  static game = {
    score: 0,
    timer: 0,
    level: 1,
  };
}

export default AppState;
