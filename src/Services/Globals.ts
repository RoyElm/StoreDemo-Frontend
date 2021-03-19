export class Globals {
    public static authUrl: string;
    public static hatsUrl: string;
    public static itemsUrl: string;
    public static socketUrl: string;

    public static url() {
        if (process.env.NODE_ENV === "production") {
            Globals.itemsUrl = "https://demo-store-project.herokuapp.com/api/store/items/";
            Globals.hatsUrl = "https://demo-store-project.herokuapp.com/api/store/hats/";
            Globals.authUrl = "https://demo-store-project.herokuapp.com/api/auth/";
            Globals.socketUrl = "https://demo-store-project.herokuapp.com/";
        } else {
            Globals.itemsUrl = "http://localhost:3001/api/store/items/";
            Globals.hatsUrl = "http://localhost:3001/api/store/hats/";
            Globals.authUrl = "http://localhost:3001/api/auth/";
            Globals.socketUrl = "http://localhost:3001/";
        }
    }
}

Globals.url();