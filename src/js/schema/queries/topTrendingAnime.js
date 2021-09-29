/**
 * @type {QueryStructure}
 */
const topTrendingAnime = {
  name: 'query:topTrendingAnime',
  schema: `
    query topTrendingAnime($sort: [MediaSort], $perPage: Int, $page: Int) {
      Page(perPage: $perPage, page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        media(sort: $sort, type: ANIME) {
          id
          averageScore
          seasonYear
          episodes
          duration
          format
          status
          title {
            romaji
            english
            native
          }
          genres
          coverImage {
            extraLarge
            large
            medium
            color
          }
          description
        }
      }
    }
  `,
};

export default topTrendingAnime;
