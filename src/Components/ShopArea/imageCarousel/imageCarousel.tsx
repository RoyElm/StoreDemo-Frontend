import { Button, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { CarouselStyle } from "../../../Services/GlobalStylingMaker";
import "./imageCarousel.css";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Globals } from "../../../Services/Globals";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

interface imageCarouselProps {
    images: string;
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function ImageCarousel(props: imageCarouselProps): JSX.Element {
    const theme = useTheme();
    const CarouselClasses = CarouselStyle();
    const [activeStep, setActiveStep] = useState(0);

    const images = props.images.split(",");
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <div className="imageCarousel">
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {
                    images.map((step, index) => (
                        <div key={step}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <img className={CarouselClasses.img} src={Globals.itemsUrl + "itemImages/" + step} alt="item" />
                            ) : null}
                        </div>
                    ))
                }
            </AutoPlaySwipeableViews >
            <Button size="small" onClick={handleBack} className="leftImageButton" disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </Button>
            <Button size="small" onClick={handleNext} className="rightImageButton" disabled={activeStep === maxSteps - 1}>
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
        </div>
    );
}

export default ImageCarousel;
