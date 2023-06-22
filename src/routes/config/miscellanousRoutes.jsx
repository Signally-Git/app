import PrivateRouteHelper from "../PrivateRoute.helper";
import ImgUploader from "../../views/imgUploader/imgUploader";

export const miscellanousRoutes = [
    <PrivateRouteHelper path="/upload-img" component={ImgUploader} />,
];
