import PrivateRoute from "../Utils/PrivateRoute/privateRoute";
import ImgUploader from "../views/imgUploader/imgUploader";

export const miscellanousRoutes = [
    <PrivateRoute path="/upload-img" component={ImgUploader} />,
];
