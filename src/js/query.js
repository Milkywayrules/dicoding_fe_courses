export const SEARCH_ANIME_QUERY = `
  query getAnime($search: String, $perPage: Int, $page: Int) {
    Page(perPage: $perPage, page: $page) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(search: $search, type: ANIME) {
        id
        idMal
        title {
          romaji
          english
          native
        }
      }
    }
  }
`;
