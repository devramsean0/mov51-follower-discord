export class cookiesMNGR {
    private cookies = "";
    constructor(cookies: string) {
        this.cookies = cookies;
    }
    getCookie(name: string) {
        return this.cookies[(name as any)]
    }
}