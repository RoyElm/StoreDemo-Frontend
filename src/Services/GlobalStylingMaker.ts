import { createMuiTheme } from "@material-ui/core";
import { Theme, makeStyles } from '@material-ui/core/styles';
import creatingStyle from '@material-ui/core/styles/createStyles';
import { lightBlue, purple } from "@material-ui/core/colors";

//Global function styles maker, each component in program can use this functions to create style classes;

export function createStyles() {
    const usingStyle = makeStyles({
        root: {
            maxWidth: 320,
            height: 300,
            width: 200,
            display: "inline-block",
            marginLeft: 5,
            marginTop: 5
        },
        media: {
            height: 170,
            width: 200
        },
        primary: {
            color: "#ff8a80"
        },
        secondary: {
            color: "#999999"
        },
        formControl: {
            margin: 0,
            minWidth: 80,
        }, fab: {
            height: 40,
            width: 40,
        }, cover: {
            width: 80,
            height: 90,

        },
    });

    return usingStyle();
}

export function creatingClasses() {
    const createClasses = makeStyles({
        textBox: { margin: "5px 0", width: 400 }
    });

    return createClasses();
}

export function createTheme() {
    return createMuiTheme({
        typography: {
            fontFamily: "fantasy",
            fontSize: 15,
            h3: {
                fontSize: 30
            }
        },
        palette: {
            primary: {
                main: lightBlue[600]
            },
            secondary: {
                main: purple[600]
            }
        }
    });
};

export function CarouselStyle() {
    const useStyles = makeStyles({
        root: {
            maxWidth: 300,
            flexGrow: 1,
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            height: 50,
        },
        img: {
            height: 150,
            display: 'block',
            overflow: 'hidden',
            width: '100%',
        }
    });
    return useStyles();
}

export function createHeadStyle() {
    const usingStyles = makeStyles((theme: Theme) =>
        creatingStyle({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                minWidth: 300,
                width: '100%',
            },
            image: {
                position: 'relative',
                height: 200,
                [theme.breakpoints.down('xs')]: {
                    width: '100% !important', // Overrides inline-style
                    height: 100,
                },
                '&:hover, &$focusVisible': {
                    zIndex: 1,
                    '& $imageBackdrop': {
                        opacity: 0.15,
                    },
                    '& $imageMarked': {
                        opacity: 0,
                    },
                    '& $imageTitle': {
                        border: '4px solid currentColor',
                    },
                },
            },
            focusVisible: {},
            imageButton: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.common.white,
            },
            imageSrc: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
            },
            imageBackdrop: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: theme.palette.common.black,
                opacity: 0.4,
                transition: theme.transitions.create('opacity'),
            },
            imageTitle: {
                position: 'relative',
                padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
            },
            imageMarked: {
                height: 3,
                width: 18,
                backgroundColor: theme.palette.common.white,
                position: 'absolute',
                bottom: -2,
                left: 'calc(50% - 9px)',
                transition: theme.transitions.create('opacity'),
            },
        }),
    );
    return usingStyles();
}

export function authPageStyling() {
    const createStyle = makeStyles((theme) => ({
        root: {
            height: '100%',
        },
        image: {
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
        },
        paper: {
            margin: theme.spacing(2, 2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));
    return createStyle();
}

export function finalReviewStyle() {
    const final = makeStyles((theme) => ({
        listItem: {
            padding: theme.spacing(1, 0),
        },
        total: {
            fontWeight: 700,
        },
        title: {
            marginTop: theme.spacing(2),
        },
    }));
    return final();
}