// -----------------------------------------------
/**
 * @typedef AnimeDetailPayload
 * @property {FullMedia} Media
 */
// -----------------------------------------------
/**
 * @typedef FullMedia
 * @prop {number} id
 * @prop {Title} title
 * @prop {String} format
 * @prop {String} status
 * @prop {String} description
 * @prop {DateObj} startDate
 * @prop {DateObj} endDate
 * @prop {number} seasonYear
 * @prop {*} episodes
 * @prop {number} duration
 * @prop {number} updatedAt
 * @prop {ImageFormat} coverImage
 * @prop {String} bannerImage
 * @prop {Array<String>} genres
 * @prop {Array<String>} synonyms
 * @prop {number} averageScore
 * @prop {number} meanScore
 * @prop {number} popularity
 * @prop {number} trending
 * @prop {number} favourites
 * @prop {Studios} studios
 * @prop {NextAiringEpisode} nextAiringEpisode
 * @prop {Array<ExternalLink>} externalLinks
 * @prop {Array<StreamingEpisode>} streamingEpisodes
 * @prop {Relations} relations
 * @prop {Recommendations} recommendations
 * @prop {Characters} characters
 */
// -----------------------------------------------
/**
 * @typedef DateObj
 * @property {(null | number)} year
 * @property {(null | number)} month
 * @property {(null | number)} day
 */
// -----------------------------------------------
/**
 * @typedef ImageFormat
 * @property {String} [extraLarge]
 * @property {String} [large]
 * @property {String} medium
 * @property {String} [color]
 */
// -----------------------------------------------
/**
 * @typedef Studios
 * @property {Array<StudiosNodesItem>} nodes
 */

/**
 * @typedef StudiosNodesItem
 * @property {number} id
 * @property {String} name
 * @property {Boolean} isAnimationStudio
 */
// -----------------------------------------------
/**
 * @typedef NextAiringEpisode
 * @property {number} id
 * @property {number} airingAt
 * @property {number} timeUntilAiring
 * @property {number} episode
 */
// -----------------------------------------------
/**
 * <ExternalLinks> is an array of this <ExternalLink>
 * @typedef ExternalLink
 * @property {number} id
 * @property {String} url
 * @property {String} site
 */
// -----------------------------------------------
/**
 * <StreamingEpisodes> is an array of this <StreamingEpisode>
 * @typedef StreamingEpisode
 * @property {String} title
 * @property {String} thumbnail
 * @property {String} url
 * @property {String} site
 */
// -----------------------------------------------
/**
 * @typedef Relations
 * @property {Array<RelationsEdgesItem>} edges
 */

/**
 * @typedef RelationsEdgesItem
 * @property {number} id
 * @property {String} relationType
 * @property {RelationsEdgesItemNode} node
 */

/**
 * @typedef RelationsEdgesItemNode
 * @property {number} id
 * @property {String} type
 * @property {String} status
 * @property {Title} Title
 * @property {ImageFormat} coverImage
 */
// -----------------------------------------------
/**
 * @typedef Recommendations
 * @property {Array<RecommendationsEdgesNode>} edges
 */
/**
 * @typedef RecommendationsEdgesNode
 * @property {number} id
 * @property {{id: number, title: Title}} mediaRecommendation
 */
// -----------------------------------------------
/**
 * @typedef Characters
 * @property {PageInfo} pageInfo page related info
 * @property {Array<CharactersEdgesItem>} edges This is edges contain array of node
 */

/**
 * @typedef CharactersEdgesItem
 * @property {String} role
 * @property {CharactersEdgesItemNode} node
 * @property {Array<CharactersEdgesItemVoiceActor>} voiceActors
 */

/**
 * @typedef CharactersEdgesItemNode
 * @property {number} id
 * @property {CharacterName} name
 * @property {ImageFormat} image
 */

/**
 * @typedef CharactersEdgesItemVoiceActor
 * @property {number} id
 * @property {String} languageV2
 * @property {StaffName} name
 * @property {ImageFormat} image
 */
// -----------------------------------------------
/**
 * @typedef CharacterName
 * @property {String} first
 * @property {String} middle
 * @property {String} last
 * @property {String} full
 * @property {String} [native]
 * @property {String} [alternative]
 * @property {String} [alternativeSpoiler]
 * @property {String} [userPreferred]
 */

/**
 * @typedef StaffName
 * @property {String} first
 * @property {String} middle
 * @property {String} last
 * @property {String} full
 * @property {String} [native]
 * @property {String} [alternative]
 * @property {String} [userPreferred]
 */
// -----------------------------------------------
