export {
    NotificationProvider,
    useNotification,
} from "./notifications/notifications";
export { dataURItoBlob } from "./dataURItoBlob";
export { default as fileToBase64 } from "./fileToBase64";
export { detectBrowserLanguage } from "./DetectBrowserLanguage";
export { checkImageExists } from "./detectSocialMediaImage";
export { handleScroll } from "./handleScroll";
export { default as request } from "./request";
export { default as resetTop } from "./resetTop";
export { camelToKebab } from "./camelCaseToKebabCase";
export { getTheme, getInstance } from "./themes/getTheme";
export { TokenService } from "./token.service";
export { getEvents } from "./getEvents";
export { default as getCurrentCampaigns } from "./events/getCurrentCampaigns";
export { default as filterPastCampaigns } from "./events/filterPastCampaigns";
export { useOrganisation } from "./useOrganisation";
export {
    validateEmail,
    validateSiren,
    validateURL,
} from "./validationsPatterns/validationsPatterns";
