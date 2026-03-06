
import z from "zod"

const LoginResponseSchema = z.object({
  success: z.boolean(),
  token: z.string(),
  userId: z.number()
});

type LoginReturn = 
{
    success: true;
    token: string;
}
| 
{
    success: false;
    errMsg: string;
};

export class ApiClient {

    rootUrl = "/api/webhook-test/";//proxy vite

    async getFavorites(userId: number)
    {
        let json;
        try {
            const response = await fetch(this.rootUrl + "favorites?user-id=" + userId.toString(), {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok) {
                return { success: false, errMsg: "Erreur HTTP " + response.status};
            }
            json = await response.json();
        }
        catch {
            return { success: false, errMsg: "Erreur lors de la requete"};
        }

        console.log("Get favorites response (JSON) = ", json);
    }

    async createArticle(userId: number, title: string, content: string)
    {
       const response = await fetch(this.rootUrl + "articles/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                title,
                body: content
            })
        });

        if (!response.ok) {
            return { success: false, errMsg: "Erreur HTTP " + response.status};
        }

        let json;
        try {
            json = await response.json();
        }
        catch {
            return { success: false, errMsg: "Erreur de format de reponse (JSON attendu) "};
        }

        console.log("Get favorites response (JSON) = ", json);
    }
    async updateArticle(articleId: number, userId: number, title: string, content: string)
    {
       const response = await fetch(this.rootUrl + "articles/update", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                articleId,
                userId,
                title,
                body: content
            })
        });

        if (!response.ok) {
            return { success: false, errMsg: "Erreur HTTP " + response.status};
        }

        let json;
        try {
            json = await response.json();
        }
        catch {
            return { success: false, errMsg: "Erreur de format de reponse (JSON attendu) "};
        }

        console.log("Get favorites response (JSON) = ", json);
    }
    async addFavorites(articleId: number, userId: number)
    {
       const response = await fetch(this.rootUrl + "favorites/add", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                articleId,
                userId,
            })
        });

        if (!response.ok) {
            return { success: false, errMsg: "Erreur HTTP " + response.status};
        }

        let json;
        try {
            json = await response.json();
        }
        catch {
            return { success: false, errMsg: "Erreur de format de reponse (JSON attendu) "};
        }

        console.log("Get favorites response (JSON) = ", json);
    }


    async createUser()
    {
        const response = await fetch(this.rootUrl + "users/create", {
            method: "POST"
        });

        if (!response.ok) {
            return { success: false, errMsg: "Erreur HTTP " + response.status};
        }

        let json;
        try {
            json = await response.json();
        }
        catch {
            return { success: false, errMsg: "Erreur de format de reponse (JSON attendu) "};
        }

        console.log("Get favorites response (JSON) = ", json);
    }

    async login(email: string, password: string): Promise<LoginReturn>
    {
        const response = await fetch(this.rootUrl + "auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!response.ok) {
            return { success: false, errMsg: "Erreur HTTP " + response.status};
        }

        let json;
        try {
            json = await response.json();
        }
        catch {
            return { success: false, errMsg: "Erreur de format de reponse (JSON attendu) "};
        }

        console.log("Get favorites response (JSON) = ", json);

        if(typeof json.success != 'boolean')//si json.succes n'existe pas son typeof est 'undefined'
        {
            return { success: false, errMsg: "Erreur de format de reponse" };
        }

        if (!json.success)
        {
            //we may use zod as well here for a more complex failure response
            return { success: false, errMsg: json.message ?? "" };
        }

        const res = LoginResponseSchema.safeParse(json)

        if (!res.success)
        {
            return { success: false, errMsg: "Erreur de format de reponse" };
        }

        return { success: true, token: res.data.token };
    }


};