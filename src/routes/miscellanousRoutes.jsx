import PrivateRoute from "../Utils/PrivateRoute/privateRoute";
import ImgUploader from "../views/imgUploader/imgUploader";
import Report from "../containers/Feedback";

export const miscellanousRoutes = [
    <PrivateRoute path="/upload-img" component={ImgUploader} />,

    <PrivateRoute exact path="/report" component={Report} />,
];
