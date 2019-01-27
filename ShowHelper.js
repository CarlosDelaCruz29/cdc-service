class ShowHelper {

    ShowHelper() {}

    getFilteredAndFormattedShows(showData) {
        // From the list of shows in the request payload, 
        // return the ones with DRM enabled (drm: true) 
        // AND at least one episode (episodeCount > 0).

        if(showData != null) {
            let payload = showData.payload;
            let filteredShows = this.getFilteredShows(payload);
            let formattedShows = (filteredShows) ? this.formatShows(filteredShows) : null;
            return formattedShows;
        }

        return null;
    }

    getFilteredShows(payload) {
        if(payload != null) {
            return payload.filter((show) => {
                return show.drm == true && show.episodeCount > 0;
            });
        }
        return null;
    }

    formatShows(shows) {
        return shows.map((show) => {
            return {
                "slug": show.slug,
                "image": show.image.showImage,
                "title": show.title
            }
        });
    }
}

module.exports = ShowHelper;