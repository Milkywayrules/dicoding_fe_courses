const reviewListAnime = {
  name: 'query:reviewListAnime',
  schema: `
    query reviewListAnime($mediaID: Int) {
      Page(page: 1, perPage: 20) {
        reviews(mediaId: $mediaID, sort: CREATED_AT_DESC, mediaType: ANIME) {
          id
          summary
          score
          user {
            id
            name
          }
        }
      }
    }
  `,
};

export default reviewListAnime;
