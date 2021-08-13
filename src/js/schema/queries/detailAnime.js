/**
 * @type {QueryStructure}
 */
const detailAnime = {
  name: 'query:detailAnime',
  schema: `
    query detailAnime($mediaID: Int) {
      Media(id: $mediaID, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        format
        status
        description
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        seasonYear
        episodes
        duration
        updatedAt
        coverImage {
          large
          medium
          color
        }
        bannerImage
        genres
        synonyms
        averageScore
        meanScore
        popularity
        trending
        favourites
        # get current studio
        studios(isMain:true) {
          nodes{
            id
            name
            isAnimationStudio
          }
        }
        nextAiringEpisode {
          id
          airingAt
          timeUntilAiring
          episode
        }
        externalLinks {
          id
          url
          site
        }
        streamingEpisodes {
          title
          thumbnail
          url
          site
        }
        # get anime related media
        relations {
          # Array of relations edges
          edges {
            id
            relationType
            # Relations node
            node{
              id
              type
              status
              title{
                romaji
                english
              }
              coverImage{
                medium
              }
            }
          }
        }
        # get other recommendations
        recommendations(sort:RATING_DESC, perPage: 10) {
          # Array of recommendations edges
          edges {
            # Recommendations node
            node {
              id
              # rating
              # userRating
              mediaRecommendation {
                id
                title{
                  romaji
                  english
                }
              }
            }
          }
        }
        # -- considering make a dedicated query
        # get all characters
        characters(page: 1, sort: FAVOURITES_DESC) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          # Array of character edges
          edges {
            role
            # Character node
            node {
              id
              name {
                full
                first
                middle
                last
              }
              image {
                large
                medium
              }
            }
            # Array of voice actors of this character for the anime
            voiceActors(language:JAPANESE) {
              id
              languageV2
              name {
                full
                native
              }
              image {
                large
                medium
              }
            }
          }
        }
        
        # -- reserve buat nanti, tapi dipake
        # stats{
        #   scoreDistribution {
        #     score
        #     amount
        #   }
        # }
        
      }
    }
  `,
};

export default detailAnime;
