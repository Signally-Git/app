import { CustomSelect } from "components";
import { memo, useEffect, useState } from "react";
import { filterPastCampaigns, getCurrentCampaigns, request } from "utils";
import { useIntl } from "react-intl";
import Playlist from "./Playlist";

const EventManager = memo(({ editedEntity, setEditedEntityEvent }) => {
    const intl = useIntl();

    const [selectedEvent, setSelectedEvent] = useState(null);

    const [selectedCampaigns, setSelectedCampaigns] = useState([]);
    const [showPlaylistEditor, setShowPlaylistEditor] = useState(false);

    const noCampaign = {
        "@id": "none",
        name: intl.formatMessage({ id: "no_event" }),
    };
    const playlistOption = {
        "@id": "playlist",
        name: "Playlist",
        style: { fontWeight: "bold" },
        callback: () => setShowPlaylistEditor(true),
    };

    const determineDefaultValue = () => {
        const events = Array.isArray(editedEntity?.events)
            ? [...editedEntity.events]
            : [];
        if (events.length > 1) {
            return "playlist"; // ID de la playlist
        } else if (events.length === 1) {
            return events[0]["@id"]; // ID de l'événement unique
        } else {
            return noCampaign["@id"]; // ID pour 'aucun événement'
        }
    };

    // Selected event or playlist
    const [assignedCampaigns, setAssignedCampaigns] = useState(
        determineDefaultValue
    );

    // List of active campaigns : starting date is anterior to now & ending date is posterior
    const [currentCampaignsList, setCurrentCampaignsList] = useState([]);

    // List playlist campaigns : starting date is anterior or posterior to now & ending date is posterior
    const [playlistCampaignsList, setPlaylistCampaignsList] = useState([]);

    const fetchCampaigns = async () => {
        setCurrentCampaignsList([]);
        request.get("events").then(({ data }) => {
            let campaignsFetchedList = data["hydra:member"];

            setPlaylistCampaignsList(filterPastCampaigns(campaignsFetchedList));

            // Filter the list, then adds the no_campaign item
            campaignsFetchedList = getCurrentCampaigns(campaignsFetchedList);
            campaignsFetchedList.unshift(noCampaign);
            campaignsFetchedList.push(playlistOption);
            setCurrentCampaignsList(campaignsFetchedList);
        });
    };

    useEffect(() => {
        fetchCampaigns();
        setSelectedCampaigns(
            editedEntity?.events.map((event) => event["@id"]) || []
        );
        setAssignedCampaigns(determineDefaultValue());
        const event = currentCampaignsList.find(
            (event) => event["@id"] === determineDefaultValue()
        );
        setSelectedEvent(event);
    }, [editedEntity]);

    const handleChangeCampaign = (eventId) => {
        setAssignedCampaigns([eventId]);
        setEditedEntityEvent([eventId]);

        const event = currentCampaignsList.find(
            (event) => event["@id"] === eventId
        );
        setSelectedEvent(event);
    };

    const handleFinalizeSelection = () => {
        setEditedEntityEvent(selectedCampaigns);
    };

    return (
        <div>
            {currentCampaignsList.length > 0 && (
                <>
                    <CustomSelect
                        items={currentCampaignsList}
                        display="name"
                        getValue="@id"
                        defaultValue={assignedCampaigns}
                        onChange={(e) => handleChangeCampaign(e)}
                    />
                    {selectedEvent?.imageUrl &&
                        assignedCampaigns[0] !== "playlist" && (
                            <img
                                src={selectedEvent.imageUrl}
                                alt={selectedEvent.name}
                            />
                        )}
                </>
            )}
            {assignedCampaigns.length > 0 &&
                (assignedCampaigns[0] === "playlist" ||
                    assignedCampaigns === "playlist") &&
                showPlaylistEditor && (
                    <>
                        <Playlist
                            eventsList={playlistCampaignsList}
                            selectedEvents={selectedCampaigns}
                            setSelectedEvents={setSelectedCampaigns}
                            onClose={() => setShowPlaylistEditor(false)}
                            onSave={() => {
                                handleFinalizeSelection();
                                setShowPlaylistEditor(false);
                            }}
                        />
                    </>
                )}
        </div>
    );
});

export default EventManager;
