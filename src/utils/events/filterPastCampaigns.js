const filterPastCampaigns = (events) => {
    return events
        .filter((data) => new Date(data.endAt) > new Date())
        .sort(function (a, b) {
            if (a.startAt < b.startAt) {
                return -1;
            }
            if (a.startAt > b.startAt) {
                return 1;
            }
            return 0;
        });
};

export default filterPastCampaigns;
