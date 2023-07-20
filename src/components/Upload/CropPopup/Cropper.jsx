import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import Skeleton from "@mui/material/Skeleton";
import Button from "../../Button/Button"
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

import "cropperjs/dist/cropper.css";

export default function CropperDemo({ src, getCroppedFile, aspectRatios }) {
  const cropperRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(null);

  const handleClick = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const img = cropper.getCroppedCanvas().toDataURL();
    getCroppedFile(img);
  };
  const rotate = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.rotate(90);
  };
  const flip = (type) => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (type === "h") {
      cropper.scaleX(scaleX === 1 ? -1 : 1);
      setScaleX(scaleX === 1 ? -1 : 1);
    } else {
      cropper.scaleY(scaleY === 1 ? -1 : 1);
      setScaleY(scaleY === 1 ? -1 : 1);
    }
  };
  const setAspect = (ratio) => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.setAspectRatio(ratio);
    setAspectRatio(ratio);
  };

  return (
    <>
      {loading && (
        <Skeleton variant="rectangular" width={"100%"} height={400} />
      )}
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} mb={1}>
        <Box>
            <ButtonGroup disableElevation variant="contained">
            <Button onClick={rotate} style={{ marginRight: "2.5px", marginLeft: "2.5px" }}>Rotate</Button>
            <Button onClick={() => flip("h")} style={{ marginRight: "2.5px", marginLeft: "2.5px" }}>Flip H</Button>
            <Button onClick={() => flip("v")} style={{ marginRight: "2.5px", marginLeft: "2.5px" }}>Flip V</Button>
            </ButtonGroup>
        </Box>
        <Box>
            <ButtonGroup disableElevation variant="contained">
                <Button onClick={() => setAspect(null)} color={aspectRatio === null ? "primary" : "default"} style={{ marginRight: "2.5px", marginLeft: "2.5px" }}>Free</Button>
                {aspectRatios.map(ratio => {

                    const [numerator, denominator] = ratio.split(":");
                    let ratioValue = numerator / denominator;

                    return (
                        <Button
                        key={ratio}
                        onClick={() => setAspect(ratioValue)}
                        color={aspectRatio === ratioValue ? "primary" : "default"}
                        style={{ marginRight: "2.5px", marginLeft: "2.5px" }}
                        >
                        {ratio}
                        </Button>
                    );
                })}
            </ButtonGroup>
        </Box>
    </Box>

      <Cropper
        src={src}
        style={{ height: "400px", width: "400px" }}
        // Cropper.js options
        aspectRatio={aspectRatio}
        autoCropArea={1}
        guides={false}
        ready={() => {
          setLoading(false);
        }}
        ref={cropperRef}
      />
      <Button
        sx={{
          float: "right",
          mt: 1
        }}
        onClick={handleClick}
        autoFocus
        color="primary"
        variant="contained"
      >
        Crop
      </Button>
    </>
  );
}