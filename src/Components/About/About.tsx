import React from 'react';
import './About.css';
import { Email, GitHub, LinkedIn } from "@material-ui/icons";

function About(): JSX.Element {
    return (
        <div className="About">
            <h2 className="MainSentence">
                I'm Roy Elmakies 23 years old. Waiting for the next story to be written.
                <br/>
                Junior Web Developer specializing in Full Stack development.
                <br/>
                Experienced for dynamic web projects. Well versed in numerous programing language React.js, TS, Angular, Node.js-Express.js, MySQL, MongoDB.
                <br/>
                Strong background at Gaming and Computer Analysis.
                <br/>
                See my projects at Github <a href="https://github.com/RoyElm"><GitHub /></a><br /> 
                my Contact:
                <a href="https://www.linkedin.com/in/royelmakies/"><LinkedIn /></a>
                <a href="mailto:roye456@gmail.com"><Email /></a>
                <br />
                   Build By: Roy Elmakies
                </h2>
        </div>
    )
}

export default About;