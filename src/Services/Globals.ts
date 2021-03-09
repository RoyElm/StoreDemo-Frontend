export class Globals {
    public static storeUrl: string;
    public static authUrl: string;
    public static hatsUrl: string;

    public static url() {
        if (process.env.NODE_ENV === "production") {
            Globals.storeUrl = "";
        } else {
            Globals.storeUrl = "http://localhost:3001/api/store/";
            Globals.hatsUrl = "http://localhost:3001/api/store/hats";
            Globals.authUrl = "http://localhost:3001/api/auth/";
        }
    }
}

Globals.url();