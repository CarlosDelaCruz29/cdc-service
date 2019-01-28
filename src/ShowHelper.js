/**
 * Helper class used to perform filtering and formatting functions for the web service
 */
class ShowHelper {

    /**
     * Empty Constructor
     */
    ShowHelper() {}

    /**
     * Returns filtered and formatted show data
     * @param {Object} showData the data sent to the service
     * @returns {Object} will either return an array of the formatted shows or null
     */
    getFilteredAndFormattedShows(showData) {
        // if there is no data sent to the service, return null
        if(showData != null) {
            // get the payload from the sent data
            let payload = showData.payload;
            
            // filter the shows
            let filteredShows = this.getFilteredShows(payload);

            // format what data to keep / show, if there are no shows in the array, return null
            let formattedShows = (filteredShows) ? this.formatShows(filteredShows) : null;
            
            return formattedShows;
        }

        return null;
    }

    /**
     * Filter the provided payload
     * @param {Object} payload the list of shows inside of the sent data (payload)
     * @returns {Object} returns the filtered show data, if the payload does not exist, return null
     */
    getFilteredShows(payload) {
        // return null if the payload does not exist
        if(payload != null) {
            return payload.filter((show) => {
                // return shows with:
                // - DRM enabled (drm: true) 
                // - at least one episode (episodeCount > 0)
                // - slug, show image, and title exist
                return show.drm == true && show.episodeCount > 0 
                    && show.slug != null && show.image != null
                    && show.image.showImage != null && show.title != null;
            });
        }
        
        return null;
    }

    /**
     * Formats the showdata to only include the image, slug and title of each shows
     * @param {Object} shows list of show data
     * @returns {Object} the formatted list of show data
     */
    formatShows(shows) {
        return shows.map((show) => {
            return {
                "image": show.image.showImage,
                "slug": show.slug,
                "title": show.title
            }
        });
    }
}

module.exports = ShowHelper;